import { Card, Row, Col, Tooltip, Button, Skeleton, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StatsAPI } from "api/stats";
import ReactApexChart from "react-apexcharts";
import {
  User,
  Book,
  Users,
  BookOpen,
  TrendingUp,
  AlertCircle,
  UserPlus,
  BarChart3,
  Award,
  PieChart,
  Venus,
  Mars,
  ExternalLink,
  Calendar,
  Clock,
  Timer,
  Star,
} from "lucide-react";
import "./dashboard.css";
import SearchableListCard from "./SearchableListCard";
import "./types.js"; // JSDoc types import

/**
 * @typedef {Object} TopLibrarian
 * @property {string} lastName - Kutubxonachining familiyasi
 * @property {string} count - Ijara soni
 * @property {number} user_id - Foydalanuvchi ID si
 * @property {"male"|"female"} gender - Jinsi
 */

/**
 * @typedef {Object} Gender
 * @property {string} male - Erkaklar soni
 * @property {string} female - Ayollar soni
 */

/**
 * @typedef {Object} TopBook
 * @property {string} count - O'qilgan soni
 * @property {string} name - Kitob nomi
 * @property {number} id - Kitob ID si
 */

/**
 * @typedef {Object} RentByDay
 * @property {string} day - Sana (ISO format)
 * @property {string} count - Ijara soni
 */

/**
 * @typedef {Object} FewBook
 * @property {string} total - Umumiy nusxalar soni
 * @property {number} bookId - Kitob ID si
 * @property {string} name - Kitob nomi
 * @property {string} busies - Band bo'lgan nusxalar soni
 */

/**
 * @typedef {Object} DashboardStats
 * @property {TopLibrarian[]} top_librarians - Eng faol kutubxonachilar
 * @property {Gender} gender - Jinslar bo'yicha statistika
 * @property {string} reading_books_count - O'qilayotgan kitoblar soni
 * @property {string} librarians_count - Kutubxonachilar soni
 * @property {string} books_count - Kitoblar soni
 * @property {TopBook[]} top_books - Eng ko'p o'qilgan kitoblar
 * @property {number} rents_count - Umumiy ijara soni
 * @property {string} expired_leases - Muddati o'tgan ijaralar soni
 * @property {number} dayly_leasing_books_avarage_count_of_last_month - Oxirgi oylik kunlik o'rtacha ijara
 * @property {string} leased_books_count_of_last_month - Oxirgi oydagi ijara soni
 * @property {string} leased_books_count_of_last_week - Oxirgi haftadagi ijara soni
 * @property {string} leased_books_count_of_last_24_hours - Oxirgi 24 soatdagi ijara soni
 * @property {RentByDay[]} one_month_leased_rents_by_day - Oylik ijara statistikasi kunlar bo'yicha
 * @property {RentByDay[]} one_month_returned_rents_by_day - Oylik qaytarilgan kitoblar statistikasi
 * @property {TopBook[]} top_books_last_week - Oxirgi haftaning top kitoblari
 * @property {number} new_users_count_last_month - Oxirgi oydagi yangi foydalanuvchilar
 * @property {number} new_users_count_last_24_hours - Oxirgi 24 soatdagi yangi foydalanuvchilar
 * @property {FewBook[]} few_books - Kam nusxali kitoblar
 */

/**
 * Dashboard komponenti kutubxona statistikasini ko'rsatadi
 * @param {DashboardStats} stats - API dan kelgan statistika ma'lumotlari
 */
