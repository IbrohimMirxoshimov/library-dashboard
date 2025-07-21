import React, { useState } from "react";
import { Card, Input } from "antd";

export default function SearchableListCard({
  title,
  icon,
  items,
  renderItem,
  getSearchValue,
  placeholder = "Qidirish...",
}) {
  const [search, setSearch] = useState("");
  const filtered =
    search.length > 0
      ? items.filter((item) =>
          getSearchValue(item).toLowerCase().includes(search)
        )
      : items;

  return (
    <Card bordered style={{ borderRadius: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {icon}
          <span style={{ fontWeight: 600 }}>{title}</span>
        </div>
        <Input.Search
          allowClear
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          style={{ maxWidth: 180 }}
          size="small"
        />
      </div>
      <ul className="top-list" style={{ marginTop: 8 }}>
        {filtered.map(renderItem)}
        {filtered.length === 0 && (
          <li style={{ color: "#888", textAlign: "center", padding: 12 }}>
            Hech narsa topilmadi
          </li>
        )}
      </ul>
    </Card>
  );
}
