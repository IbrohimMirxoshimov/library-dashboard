import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { bucketLabel, fillSeries } from "./range";

const UNIT_LABEL = { day: "kunlik", week: "haftalik", month: "oylik" };

export default function TrendChart({ data, range }) {
  const { series, options } = useMemo(() => {
    const points = fillSeries(data.series, range, data.unit);

    return {
      series: [
        { name: "Berildi", data: points.map((p) => p.leased) },
        { name: "Qaytarildi", data: points.map((p) => p.returned) },
      ],
      options: {
        chart: {
          type: "area",
          toolbar: { show: false },
          zoom: { enabled: false },
          animations: { enabled: points.length < 120 },
          fontFamily: "inherit",
        },
        colors: ["#2a6fdb", "#1f9d6b"],
        dataLabels: { enabled: false },
        stroke: { width: 2, curve: "smooth" },
        fill: {
          type: "gradient",
          gradient: { opacityFrom: 0.28, opacityTo: 0.02 },
        },
        markers: { size: points.length === 1 ? 4 : 0 },
        grid: { borderColor: "#eef0f3", strokeDashArray: 3 },
        xaxis: {
          categories: points.map((p) => bucketLabel(p.date, data.unit)),
          tickAmount: Math.min(points.length, 12),
          labels: { rotate: 0, hideOverlappingLabels: true },
          axisBorder: { show: false },
          axisTicks: { show: false },
          tooltip: { enabled: false },
        },
        yaxis: { min: 0, forceNiceScale: true, labels: { formatter: Math.round } },
        legend: { position: "top", horizontalAlign: "right" },
        tooltip: { shared: true, intersect: false },
      },
    };
  }, [data, range]);

  return (
    <div className="dash-card">
      <div className="dash-card__head">
        <span className="dash-card__title">Ijaralar dinamikasi</span>
        <span className="dash-card__meta">{UNIT_LABEL[data.unit]}</span>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={300}
      />
    </div>
  );
}
