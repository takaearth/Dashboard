//hooks

//custom components
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";

export default function SectionUsersCharts({ data: users }) {
  const activeArr = users?.filter((user) => user.state === "active");
  const haltedArr = users?.filter((user) => user.state === "halted");
  const active = activeArr?.length;
  const halted = haltedArr?.length;

  return (
    <section className="mb-20">
      <div className="grid gap-6 2xl:grid-cols-3">
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <PieChart
            title="Accounts"
            subtitle="Active Accounts"
            values={[active || 0, halted || 0]}
            labels={["Active", "Halted"]}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative 2xl:col-span-2">
          <LineChart
            title="Users"
            subtitle="Customer Aquisition"
            label="Label"
            values={[0, 0, 0, 0, users?.length || 0]}
            categories={["Jan", "Feb", "Mar", "Apr", "May"]}
          />
        </section>
      </div>
    </section>
  );
}
