import dynamic from "next/dynamic";

export default function BarChart({title, subtitle, label, values, categories }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const data = {
    series: [{ name: label, data:  values || [] }],
    options: {
      title: {
        text: title,
        align: "left",
      },
      subtitle: {
        text: subtitle,
        align: "left",
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
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
        show: false,
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
            type="bar"
            width="100%"
            height="350px"
          />
        )}
      </div>
    </div>
  );
}