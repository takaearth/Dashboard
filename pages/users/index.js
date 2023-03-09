//hooks
import useUsersFetch from "@/hooks/users";
//custom components
import Breadcrumb from "@/components/elements/Breadcrumb";
import { AuthGuard } from "@/components/elements/AuthGuard";
import SectionUsersStats from "@/components/sections/stats/SectionUsersStats";
import SectionUsersCharts from "@/components/sections/charts/SectionUsersCharts";

export default function UsersPage() {
  const { users } = useUsersFetch();

  return (
    <AuthGuard>
      <main className="bg-gray-100 w-full min-h-screen max-h-screen overflow-y-scroll custom-scroll pt-20 px-6">
        <div className="flex items-center justify-between mt-3">
          <Breadcrumb routes={["Users"]} />
        </div>
        <SectionUsersStats data={users}/>
        <SectionUsersCharts data={users}/>
      </main>
    </AuthGuard>
  );

  function handleChange(event) {
    setSearch(event.target.value);
  }
}
