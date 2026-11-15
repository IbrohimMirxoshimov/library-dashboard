import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DatePicker,
  InputNumber,
  Radio,
  Select,
  Skeleton,
  Spin,
  Table,
  Tag,
  message,
} from "antd";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import {
  Award,
  CalendarDays,
  Divide,
  HandCoins,
  TrendingDown,
  Users,
  Wallet,
} from "lucide-react";
import { DonationsAPI } from "api/donations";
import { Kpi, KpiSkeleton } from "../dashboard/Kpi";
import {
  DATE_FORMAT,
  PRESETS,
  formatNumber,
  matchPreset,
  presetRange,
  rangeDays,
  readRangeFromSearch,
} from "../dashboard/range";
import "../dashboard/dashboard.css";
import "./donations.css";

const DEFAULT_LOCATION_ID = 1; // Chorsu
const PAGE_SIZE = 20;
const INCOME = 1;
const AMOUNT_DEBOUNCE_MS = 500;

const som = (v) => `${formatNumber(v)} so'm`;
// HUMO vaqti Toshkentda (UTC+5)
const tashkentTime = (date) => moment(date).utcOffset(300);

const columns = [
  {
    title: "Sana",
    dataIndex: "paidAt",
    key: "paidAt",
    width: 150,
    render: (v) => tashkentTime(v).format("DD.MM.YYYY HH:mm"),
  },
  {
    title: "Turi",
    dataIndex: "type",
    key: "type",
    width: 90,
    render: (v) =>
      v === INCOME ? <Tag color="green">Kirim</Tag> : <Tag color="red">Chiqim</Tag>,
  },
  {
    title: "Summa",
    dataIndex: "amount",
    key: "amount",
    align: "right",
    render: (v, r) => (
      <span className={r.type === INCOME ? "don-amount--in" : "don-amount--out"}>
        {r.type === INCOME ? "+" : "−"}
        {formatNumber(v)}
      </span>
    ),
  },
  {
    title: "Balans",
    dataIndex: "balance",
    key: "balance",
    align: "right",
    render: (v) => (v === null ? "—" : formatNumber(v)),
  },
  {
    title: "Manba",
    dataIndex: "source",
    key: "source",
    ellipsis: true,
  },
  {
    title: "Karta",
    dataIndex: "cardLast4",
    key: "cardLast4",
    width: 80,
    render: (v) => `*${v}`,
  },
];

const numParam = (params, key) => {
  const v = params.get(key);
  return v !== null && v !== "" && !isNaN(Number(v)) ? Number(v) : null;
};

