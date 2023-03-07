import { useState } from "react";
//custom components
import DropsList from "../../components/tables/DropsList";
import Breadcrumb from "@/components/elements/Breadcrumb";
import { AuthGuard } from "@/components/elements/AuthGuard";

export default function DropsPage() {
  const [search, setSearch] = useState("");

  return (
    <AuthGuard>
      <main className="bg-gray-100 w-full h-screen pt-20 px-6">
        <div className="flex items-center justify-between">
          <Breadcrumb routes={["Drops List"]} />
          <div className="flex-1 w-full"></div>
          <div className="relative pb-6">
            <input
              type="text"
              placeholder=" "
              onChange={handleChange}
              className="block rounded-lg px-2.5 pb-1.5 pt-4 w-full text-sm bg-white border appearance-none focus:outline-none focus:ring-0 peer text-emerald-700 border-emerald-500 focus:border-emerald-500"
            />
            <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-emerald-700 peer-focus:text-emerald-600">
              Search
            </label>
          </div>
        </div>
        <DropsList search={search}/>
      </main>
    </AuthGuard>
  );

  function handleChange(event){
    setSearch(event.target.value);
  }
}
