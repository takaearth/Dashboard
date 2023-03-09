import dynamic from "next/dynamic";

export default function LineChart({title, subtitle, label, values, categories }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const data = {
    series: [{ name: label, data:  values || [] }],
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
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 6,
        strokeColors: "#fff",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        hover: {
          size: 10,
        },
      },
      grid: {
        row: {
            colors: ['#e5e5e5', 'transparent'],
            opacity: 0.5
        }, 
        column: {
            colors: ['#f8f8f8', 'transparent'],
        }, 
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: categories || [],
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        offsetX: 40,
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
            type="area"
            width="100%"
            height="350px"
          />
        )}
      </div>
    </div>
  );
}