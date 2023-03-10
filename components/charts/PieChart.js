import dynamic from "next/dynamic";

export default function PieChart({ title, subtitle, values, labels }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const data = {
    series: values || [],
    options: {
      colors: [
        "#059669",
        "#eab308",
        "#ea5545",
        "#f46a9b",
        "#ef9b20",
        "#edbf33",
        "#ede15b",
        "#bdcf32",
        "#87bc45",
        "#27aeef",
        "#b33dc6",
      ],
      title: {
        text: title,
        align: "left",
      },
      subtitle: {
        text: subtitle,
        align: "left",
      },
      dataLabels: {
        enabled: true,
        formatter: function (_, opts) {
          let val = opts.w.config.series[opts.seriesIndex];
          //return val + "%";
          return val;
        },
      },
      labels: labels || [],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 0,
      },
    },
  };

  return (
    <div className=" relative h-full">
      <div className="mixed-chart">
        {typeof window !== "undefined" && (
          <Chart
            options={data.options}
            series={data.series}
            type="pie"
            width="100%"
            height="350px"
          />
        )}
      </div>
    </div>
  );
}
