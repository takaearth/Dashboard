//custom components
import DropsList from "./DropsList";
import Breadcrumb from "@/components/elements/Breadcrumb";
import { AuthGuard } from "@/components/elements/AuthGuard";

export default function DropsPage() {
  return (
    <AuthGuard>
      <main className="bg-gray-100 w-full h-screen pt-20 px-6">
        <Breadcrumb routes={["Drops"]} />
        <DropsList />
      </main>
    </AuthGuard>
  );
}
