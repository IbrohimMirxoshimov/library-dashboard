import React, { memo, useMemo, useState } from "react";
import { Input } from "antd";
import { formatNumber } from "./range";

/**
 * Ranked list with a proportional bar behind each row.
 * getRatio(item, max) returns 0..1 width of the bar.
 */
function RankList({
  title,
  icon,
  meta,
  items,
  getKey,
  getName,
  getValue,
  getRatio,
  renderExtra,
  searchPlaceholder = "Qidirish...",
  emptyText = "Ma'lumot yo'q",
}) {
  const [search, setSearch] = useState("");

  const max = useMemo(
    () => items.reduce((m, item) => Math.max(m, Number(item.count) || 0), 0),
    [items]
  );

  const ranked = useMemo(() => items.map((item, i) => [item, i + 1]), [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ranked;
    return ranked.filter(([item]) =>
      `${getName(item)} ${getKey(item)}`.toLowerCase().includes(q)
    );
  }, [ranked, search, getName, getKey]);

  return (
    <div className="dash-card dash-rank">
      <div className="dash-card__head">
        <span className="dash-card__title">
          {icon}
          {title}
        </span>
        {meta && <span className="dash-card__meta">{meta}</span>}
      </div>
      <Input
        allowClear
        size="small"
        placeholder={searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="dash-rank__search"
      />
      <ol className="dash-rank__list">
        {filtered.map(([item, pos]) => {
          const ratio = getRatio ? getRatio(item, max) : max ? item.count / max : 0;
          return (
            <li key={getKey(item)} className="dash-rank__row">
              <span
                className="dash-rank__bar"
                style={{ transform: `scaleX(${ratio})` }}
              />
              <span className="dash-rank__pos">{pos}</span>
              <span className="dash-rank__name" title={getName(item)}>
                {getName(item)}
              </span>
              {renderExtra && renderExtra(item)}
              <span className="dash-rank__value">
                {getValue ? getValue(item) : formatNumber(item.count)}
              </span>
            </li>
          );
        })}
        {filtered.length === 0 && <li className="dash-rank__empty">{emptyText}</li>}
      </ol>
    </div>
  );
}

export default memo(RankList);
