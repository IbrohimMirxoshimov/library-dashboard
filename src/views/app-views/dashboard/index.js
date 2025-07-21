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
} from "lucide-react";
import "./dashboard.css";
import SearchableListCard from "./SearchableListCard";

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
      <div style={{ maxWidth: 1200, margin: "10px auto", padding: 16 }}>
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
          {[...Array(4)].map((_, i) => (
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
          {[...Array(3)].map((_, i) => (
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

  return (
    <div className="dashboard-container">
      <h1 style={{ fontWeight: 700, fontSize: 24, margin: 0 }}>
        {user.library.name}{" "}
        {user.library.name.toLowerCase().includes("kutubxona")
          ? ""
          : " kutubxonasi"}{" "}
        statistikasi
      </h1>

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
        <Col xs={24} md={8}>
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
        <Col xs={24} md={8}>
          <SearchableListCard
            title="Top kutubxonachilar"
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
                  <Tooltip title="Ijara tarixini ko‘rish">
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
        <Col xs={24} md={8}>
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
      </Row>
    </div>
  );
}
