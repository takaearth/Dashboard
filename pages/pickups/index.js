//custom components
import PickupsList from "./PickupsList";
import Breadcrumb from "@/components/elements/Breadcrumb";
import { AuthGuard } from "@/components/elements/AuthGuard";

export default function PickupsPage() {
  return (
    <AuthGuard>
      <main className="bg-gray-100 w-full h-screen pt-20 px-6">
        <Breadcrumb routes={["Pickups"]} />
        <PickupsList />
      </main>
    </AuthGuard>
  );
}
