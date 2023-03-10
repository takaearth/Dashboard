//hooks
import useDropsFetch from "@/hooks/drops";
//custom components
import Breadcrumb from "@/components/elements/Breadcrumb";
import { AuthGuard } from "@/components/elements/AuthGuard";
import SectionDropsStats from "@/components/sections/stats/SectionDropsStats";
import SectionDropsCharts from "@/components/sections/charts/SectionDropsCharts";

export default function UsersPage() {
  const { drops } = useDropsFetch();

  return (
    <AuthGuard>
    <main className="bg-gray-100 w-full min-h-screen max-h-screen overflow-y-scroll custom-scroll pt-20 px-6">
        <div className="flex items-center justify-between mt-3">
          <Breadcrumb routes={["Drops"]} />
        </div>
        <SectionDropsStats data={drops} />
        <SectionDropsCharts data={drops} />
        
      </main>
    </AuthGuard>
  );

  function handleChange(event) {
    setSearch(event.target.value);
  }
}