export default function Donations() {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const range = readRangeFromSearch(location.search);
  const { from, to } = range;
  const preset = matchPreset(range);
  const type = numParam(params, "type");
  const amountMin = numParam(params, "min");
  const amountMax = numParam(params, "max");
  const page = numParam(params, "page") || 1;

  const [locations, setLocations] = useState(null);
  const requestedLocation = numParam(params, "location");
  const locationId =
    locations &&
    (locations.find((l) => l.id === requestedLocation) ||
      locations.find((l) => l.id === DEFAULT_LOCATION_ID) ||
      locations[0] || { id: null }
    ).id;

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [list, setList] = useState(null);
  const [listLoading, setListLoading] = useState(true);
  const statsRequest = useRef(0);
  const listRequest = useRef(0);

  // summa filtri yozilayotganda har harfda so'rov ketmasin
  const [minInput, setMinInput] = useState(amountMin);
  const [maxInput, setMaxInput] = useState(amountMax);

  const setParams = useCallback(
    (patch, { keepPage = false } = {}) => {
      const next = new URLSearchParams(location.search);
      Object.entries(patch).forEach(([k, v]) =>
        v === null || v === undefined || v === ""
          ? next.delete(k)
          : next.set(k, v)
      );
      if (!keepPage) next.delete("page");
      history.replace({ search: next.toString() });
    },
    [history, location.search]
  );

  useEffect(() => {
    DonationsAPI.getLocations()
      .then(setLocations)
      .catch(() => {
        setLocations([]);
        message.error("Kutubxonalar yuklanmadi");
      });
  }, []);

  useEffect(() => {
    if (!locationId) return;
    const id = ++statsRequest.current;
    setStatsLoading(true);
    DonationsAPI.getStats({ locationId, from, to })
      .then((data) => id === statsRequest.current && setStats(data))
      .catch(() => id === statsRequest.current && message.error("Statistika yuklanmadi"))
      .finally(() => id === statsRequest.current && setStatsLoading(false));
  }, [locationId, from, to]);

  useEffect(() => {
    if (!locationId) return;
    const id = ++listRequest.current;
    setListLoading(true);
    DonationsAPI.getList({
      locationId,
      from,
      to,
      type,
      amountMin,
      amountMax,
      page,
      size: PAGE_SIZE,
    })
      .then((data) => id === listRequest.current && setList(data))
      .catch(() => id === listRequest.current && message.error("Ro'yxat yuklanmadi"))
      .finally(() => id === listRequest.current && setListLoading(false));
  }, [locationId, from, to, type, amountMin, amountMax, page]);

  useEffect(() => {
    if (minInput === amountMin && maxInput === amountMax) return;
    const t = setTimeout(
      () => setParams({ min: minInput, max: maxInput }),
      AMOUNT_DEBOUNCE_MS
    );
    return () => clearTimeout(t);
  }, [minInput, maxInput, amountMin, amountMax, setParams]);

  const days = rangeDays(range);

  if (locations && !locations.length) {
    return (
      <div className="dash">
        <h1 className="dash-header__title">Hissalar</h1>
        <div className="dash-card">Hozircha hech qaysi kutubxonada hissa yo'q.</div>
      </div>
    );
  }

  return (
    <div className="dash">
      <header className="dash-header don-header">
        <div>
          <h1 className="dash-header__title">Hissalar</h1>
          <span className="dash-header__sub">
            Kutubxona kartasiga tushgan pullar (HUMO)
          </span>
        </div>
        <Select
          className="don-location"
          loading={!locations}
          value={locationId || undefined}
          placeholder="Kutubxona"
          onChange={(v) => setParams({ location: v })}
          options={(locations || []).map((l) => ({ value: l.id, label: l.name }))}
        />
      </header>

      <section className="dash-filter">
        <Radio.Group
          value={preset}
          onChange={(e) => setParams(presetRange(e.target.value))}
          optionType="button"
          buttonStyle="solid"
          size="middle"
          className="dash-filter__presets"
        >
          {PRESETS.map((p) => (
            <Radio.Button key={p.key} value={p.key}>
              {p.label}
            </Radio.Button>
          ))}
        </Radio.Group>
        <DatePicker.RangePicker
          value={[moment(from), moment(to)]}
          format="DD.MM.YYYY"
          allowClear={false}
          disabledDate={(d) => d.isAfter(moment(), "day")}
          onChange={(values) =>
            values &&
            setParams({
              from: values[0].format(DATE_FORMAT),
              to: values[1].format(DATE_FORMAT),
            })
          }
        />
        <span className="dash-filter__info">
          <CalendarDays size={14} /> {days} kun
        </span>
      </section>

      <Spin spinning={statsLoading && !!stats} delay={150}>
        <section className="dash-grid dash-grid--kpi">
          {stats ? (
            <>
              <Kpi
                icon={<HandCoins size={20} />}
                tone="green"
                label="Jami kirim"
                value={som(stats.incomeSum)}
              />
              <Kpi
                icon={<Users size={20} />}
                label="Hissalar soni"
                value={formatNumber(stats.incomeCount)}
                hint={
                  stats.incomeCount
                    ? `kuniga ~${formatNumber(
                        Math.round((stats.incomeCount / days) * 10) / 10
                      )} ta`
                    : null
                }
              />
              <Kpi
                icon={<Divide size={20} />}
                tone="teal"
                label="O'rtacha hissa"
                value={stats.incomeAvg === null ? "—" : som(stats.incomeAvg)}
              />
              <Kpi
                icon={<Award size={20} />}
                tone="violet"
                label="Eng katta hissa"
                value={stats.incomeMax === null ? "—" : som(stats.incomeMax)}
              />
              <Kpi
                icon={<TrendingDown size={20} />}
                tone="red"
                label="Chiqim"
                value={som(stats.expenseSum)}
                hint={stats.expenseCount ? `${formatNumber(stats.expenseCount)} ta` : null}
              />
              <Kpi
                icon={<Wallet size={20} />}
                tone="amber"
                label="Kartadagi balans"
                value={stats.balance === null ? "—" : som(stats.balance)}
                hint={
                  stats.balanceAt
                    ? `${tashkentTime(stats.balanceAt).format("DD.MM.YYYY HH:mm")} holatiga`
                    : null
                }
              />
            </>
          ) : (
            <KpiSkeleton count={6} />
          )}
        </section>
      </Spin>

      <section className="dash-card don-table">
        <div className="don-table__filters">
          <Radio.Group
            value={type === null ? "all" : type}
            onChange={(e) =>
              setParams({ type: e.target.value === "all" ? null : e.target.value })
            }
            optionType="button"
          >
            <Radio.Button value="all">Hammasi</Radio.Button>
            <Radio.Button value={1}>Kirim</Radio.Button>
            <Radio.Button value={0}>Chiqim</Radio.Button>
          </Radio.Group>
          <span className="don-table__amount">
            <InputNumber
              min={0}
              placeholder="Summa dan"
              value={minInput}
              onChange={(v) => setMinInput(v === "" ? null : v)}
              formatter={(v) => (v ? formatNumber(v) : "")}
              parser={(v) => v.replace(/\D/g, "")}
            />
            <span>—</span>
            <InputNumber
              min={0}
              placeholder="gacha"
              value={maxInput}
              onChange={(v) => setMaxInput(v === "" ? null : v)}
              formatter={(v) => (v ? formatNumber(v) : "")}
              parser={(v) => v.replace(/\D/g, "")}
            />
          </span>
        </div>

        {list ? (
          <Table
            rowKey="id"
            size="middle"
            columns={columns}
            dataSource={list.rows}
            loading={listLoading}
            scroll={{ x: 720 }}
            pagination={{
              current: page,
              pageSize: PAGE_SIZE,
              total: list.count,
              showSizeChanger: false,
              showTotal: (total) => `Jami: ${formatNumber(total)}`,
              onChange: (p) => setParams({ page: p }, { keepPage: true }),
            }}
          />
        ) : (
          <Skeleton active paragraph={{ rows: 8 }} />
        )}
      </section>
    </div>
  );
}
