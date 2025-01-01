import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Radio,
  Row,
  Switch,
  Tooltip,
} from "antd";
import { resources } from "api/resources";
import CustomDate from "components/forms/CustomDate";
import SelectFetch from "components/forms/SelectFetch";
import React, { Fragment, useEffect, useState } from "react";
import FetchResource from "api/crud";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  BookOutlined,
  CloseCircleOutlined,
  EditOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Rents from "api/routes/rents";
import {
  closeShift,
  newUser,
  returnedRent,
} from "my-redux/actions/ShiftActions";
import { addNeeds, addNews } from "my-redux/actions/resource";
import Passport from "components/forms/Passport";
import { tl } from "i18n";
import PhoneNumber from "components/forms/PhoneNumber";
import { clearNullishKeysFromObject, isEmptyObject } from "utils/array";
import VerifyPhoneAPI from "api/VerifyPhoneAPI";
import Loading from "components/shared-components/Loading";
import { showError } from "./showError";
import { openInNewTab } from "./openOnce";
import { sendMessage } from "hooks/useSendMessage";
import { PASSPORT_PATTERN } from "configs/route/utils";

export const openNotification = (userName, bookName) => {
  notification.success({
    message: <h3>Ijaraga berildi</h3>,
    description: (
      <p>
        <b>{bookName}</b> kitobi <b>{userName}</b>ga berildi
      </p>
    ),
    duration: 1,
    placement: "top",
  });
};

function OpenUserHistory({ userId }) {
  return (
    <Tooltip title="Kitobxon ijaralar tarixi">
      <Button
        disabled={!userId}
        onClick={() => {
          openInNewTab(
            `${window.location.origin}/app/rents/?size=20&page=1&q=u${userId}.`
          );
        }}
        className="ml-1"
        icon={<FileDoneOutlined />}
      />
    </Tooltip>
  );
}

function OpenUserEditForm({ userId }) {
  const user = useSelector((state) => {
    if (userId) {
      return state.users.items.find((user) => user.id === userId);
    }

    return;
  });

  return (
    <Tooltip title="Kitobxon ma'lumotlarini o'zgartirish">
      <Button
        disabled={!Boolean(user)}
        className="ml-1"
        onClick={() => {
          sendMessage(
            {
              edit: true,
              id: user.id,
              resource: resources.users,
              record: user,
              form: resources.users,
            },
            "f_d"
          );
        }}
        icon={<EditOutlined />}
      />
    </Tooltip>
  );
}

