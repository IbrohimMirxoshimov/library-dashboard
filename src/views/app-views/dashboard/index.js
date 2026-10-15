import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { DatePicker, Radio, Skeleton, Spin, Tooltip, message } from "antd";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import {
  AlertCircle,
  Award,
  Book,
  BookOpen,
  CalendarDays,
  ExternalLink,
  Mars,
  RotateCcw,
  TrendingUp,
  User,
  UserPlus,
  Users,
  Venus,
} from "lucide-react";
import { StatsAPI } from "api/stats";
import RankList from "./RankList";
import {
  DATE_FORMAT,
  PRESETS,
  formatNumber,
  matchPreset,
  presetRange,
  rangeDays,
  readRangeFromSearch,
} from "./range";
import "./dashboard.css";

// apexcharts is heavy; keep it out of the first paint
const TrendChart = lazy(() => import("./TrendChart"));

function Kpi({ icon, label, value, hint, tone = "blue" }) {
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

function GenderKpi({ gender }) {
  const total = gender.male + gender.female;
  const malePct = total ? Math.round((gender.male / total) * 100) : 0;

  return (
    <div className="dash-kpi dash-kpi--gender">
      <div className="dash-kpi__body">
        <span className="dash-kpi__label">Jinsi bo'yicha</span>
        <div className="dash-gender__bar">
          <span style={{ width: `${malePct}%` }} />
        </div>
        <div className="dash-gender__legend">
          <span>
            <Mars size={14} /> {formatNumber(gender.male)} · {malePct}%
          </span>
          <span>
            <Venus size={14} /> {formatNumber(gender.female)} · {100 - malePct}%
          </span>
        </div>
      </div>
    </div>
  );
}

function KpiSkeleton({ count }) {
  return [...Array(count)].map((_, i) => (
    <div className="dash-kpi" key={i}>
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
    </div>
  ));
}

const bookKey = (b) => b.id;
const bookName = (b) => b.name;
const readerKey = (r) => r.user_id;
const readerName = (r) => r.lastName || `#${r.user_id}`;
const fewKey = (b) => b.bookId;
const fewRatio = (b) => (b.total ? b.busies / b.total : 0);
const fewValue = (b) => `${b.busies} / ${b.total}`;

const readerExtra = (r) => (
  <span className="dash-rank__extra">
    {r.gender === "female" ? (
      <Venus size={14} color="#d6478f" />
    ) : (
      <Mars size={14} color="#2a6fdb" />
    )}
    <Tooltip title="Ijara tarixi">
      <a
        href={`/app/rents/?size=20&page=1&q=u${r.user_id}.`}
        target="_blank"
        rel="noreferrer"
      >
        <ExternalLink size={14} />
      </a>
    </Tooltip>
  </span>
);

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const location = useLocation();

  const range = readRangeFromSearch(location.search);
  const { from, to } = range;
  const preset = matchPreset(range);

  const [summary, setSummary] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [rangeLoading, setRangeLoading] = useState(true);
  const requestId = useRef(0);

  useEffect(() => {
    StatsAPI.getSummary()
      .then(setSummary)
      .catch(() => message.error("Joriy holat yuklanmadi"));
  }, []);

  useEffect(() => {
    const id = ++requestId.current;
    setRangeLoading(true);
    StatsAPI.getRange(from, to)
      .then((data) => {
        if (id === requestId.current) setRangeData({ ...data, from, to });
      })
      .catch(() => {
        if (id === requestId.current) message.error("Statistika yuklanmadi");
      })
      .finally(() => {
        if (id === requestId.current) setRangeLoading(false);
      });
  }, [from, to]);

  const setRange = useCallback(
    (next) => {
      const params = new URLSearchParams(location.search);
      params.set("from", next.from);
      params.set("to", next.to);
      history.replace({ search: params.toString() });
    },
    [history, location.search]
  );

  const days = rangeDays(range);
  const libraryName = user.library && user.library.name;

  return (
    <div className="dash">
      <header className="dash-header">
        <div>
          <h1 className="dash-header__title">
            {libraryName
              ? `${libraryName}${
                  libraryName.toLowerCase().includes("kutubxona")
                    ? ""
                    : " kutubxonasi"
                }`
              : "Statistika"}
          </h1>
          <span className="dash-header__sub">
            {summary
              ? `Joriy holat ${moment(summary.generated_at).format("HH:mm")} dagi`
              : "Yuklanmoqda..."}
          </span>
        </div>
      </header>

      <section className="dash-grid dash-grid--kpi">
        {summary ? (
          <>
            <Kpi
              icon={<Users size={20} />}
              label="Kitobxonlar"
              value={formatNumber(summary.readers_count)}
            />
            <Kpi
              icon={<Book size={20} />}
              tone="green"
              label="Kitoblar (nusxa)"
              value={formatNumber(summary.books_count)}
            />
            <Kpi
              icon={<BookOpen size={20} />}
              tone="amber"
              label="Hozir o'qilmoqda"
              value={formatNumber(summary.reading_books_count)}
            />
            <Kpi
              icon={<AlertCircle size={20} />}
              tone="red"
              label="Muddati o'tgan"
              value={formatNumber(summary.expired_leases)}
              hint={
                summary.reading_books_count
                  ? `o'qilayotganlarning ${Math.round(
                      (summary.expired_leases / summary.reading_books_count) * 100
                    )}%`
                  : null
              }
            />
            <GenderKpi gender={summary.gender} />
          </>
        ) : (
          <KpiSkeleton count={5} />
        )}
      </section>

      <section className="dash-filter">
        <Radio.Group
          value={preset}
          onChange={(e) => setRange(presetRange(e.target.value))}
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
            setRange({
              from: values[0].format(DATE_FORMAT),
              to: values[1].format(DATE_FORMAT),
            })
          }
        />
        <span className="dash-filter__info">
          <CalendarDays size={14} /> {days} kun
        </span>
      </section>

      <Spin spinning={rangeLoading && !!rangeData} delay={150}>
        {rangeData ? (
          <>
            <section className="dash-grid dash-grid--kpi">
              <Kpi
                icon={<TrendingUp size={20} />}
                label="Berilgan kitoblar"
                value={formatNumber(rangeData.leased_count)}
              />
              <Kpi
                icon={<RotateCcw size={20} />}
                tone="green"
                label="Qaytarilgan"
                value={formatNumber(rangeData.returned_count)}
              />
              <Kpi
                icon={<UserPlus size={20} />}
                tone="violet"
                label="Yangi kitobxonlar"
                value={formatNumber(rangeData.new_users_count)}
              />
              <Kpi
                icon={<CalendarDays size={20} />}
                tone="teal"
                label="Kunlik o'rtacha"
                value={formatNumber(rangeData.daily_average)}
                hint={`${rangeData.active_days} ish kuni bo'yicha`}
              />
            </section>

            <section className="dash-grid dash-grid--main">
              <Suspense
                fallback={
                  <div className="dash-card">
                    <Skeleton active paragraph={{ rows: 7 }} />
                  </div>
                }
              >
                <TrendChart data={rangeData} range={rangeData} />
              </Suspense>
              <RankList
                title="Top kitoblar"
                icon={<Award size={16} />}
                meta="tanlangan davr"
                items={rangeData.top_books}
                getKey={bookKey}
                getName={bookName}
                searchPlaceholder="Kitob nomi yoki ID"
              />
            </section>
          </>
        ) : (
          <>
            <section className="dash-grid dash-grid--kpi">
              <KpiSkeleton count={4} />
            </section>
            <div className="dash-card">
              <Skeleton active paragraph={{ rows: 8 }} />
            </div>
          </>
        )}
      </Spin>

      <section className="dash-grid dash-grid--lists">
        {rangeData ? (
          <RankList
            title="Top kitobxonlar"
            icon={<User size={16} />}
            meta="qaytarilgan kitob bo'yicha"
            items={rangeData.top_readers}
            getKey={readerKey}
            getName={readerName}
            renderExtra={readerExtra}
            searchPlaceholder="Familiya yoki ID"
          />
        ) : (
          <div className="dash-card">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        )}
        {summary ? (
          <RankList
            title="Zarur kitoblar"
            icon={<BookOpen size={16} />}
            meta="band / jami"
            items={summary.few_books}
            getKey={fewKey}
            getName={bookName}
            getRatio={fewRatio}
            getValue={fewValue}
            searchPlaceholder="Kitob nomi yoki ID"
          />
        ) : (
          <div className="dash-card">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        )}
      </section>
    </div>
  );
}
