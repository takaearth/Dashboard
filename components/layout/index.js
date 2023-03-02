import { useEffect } from "react";
import dynamic from "next/dynamic";
//custom
const Sidebar = dynamic(() => import("./sidebar"));
const Modals = dynamic(() => import("../modals"));

export default function Layout({ children, path }) {
  useEffect(() => {
    document.getElementById("loader").style.display = "none";
  }, []);

  return (
    <>
      <main className="flex">
        <Sidebar />
        {children}
        <Modals/>
      </main>
    </>
  );
}
