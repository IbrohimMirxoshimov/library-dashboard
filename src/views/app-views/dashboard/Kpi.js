import React from "react";
import { Skeleton } from "antd";

export function Kpi({ icon, label, value, hint, tone = "blue" }) {
  return (
    <div className={`dash-kpi dash-kpi--${tone}`}>
      <span className="dash-kpi__icon">{icon}</span>
      <div className="dash-kpi__body">
        <span className="dash-kpi__label">{label}</span>
        <span className="dash-kpi__value">{value}</span>
        {hint && <span className="dash-kpi__hint">{hint}</span>}
      </div>
    </div>
  );
}

export function KpiSkeleton({ count }) {
  return [...Array(count)].map((_, i) => (
    <div className="dash-kpi" key={i}>
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
    </div>
  ));
}