export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    StatsAPI.getStats()
      .then((res) => {
        setStats(res);
      })
      .catch(() => {
        message.error("Statistika yuklanmadi");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return (
      <div style={{ margin: "10px auto", padding: 16 }}>
        <Skeleton.Input
          active
          size="large"
          style={{ width: 320, marginBottom: 24, borderRadius: 8 }}
        />
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Skeleton.Button
              key={i}
              active
              style={{ width: 220, height: 80, borderRadius: 12 }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <Skeleton.Input
            active
            style={{ width: 400, height: 260, borderRadius: 12 }}
          />
          <Skeleton.Input
            active
            style={{ width: 400, height: 260, borderRadius: 12 }}
          />
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[...Array(4)].map((_, i) => (
            <Skeleton
              active
              paragraph={{ rows: 6 }}
              title={false}
              key={i}
              style={{ width: 340, borderRadius: 12 }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Stat cards data
  const statCards = [
    {
      title: "Kitobxonlar",
      value: stats.librarians_count,
      icon: <Users size={32} color="#1677ff" />,
    },
    {
      title: "Kitoblar",
      value: stats.books_count,
      icon: <Book size={32} color="#52c41a" />,
    },
    {
      title: "Ijara soni",
      value: stats.rents_count,
      icon: <BookOpen size={32} color="#faad14" />,
    },
    {
      title: "O'qilayotgan kitoblar",
      value: stats.reading_books_count,
      icon: <TrendingUp size={32} color="#f759ab" />,
    },
    {
      title: "Yangi kitobxonlar (oy)",
      value: stats.new_users_count_last_month,
      icon: <UserPlus size={32} color="#722ed1" />,
    },
    {
      title: "Yangi kitobxonlar (24 soat)",
      value: stats.new_users_count_last_24_hours,
      icon: <UserPlus size={32} color="#52c41a" />,
    },
    {
      title: "Muddati o'tgan ijaralar",
      value: stats.expired_leases,
      icon: <AlertCircle size={32} color="#fa541c" />,
    },
    {
      title: "Kunlik o'rtacha ijara (oy)",
      value: stats.dayly_leasing_books_avarage_count_of_last_month,
      icon: <Calendar size={32} color="#13c2c2" />,
    },
    {
      title: "Oxirgi oy ijaralar",
      value: stats.leased_books_count_of_last_month,
      icon: <Calendar size={32} color="#722ed1" />,
    },
    {
      title: "Oxirgi hafta ijaralar",
      value: stats.leased_books_count_of_last_week,
      icon: <Clock size={32} color="#fa8c16" />,
    },
    {
      title: "Oxirgi 24 soat ijaralar",
      value: stats.leased_books_count_of_last_24_hours,
      icon: <Timer size={32} color="#f5222d" />,
    },
  ];

  // Gender Donut Chart
  const genderChart = {
    series: [Number(stats.gender.male), Number(stats.gender.female)],
    options: {
      chart: { type: "donut" },
      labels: ["Erkak", "Ayol"],
      colors: ["#1677ff", "#f759ab"],
      legend: { position: "bottom" },
      dataLabels: { enabled: true },
    },
  };

  // Monthly Rents Line Chart
  const rentsByDay = stats.one_month_leased_rents_by_day || [];
  const returnedByDay = stats.one_month_returned_rents_by_day || [];
  const lineChart = {
    series: [
      {
        name: "Olindi",
        data: rentsByDay.map((d) => Number(d.count)),
      },
      {
        name: "Qaytarildi",
        data: returnedByDay.map((d) => Number(d.count)),
      },
    ],
    options: {
      chart: { type: "line", height: 500, toolbar: { show: false } },
      xaxis: {
        categories: rentsByDay.map((d) => d.day.slice(5, 10)),
        labels: { rotate: -45 },
      },
      colors: ["#1677ff", "#52c41a"],
      stroke: { width: 3, curve: "smooth" },
      legend: { position: "top" },
    },
  };

  // Top Books List
  const topBooks = stats.top_books;
  // Top Librarians List
  const topLibrarians = stats.top_librarians;
  // Few Books List
  const fewBooks = stats.few_books;
  // Top Books Last Week
  const topBooksLastWeek = stats.top_books_last_week || [];

  return (
    <div className="dashboard-container">
      {user.library && (
        <h1 style={{ fontWeight: 700, fontSize: 24, margin: 0 }}>
          {user.library.name}{" "}
          {user.library.name.toLowerCase().includes("kutubxona")
            ? ""
            : " kutubxonasi"}{" "}
          statistikasi
        </h1>
      )}

      <Row gutter={[8, 8]} style={{ marginBottom: 0 }}>
        {statCards.map((card, i) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={i}>
            <Card
              bordered
              style={{ borderRadius: 12, marginBottom: 0, height: "100%" }}
              bodyStyle={{
                display: "flex",
                alignItems: "start",
                padding: 10,
                gap: 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 48,
                  minHeight: 48,
                }}
              >
                {card.icon}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <span style={{ fontSize: 22, fontWeight: 700, color: "#222" }}>
                  {Number(card.value).toLocaleString("ru")}
                </span>
                <span style={{ fontSize: 15, color: "#888", marginBottom: 2 }}>
                  {card.title}
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[8, 8]} style={{ marginBottom: 0 }}>
        <Col xs={24} md={18}>
          <Card
            bordered
            style={{ borderRadius: 12, height: "100%", marginBottom: 0 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <BarChart3 size={20} />
              <span style={{ fontWeight: 600 }}>
                Oxirgi 1 oy: Ijara va qaytarilganlar
              </span>
            </div>
            <ReactApexChart
              options={lineChart.options}
              series={lineChart.series}
              type="line"
              height={280}
            />
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card
            bordered
            style={{ borderRadius: 12, height: "100%", marginBottom: 0 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <PieChart size={20} />
              <span style={{ fontWeight: 600 }}>Gender bo'yicha taqsimot</span>
            </div>
            <ReactApexChart
              options={genderChart.options}
              series={genderChart.series}
              type="donut"
              height={220}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <SearchableListCard
            title="Zarur kitoblar"
            icon={<BookOpen size={20} />}
            items={fewBooks.sort((a, b) => b.total - a.total)}
            placeholder="Kitob nomi yoki raqami"
            getSearchValue={(book) => book.name + book.bookId}
            renderItem={(book, i) => (
              <li key={book.bookId || i}>
                <span>{book.name}</span>
                <span
                  style={{
                    color: "#1677ff",
                    fontWeight: 600,
                    minWidth: 50,
                    textAlign: "right",
                  }}
                >
                  {book.busies} / {book.total}
                </span>
              </li>
            )}
          />
        </Col>
        <Col xs={24} md={6}>
          <SearchableListCard
            title="Top kitoblar"
            icon={<Award size={20} />}
            items={topBooks}
            placeholder="Kitob nomi..."
            getSearchValue={(book) => book.name + book.id}
            renderItem={(book, i) => (
              <li
                key={book.id || i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 600, color: "#1677ff", minWidth: 22 }}
                >
                  {i + 1}.
                </span>
                <span style={{ flex: 1 }}>{book.name}</span>
                <span style={{ fontWeight: 600 }}>{book.count}</span>
              </li>
            )}
          />
        </Col>
        <Col xs={24} md={6}>
          <SearchableListCard
            title="Top kitobxonlar"
            icon={<User size={20} />}
            items={topLibrarians}
            placeholder="Familiya..."
            getSearchValue={(librarian) => librarian.lastName}
            renderItem={(l, i) => (
              <li
                key={l.user_id || i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 600, color: "#f759ab", minWidth: 22 }}
                >
                  {i + 1}.
                </span>
                <span style={{ flex: 1 }}>{l.lastName}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontWeight: 600 }}>{l.count}</span>
                  {l.gender === "female" ? (
                    <Venus size={16} color="#f759ab" />
                  ) : (
                    <Mars size={16} color="#1677ff" />
                  )}
                  <Tooltip title="Ijara tarixini ko'rish">
                    <Button
                      type="text"
                      icon={<ExternalLink size={16} />}
                      onClick={() =>
                        window.open(
                          `/app/rents/?size=20&page=1&q=u${l.user_id}.`,
                          "_blank"
                        )
                      }
                      style={{ marginLeft: 4, padding: 0, height: 24 }}
                    />
                  </Tooltip>
                </span>
              </li>
            )}
          />
        </Col>
        <Col xs={24} md={6}>
          <SearchableListCard
            title="Oxirgi hafta TOP kitoblar"
            icon={<Star size={20} />}
            items={topBooksLastWeek}
            placeholder="Kitob nomi..."
            getSearchValue={(book) => book.name + book.id}
            renderItem={(book, i) => (
              <li
                key={book.id || i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 600, color: "#13c2c2", minWidth: 22 }}
                >
                  {i + 1}.
                </span>
                <span style={{ flex: 1 }}>{book.name}</span>
                <span style={{ fontWeight: 600 }}>{book.count}</span>
              </li>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
