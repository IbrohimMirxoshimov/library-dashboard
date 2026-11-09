import { Button, Form, Input, Modal, Switch, Tag, message } from "antd";
import mainCaller from "api/main";
import VerifyPhoneAPI from "api/VerifyPhoneAPI";
import PhoneNumber from "components/forms/PhoneNumber";
import { useEffect, useState } from "react";
import { showError } from "views/app-views/CreateRent/showError";

// backend bilan bir xil: kitob olishda raqam shuncha oyda qayta tasdiqlanadi
const PHONE_VERIFICATION_VALID_MONTHS = 3;

export function clearPhone(phone) {
  return String(phone || "")
    .replace(/\D/g, "")
    .slice(-9);
}

export function getPhoneVerificationInfo(user) {
  if (!user?.phoneVerified) return { verified: false, text: "Tasdiqlanmagan" };

  const verifiedAt = new Date(user.phoneVerified);
  const validUntil = new Date(verifiedAt);
  validUntil.setMonth(validUntil.getMonth() + PHONE_VERIFICATION_VALID_MONTHS);
  const date = verifiedAt.toLocaleDateString("ru-RU");

  if (validUntil < new Date()) {
    return { verified: false, text: `Muddati o'tgan (${date})` };
  }

  return { verified: true, text: `Tasdiqlangan (${date})` };
}

export function PhoneVerificationTag({ user }) {
  const info = getPhoneVerificationInfo(user);

  return <Tag color={info.verified ? "green" : "red"}>{info.text}</Tag>;
}

/**
 * Ochilganda `phone` ga kod yuboradi, kiritilgan kodni `onCode` ga beradi.
 * `onCode` promise qaytarsa, tugaguncha OK tugmasi loading bo'ladi.
 */
export function VerifyPhoneModal({ phone, title, onCode, onClose }) {
  const [sending, setSending] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function send() {
    setSending(true);
    VerifyPhoneAPI(clearPhone(phone))
      .catch(showError)
      .finally(() => setSending(false));
  }

  useEffect(() => {
    send();
    // eslint-disable-next-line
  }, []);

  function onFinish({ code }) {
    setSubmitting(true);
    Promise.resolve(onCode(code))
      .catch(showError)
      .finally(() => setSubmitting(false));
  }

  return (
    <Modal
      open={true}
      destroyOnClose
      title={title || "Raqamni tasdiqlash"}
      okText="Tasdiqlash"
      cancelText="Bekor qilish"
      okButtonProps={{
        htmlType: "submit",
        form: "verify-phone",
        loading: submitting,
        disabled: sending,
      }}
      onCancel={onClose}
    >
      <h3>Tasdiqlash kodi +998 {phone} ga yuborildi.</h3>
      <Form id="verify-phone" layout="vertical" onFinish={onFinish}>
        <Form.Item
          rules={[{ required: true, pattern: /^\d{4}$/, message: "4 xonali kod" }]}
          label="Kodni kiriting"
          name="code"
        >
          <Input
            autoFocus
            inputMode="numeric"
            maxLength={4}
            style={{ fontSize: 24, letterSpacing: 8 }}
          />
        </Form.Item>
      </Form>
      <Button type="link" className="p-0" loading={sending} onClick={send}>
        Kodni qayta yuborish
      </Button>
    </Modal>
  );
}

export function verifyUserPhone(user_id, code) {
  return mainCaller(`/users/${user_id}/verify-phone`, "POST", { code });
}

function changeUserPhone(user_id, data) {
  return mainCaller(`/users/${user_id}/phone`, "PUT", data);
}

// Asosiy raqam faqat shu modal orqali o'zgaradi
export function ChangePhoneModal({ user, onDone, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [codePhone, setCodePhone] = useState(null);

  function save(phone, code) {
    setLoading(true);
    return changeUserPhone(user.id, code ? { phone, code } : { phone })
      .then((updated) => {
        message.success(
          code ? "Raqam o'zgartirildi va tasdiqlandi" : "Raqam o'zgartirildi"
        );
        onDone(updated);
      })
      .finally(() => setLoading(false));
  }

  function onFinish({ phone, smsVerification }) {
    const cleared = clearPhone(phone);

    if (cleared === user.phone) {
      return message.warning("Raqam o'zgarmagan");
    }
    if (smsVerification) {
      return setCodePhone(cleared);
    }
    save(cleared).catch(showError);
  }

  return (
    <>
      <Modal
        open={true}
        destroyOnClose
        title="Asosiy raqamni o'zgartirish"
        okText="Saqlash"
        cancelText="Bekor qilish"
        okButtonProps={{ htmlType: "submit", form: "change-phone", loading }}
        onCancel={onClose}
      >
        <p>
          Hozirgi raqam: <b>+998 {user.phone}</b>
        </p>
        <Form
          form={form}
          id="change-phone"
          layout="vertical"
          initialValues={{ smsVerification: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            label="Yangi raqam"
            rules={[
              {
                required: true,
                validator: (_, value) =>
                  clearPhone(value).length === 9
                    ? Promise.resolve()
                    : Promise.reject(new Error("Raqam to'liq emas")),
              },
            ]}
          >
            <PhoneNumber autoFocus />
          </Form.Item>
          <Form.Item
            name="smsVerification"
            label="SMS bilan tasdiqlash"
            valuePropName="checked"
            extra="O'chirilsa yangi raqam tasdiqlanmagan holda saqlanadi"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      {codePhone && (
        <VerifyPhoneModal
          phone={codePhone}
          onCode={(code) => save(codePhone, code)}
          onClose={() => setCodePhone(null)}
        />
      )}
    </>
  );
}

// Kitobxon formasida (tahrirlash) asosiy raqam holati va o'zgartirish
export function UserPhoneControl({ data }) {
  const [user, setUser] = useState(data.record);
  const [modal, setModal] = useState(null);

  useEffect(() => setUser(data.record), [data.record]);

  if (!data.record?.id || !user) return null;

  function onUpdated(updated) {
    setUser(updated);
    setModal(null);
    window.refreshList && window.refreshList();
  }

  return (
    <div className="mb-3">
      <div className="mb-1">Asosiy raqam</div>
      <div className="d-flex align-items-center flex-wrap" style={{ gap: 8 }}>
        <b>+998 {user.phone}</b>
        <PhoneVerificationTag user={user} />
        <Button size="small" onClick={() => setModal("change")}>
          O'zgartirish
        </Button>
        {user.phone && !getPhoneVerificationInfo(user).verified && (
          <Button size="small" type="primary" onClick={() => setModal("verify")}>
            Tasdiqlash
          </Button>
        )}
      </div>
      {modal === "change" && (
        <ChangePhoneModal
          user={user}
          onDone={onUpdated}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "verify" && (
        <VerifyPhoneModal
          phone={user.phone}
          onCode={(code) =>
            verifyUserPhone(user.id, code).then((updated) => {
              message.success("Raqam tasdiqlandi");
              onUpdated(updated);
            })
          }
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
