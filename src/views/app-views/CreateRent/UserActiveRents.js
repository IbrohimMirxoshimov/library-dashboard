import { Card, Skeleton, Tag } from "antd";
import FetchResource from "api/crud";
import { resources } from "api/resources";
import { useResourceObject } from "hooks/useResource";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// kitobxonning hozir qo'lidagi kitoblari
export function UserActiveRents({ userId }) {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useResourceObject(resources.users, userId);
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  // ijara berilganda yoki bo'shatilganda qayta yuklash uchun
  const new_rents = useSelector((state) => state.shift.new_rents);
  const returned_rents = useSelector((state) => state.shift.returned_rents);

  useEffect(() => {
    if (!userId) {
      setRents([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    FetchResource.getList("rents/active", { userId })
      .then((data) => {
        if (!cancelled) setRents(data);
      })
      .catch(() => {
        if (!cancelled) setRents([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userId, new_rents, returned_rents]);

  if (!userId) return null;

  const title = rents.length
    ? `${fullName} qo'lidagi kitoblar, jami ${rents.length} ta`
    : `${fullName} qo'lidagi kitoblar`;

  return (
    <Card size="small" title={title} className="mb-3">
      {loading && !rents.length ? (
        <Skeleton active paragraph={{ rows: 1 }} title={false} />
      ) : !rents.length ? (
        <div className="text-muted">Qo'lida kitob yo'q</div>
      ) : (
        rents.map((rent) => (
          <div key={rent.id} className="d-flex align-items-center mb-1">
            <Tag>{rent.stockId}</Tag>
            <span className="mr-2">{rent.book?.name}</span>
            <Tag color={rent.expired ? "red" : "green"}>
              {new Date(rent.returningDate).toLocaleDateString("ru")}
            </Tag>
            {rent.rejected && <Tag color="volcano">Qaytarilmagan</Tag>}
          </div>
        ))
      )}
    </Card>
  );
}
