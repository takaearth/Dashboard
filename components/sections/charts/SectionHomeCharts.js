//hooks
//custom components
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import DonutChart from "@/components/charts/DonutChart";

export default function SectionHomeCharts({data: {users, drops, pickups, transactions}}) {
  return (
    <section className="mb-20">
      <div className="grid gap-6 2xl:grid-cols-4">
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <DonutChart
            title="Users"
            subtitle="User Enrollment"
            values={[users?.length || 0, 0]}
            labels={["Stand", "Online"]}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative 2xl:col-span-2">
          <LineChart
            title="Interactions"
            subtitle="Customer Interactions"
            label="Label"
            values={[ 0, 0, (drops?.length || 0) + (pickups?.length || 0)]}
            categories={["Jan", "Feb", "Mar"]}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <PieChart
            title="Requests"
            subtitle="User Requests"
            values={[drops?.length || 0, pickups?.length || 0]}
            labels={["Drops", "Pickups"]}
          />
        </section>
      </div>
    </section>
  );
}
