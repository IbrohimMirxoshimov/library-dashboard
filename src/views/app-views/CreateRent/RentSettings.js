import { SettingOutlined } from "@ant-design/icons";
import { Button, Popover, Switch, Tooltip } from "antd";
import FetchResource from "api/crud";
import { resources } from "api/resources";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Kutubxonachining kutubxonasi (sozlamalari bilan) har safar yangidan olinadi,
// login paytida saqlangan ma'lumot eskirgan bo'lishi mumkin
export function useMyLibrary() {
  const libraryId = useSelector((state) => state.auth.user?.libraryId);
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    if (!libraryId) return;

    FetchResource.getList(resources.locations, { id: libraryId })
      .then((res) => setLibrary(res.items?.[0] || null))
      .catch((err) => console.error(err));
  }, [libraryId]);

  return library;
}

/**
 * Ijara qo'shish sozlamalari. Yangi sozlama qo'shish uchun `items` ga qo'shing.
 * @param {{ library: object, smsVerification: boolean, setSmsVerification: Function }} props
 */
export function RentSettings({ library, smsVerification, setSmsVerification }) {
  const items = [];

  if (library?.smsVerification) {
    items.push({
      key: "smsVerification",
      label: "SMS bilan tasdiqlash",
      description: "Kitobxon raqami tasdiqlanmagan bo'lsa SMS kod so'raladi",
      control: (
        <Switch checked={smsVerification} onChange={setSmsVerification} />
      ),
    });
  }

  // o'chirilgan muhim sozlama bo'lsa tugma qizil bo'ladi
  const warning = library?.smsVerification && !smsVerification;

  const content = items.length ? (
    <div style={{ width: 280 }}>
      {items.map((item) => (
        <div
          key={item.key}
          className="d-flex justify-content-between align-items-center mb-2"
          style={{ gap: 12 }}
        >
          <div>
            <div>{item.label}</div>
            <small className="text-muted">{item.description}</small>
          </div>
          {item.control}
        </div>
      ))}
    </div>
  ) : (
    <span className="text-muted">Hozircha sozlama yo'q</span>
  );

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      title={library ? `Ijara sozlamalari · ${library.name}` : "Ijara sozlamalari"}
      content={content}
    >
      <Tooltip title={warning ? "SMS tasdiqlash o'chirilgan" : "Sozlamalar"}>
        <Button
          className="ml-1"
          danger={warning}
          type={warning ? "primary" : "default"}
          icon={<SettingOutlined />}
        />
      </Tooltip>
    </Popover>
  );
}