export function SelectUserAndUserHistory({ onChange, value }) {
  return (
    <div className="d-flex">
      <SelectFetch
        placeholder={"Kitobxon ism, familiya yoki telefon raqam"}
        resource={resources.users}
        fetchable={true}
        onChange={onChange}
        value={value}
        column={"fullName"}
        render={(item) =>
          item &&
          `${item.firstName} ${item.lastName} - ${item.phone} - ${item.passportId}`
        }
      />
      <OpenUserHistory userId={value} />
      <OpenUserEditForm userId={value} />
    </div>
  );
}
function LeaseRent({ incramentReturning, onSelectUserId }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modal, setModal] = useState({ open: false, rent: {} });
  const store = useStore();

  async function onCheck() {
    try {
      const values = form.getFieldsValue();
      if (values.id || values.customId || values.stockId) {
        setLoading(true);

        const rent = await Rents.getList({
          filters: clearNullishKeysFromObject({ ...values, returnedAt: 0 }),
          rejected: "all",
        });

        await addNeeds(resources.users, [rent.userId]);
        rent.user = store
          .getState()
          .users.items.find((user) => user.id === rent.userId);

        setModal({ open: true, rent });
        setLoading(false);
      }
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  }

  function onFinish() {
    function success(id) {
      if (modal.open) {
        setModal({ open: false });
      }
      incramentReturning();
      message.success(id + " raqamli ijara bo'shatildi!");
      setLoading(false);
      form.resetFields();
      onSelectUserId(modal.rent.user.id);
    }

    function error(err) {
      showError(err, "Ijara bo'shatishda qandaydir muammo");
      setLoading(false);
    }

    setLoading(true);
    Rents.return(modal.rent.id)
      .then((r) => {
        if (r.user_blocked_reason) {
          message.warning("Kitobxon bloklangan. " + r.user_blocked_reason);
        }

        success(modal.rent.id);
      })
      .catch(error);
  }

  return (
    <Fragment>
      <h3 className="ml-3">Bo'shatish</h3>
      <Form
        id="rent-form"
        form={form}
        layout="vertical"
        className="p-3"
        onFinish={onFinish}
      >
        <Form.Item name={"id"} label={"Kvitansiya raqami orqali"}>
          <InputNumber style={{ width: "100%" }} onPressEnter={onCheck} />
        </Form.Item>
        <Form.Item name={"stockId"} label={"Kitob raqami orqali"}>
          <InputNumber className="w-100" onPressEnter={onCheck} />
        </Form.Item>
        <Form.Item>
          <Button
            className="big"
            disabled={loading}
            loading={loading}
            onClick={onCheck}
            // htmlType="submit"
            type="primary"
          >
            Bo'shatish
          </Button>
        </Form.Item>
      </Form>
      {modal.open && (
        <CheckModal
          rent={modal.rent}
          loading={loading}
          close={() => setModal({ open: false })}
        />
      )}
    </Fragment>
  );
}
function CheckModal({ rent, loading, close }) {
  const book = useSelector(
    (state) =>
      rent.stock &&
      state.books.items.find((book) => book.id === rent.stock.bookId)
  );

  const id_submit = "check-submit";

  useEffect(() => {
    if (!book) {
      addNeeds(resources.books, [rent.stock.bookId]);
    }

    setTimeout(() => {
      document.getElementById(id_submit)?.focus();
    }, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      title="Tekshiramiz"
      open={true}
      onCancel={close}
      className="rent-check-modal"
      footer={
        <Button
          className="big"
          disabled={loading}
          loading={loading}
          htmlType="submit"
          type="primary"
          id={id_submit}
          form={"rent-form"}
        >
          Bo'shatish
        </Button>
      }
    >
      <h1>
        Kvitansiya raqami: <span>{rent.id}</span>
      </h1>

      {Boolean(rent.customId) && (
        <h1>
          Maxsus raqam: <span>{rent.customId}</span>
        </h1>
      )}

      <h1>
        Kitob raqami: <span>{rent.stockId}</span>
      </h1>
      <h1>
        Kitob: <span>{book?.name}</span>
      </h1>
      <h1>
        Kitobxon:{" "}
        <span>
          {rent?.user?.firstName} {rent?.user?.lastName}
        </span>
      </h1>
    </Modal>
  );
}
function CloseShift() {
  const [modal, setModal] = useState(false);
  const shift = useSelector((state) => state.shift);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Button
        className="big"
        icon={<CloseCircleOutlined />}
        // type="primary"
        ghost
        danger
        onClick={() => setModal(true)}
      >
        Yakunlash
      </Button>

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        okText="Yakunlash"
        onOk={() => dispatch(closeShift())}
        cancelText="Orqaga"
        okButtonProps={{ danger: true }}
        title={<h2>Bugun bajarilgan amallar</h2>}
      >
        <h2>Qaytarilgan ijaralar: {shift.returned_rents}</h2>
        <h2>Yangi ijaralar: {shift.new_rents}</h2>
        <h2>Yangi kitobxonlar: {shift.new_users}</h2>
      </Modal>
    </Fragment>
  );
}
export function RightTools({ form, onSelectUser }) {
  const formsData = {
    stocks: "stocks",
    users: "users",
  };
  const [activeForm, setActiveForm] = useState();
  const dispatch = useDispatch();

  const onUserFormClose = (user) => {
    if (user) {
      dispatch(newUser());
      dispatch(addNews(resources.users, [user]));
      form.setFieldsValue({ userId: user.id });
    }

    setActiveForm(undefined);
  };

  return (
    <Fragment>
      <LeaseRent
        onSelectUserId={onSelectUser}
        incramentReturning={() => dispatch(returnedRent())}
      />
      {activeForm === formsData.users && (
        <UserForm onFormClose={onUserFormClose} />
      )}
      {activeForm === formsData.stocks && (
        <StockForm
          onFormClose={(stock) => {
            setActiveForm(undefined);

            if (stock) {
              message.success(stock.id + " - yangi kitob raqami", 10);
            }
          }}
        />
      )}
      <div className="p-3">
        <Button
          className="big"
          onClick={() => setActiveForm(formsData.users)}
          icon={<UserOutlined />}
          type="primary"
          ghost
        >
          Kitobxon qo'shish
        </Button>
        <Button
          className="my-1 big"
          onClick={() => setActiveForm(formsData.stocks)}
          icon={<BookOutlined />}
          type="primary"
          ghost
        >
          Kitob qo'shish
        </Button>
        <CloseShift />
      </div>
    </Fragment>
  );
}
const rules = {
  required: [{ required: true }],
};
function UserForm({ onFormClose }) {
  const [loading, setLoading] = useState(false);
  const [verifyPhone, setVerifyPhone] = useState({
    verifing: false,
    verify: true,
  });

  function setVerifing(verifing) {
    setVerifyPhone({
      verifing: verifing,
      verify: true,
    });
  }

  function onSubmit(values) {
    // if (verifyPhone) {
    // 	setVerifing(true);
    // } else {
    // }
    onFinish(values);
  }

  const [form] = Form.useForm();
  function onFinish(values) {
    setLoading(true);

    if (values.address?.addressLine?.length === 0) {
      delete values.address.addressLine;
    }
    values.address = isEmptyObject(values.address) ? undefined : values.address;

    FetchResource.create(resources.users, values)
      .then((user) => {
        setLoading(false);
        onFormClose(user);
        message.success("Foydalanuvchi qo'shildi");
      })
      .catch((err) => {
        setLoading(false);
        showError(err);
      });
  }

  return (
    <Fragment>
      {verifyPhone.verify && verifyPhone.verifing && (
        <VerifyPhone
          phone={form.getFieldValue("phone")}
          setCodeFinish={(code) => {
            if (code) {
              onFinish({ code: code, ...form.getFieldsValue() });
            }

            setVerifing(false);
          }}
        />
      )}
      <Modal
        width={700}
        closeIcon={" "}
        title={"Kitobxon qo'shish"}
        open={true}
        footer={
          <div className="d-flex justify-content-between">
            <Button className="big" danger onClick={() => onFormClose()}>
              Orqaga
            </Button>
            <Button
              className="big"
              disabled={loading}
              loading={loading}
              htmlType="submit"
              type="primary"
              form={"user-form"}
            >
              Saqlash
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          className="c-rent"
          id="user-form"
          onFinish={onSubmit}
          layout="vertical"
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label={tl("firstName")}
                name="firstName"
                rules={rules.required}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={tl("lastName")}
                name="lastName"
                rules={rules.required}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={tl("phone")}
                name="phone"
                rules={rules.required}
              >
                <PhoneNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={tl("extraPhone")}
                name="extraPhone"
                rules={rules.required}
              >
                <PhoneNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={tl("passportId")}
                name="passportId"
                rules={[
                  {
                    required: true,
                    pattern: PASSPORT_PATTERN,
                  },
                ]}
              >
                <Passport />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={tl("birthDate")} name="birthDate">
                <CustomDate />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={tl("gender")}
                name="gender"
                rules={rules.required}
              >
                <Radio.Group
                  options={[
                    {
                      label: "Erkak",
                      value: "male",
                    },
                    {
                      label: "Ayol",
                      value: "female",
                    },
                  ]}
                  optionType={"button"}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={tl("verifyPhone")}>
                <Switch
                  checked={verifyPhone.verify}
                  onChange={(s) => setVerifyPhone((p) => ({ ...p, verify: s }))}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={tl("region")} name={["address", "region"]}>
                <SelectFetch
                  allowClear
                  withoutId
                  optionValueGetter={(item) => item.name}
                  resource={resources.regions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={tl("town")} name={["address", "town"]}>
                <SelectFetch
                  allowClear
                  withoutId
                  optionValueGetter={(item) => item.name}
                  resource={resources.towns}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={tl("addressLine")}
                name={["address", "addressLine"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  );
}
function VerifyPhone({ phone, setCodeFinish }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    VerifyPhoneAPI(phone)
      .then((r) => {
        setLoading(false);
      })
      .catch(showError);

    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      okButtonProps={{ htmlType: "submit", form: "verify-phone" }}
      open={true}
      destroyOnClose
      onCancel={() => setCodeFinish(0)}
    >
      <h3>Tasdiqlash kodi {phone} ga yuborildi.</h3>
      {loading ? (
        <Loading />
      ) : (
        <Form
          className="c-rent color-bordered"
          id="verify-phone"
          style={{ fontSize: "30px !important" }}
          layout="vertical"
          onFinish={({ code }) => {
            setCodeFinish(code);
          }}
        >
          <Form.Item
            rules={[{ required: true }]}
            label={"Kodni kriting"}
            name="code"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
function StockForm({ onFormClose }) {
  const [loading, setLoading] = useState(false);

  function onFinish(values) {
    setLoading(true);
    FetchResource.create(resources.stocks, values)
      .then((stock) => {
        setLoading(false);
        onFormClose(stock);
      })
      .catch((err) => {
        setLoading(false);
        showError(err);
      });
  }
  return (
    <Modal
      width={700}
      closeIcon={" "}
      title={"Kitobxon qo'shish"}
      open={true}
      footer={
        <div className="d-flex justify-content-between">
          <Button danger className="big" onClick={() => onFormClose()}>
            Orqaga
          </Button>
          <Button
            className="big"
            disabled={loading}
            loading={loading}
            htmlType="submit"
            type="primary"
            form={"stock-form"}
          >
            Saqlash
          </Button>
        </div>
      }
    >
      <Form id="stock-form" onFinish={onFinish} layout="vertical">
        <Form.Item label={tl("book")} name="bookId" rules={rules.required}>
          <SelectFetch resource={resources.books} fetchable />
        </Form.Item>
      </Form>
    </Modal>
  );
}
