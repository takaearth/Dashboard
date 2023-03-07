//hooks

//custom components
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import DonutChart from "@/components/charts/DonutChart";

export default function SectionHomeCharts() {

  return (
    <section className="mb-20">
      <div className="grid gap-6 2xl:grid-cols-4">
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <DonutChart
            title="Users"
            subtitle="User Enrollment"
            values={[20, 10]}
            labels={["Stand", "Online"]}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <PieChart
            title="Requests"
            subtitle="User Requests"
            values={[50, 10]}
            labels={["Drops", "Pickups"]}
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
