import dynamic from "next/dynamic";
//hooks
import useUsersFetch from "@/hooks/users";
//custom components
import Stats from "@/components/cards/Stats";
import useDropsFetch from "@/hooks/drops";
import useTransactionsFetch from "@/hooks/transactions";
import usePickupsFetch from "@/hooks/pickups";
//dynamic imports
const HiUsers = dynamic(async () => (await import("react-icons/hi")).HiUsers);
const FiPackage = dynamic(
  async () => (await import("react-icons/fi")).FiPackage
);
const MdAttachMoney = dynamic(
  async () => (await import("react-icons/md")).MdAttachMoney
);
const FaTruckPickup = dynamic(
  async () => (await import("react-icons/fa")).FaTruckPickup
);

export default function SectionStats() {
  const { users } = useUsersFetch();
  const { drops } = useDropsFetch();
  const { pickups } = usePickupsFetch();
  const { transactions } = useTransactionsFetch();
  return (
    <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
      <Stats
        link="/users"
        title="Users"
        count={users?.length || 0}
        icon={<HiUsers size="2em" />}
      />
      <Stats
        link="/drops"
        title="Drop Offs"
        count={drops?.length || 0}
        icon={<FiPackage size="2em" />}
      />
      <Stats
        link="/transactions"
        title="Transactions"
        count={transactions?.length || 0}
        icon={<MdAttachMoney size="2em" />}
      />
      <Stats
        link="/pickups"
        title="Pick Ups"
        count={pickups?.length || 0}
        icon={<FaTruckPickup size="2em" />}
      />
    </section>
  );
}
