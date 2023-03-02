import Head from "next/head";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
//custom components
import Stats from "@/components/cards/Stats";
import { AuthGuard } from "@/components/elements/AuthGuard";
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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Taka Dashboard | Home</title>
        <meta name="description" content="Taka Earth Intranet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthGuard>
      <main className="bg-gray-100 w-full h-screen pt-20 px-6">
        <section className="grid gap-6 grid-cols-2 xl:grid-cols-4">
          <Stats icon={<HiUsers size="2em" />} title="User" count={10} />
          <Stats
            icon={<FiPackage size="2em" />}
            title="Drop Offs"
            count={100}
          />
          <Stats
            icon={<MdAttachMoney size="2em" />}
            title="Transactions"
            count={100}
          />
          <Stats
            icon={<FaTruckPickup size="2em" />}
            title="Pick Ups"
            count={1}
          />
        </section>
      </main>
      </AuthGuard>
    </>
  );
}
