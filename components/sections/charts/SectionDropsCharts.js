//hooks

//custom components
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";

export default function SectionDropsCharts({ data: drops }) {
  return (
    <section className="mb-20">
      <div className="grid gap-6  2xl:grid-cols-4">
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <DonutChart
            title="Waste"
            subtitle="Waste Types"
            values={[20, 10, 5, 15]}
            labels={["Plastic", "Glass", "Metal", "Paper"]}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <BarChart
            title="Top Brands"
            subtitle="Top Brands by Volume"
            label="Label"
            values={[50, 40, 30, 20, 10]}
            categories={["Cocacola", "Bidco", "Unilever", "EABL", "Brookside"]}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative 2xl:col-span-2">
          <LineChart
            title="Interactions"
            subtitle="Customer Interactions"
            label="Label"
            values={[10, 20, 30, 40, 30]}
            categories={["Jan", "Feb", "Apr", "May", "Jun"]}
          />
        </section>
      </div>
    </section>
  );
}
