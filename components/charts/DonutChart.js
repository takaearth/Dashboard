import dynamic from "next/dynamic";

export default function DonutChart({ title, subtitle, values, labels }) {
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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: false,
                label: "Total",
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 900,
                color: "#059669",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
              value: {
                offsetY: -8, // -8 worked for me
                color: "#059669",
                fontWeight: 900,
              },
            },
          },
        },
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
            type="donut"
            width="100%"
            height="350px"
          />
        )}
      </div>
    </div>
  );
}
