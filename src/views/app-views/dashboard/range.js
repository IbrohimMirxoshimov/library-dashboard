import moment from "moment";

export const DATE_FORMAT = "YYYY-MM-DD";
const FIRST_DAY = "2021-01-01";

export const PRESETS = [
  { key: "today", label: "Bugun", get: (t) => [t, t] },
  { key: "7d", label: "7 kun", get: (t) => [t.clone().subtract(6, "day"), t] },
  {
    key: "30d",
    label: "30 kun",
    get: (t) => [t.clone().subtract(29, "day"), t],
  },
  { key: "month", label: "Bu oy", get: (t) => [t.clone().startOf("month"), t] },
  {
    key: "prevMonth",
    label: "O'tgan oy",
    get: (t) => {
      const m = t.clone().subtract(1, "month");
      return [m.clone().startOf("month"), m.clone().endOf("month")];
    },
  },
  { key: "year", label: "Bu yil", get: (t) => [t.clone().startOf("year"), t] },
  { key: "all", label: "Hammasi", get: (t) => [moment(FIRST_DAY), t] },
];

export const DEFAULT_PRESET = "30d";

export function presetRange(key) {
  const preset = PRESETS.find((p) => p.key === key);
  const [from, to] = preset.get(moment().startOf("day"));
  return { from: from.format(DATE_FORMAT), to: to.format(DATE_FORMAT) };
}

export function matchPreset(range) {
  const found = PRESETS.find((p) => {
    const r = presetRange(p.key);
    return r.from === range.from && r.to === range.to;
  });
  return found ? found.key : null;
}

export function readRangeFromSearch(search) {
  const params = new URLSearchParams(search);
  const from = params.get("from");
  const to = params.get("to");
  const valid = (d) => d && moment(d, DATE_FORMAT, true).isValid();

  if (valid(from) && valid(to) && from <= to) return { from, to };
  return presetRange(DEFAULT_PRESET);
}

export function rangeDays(range) {
  return moment(range.to).diff(moment(range.from), "days") + 1;
}

const MONTHS = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyun",
  "Iyul",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];

// Same bucket starts as Postgres date_trunc (weeks start on Monday)
export function bucketStart(date, unit) {
  return unit === "week"
    ? moment(date).startOf("isoWeek")
    : moment(date).startOf(unit);
}

export function bucketLabel(date, unit) {
  const m = moment(date);
  if (unit === "month") return `${MONTHS[m.month()]} ${m.format("YY")}`;
  return m.format("DD.MM");
}

/** Fills empty buckets with zeros so the chart keeps an even time axis */
export function fillSeries(series, range, unit) {
  const byDate = new Map(series.map((p) => [p.date, p]));
  const out = [];
  const end = moment(range.to);

  for (
    let cur = bucketStart(range.from, unit);
    cur.isSameOrBefore(end);
    cur.add(1, unit)
  ) {
    const date = cur.format(DATE_FORMAT);
    const point = byDate.get(date);
    out.push({
      date,
      leased: point ? point.leased : 0,
      returned: point ? point.returned : 0,
    });
  }
  return out;
}

export function formatNumber(value) {
  return Number(value || 0).toLocaleString("ru");
}
