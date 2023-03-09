import Head from "next/head";
import { Inter } from "next/font/google";
//hooks
import useUsersFetch from "@/hooks/users";
import useDropsFetch from "@/hooks/drops";
import usePickupsFetch from "@/hooks/pickups";
import useTransactionsFetch from "@/hooks/transactions";
//custom components
import { AuthGuard } from "@/components/elements/AuthGuard";
import SectionHomeStats from "@/components/sections/stats/SectionHomeStats";
import SectionHomeCharts from "@/components/sections/charts/SectionHomeCharts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { users } = useUsersFetch();
  const { drops } = useDropsFetch();
  const { pickups } = usePickupsFetch();
  const { transactions } = useTransactionsFetch();
  return (
    <>
      <Head>
        <title>Taka Dashboard | Home</title>
        <meta name="description" content="Taka Earth Intranet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthGuard>
        <main className="bg-gray-100 w-full min-h-screen max-h-screen overflow-y-scroll custom-scroll pt-20 px-6">
          <SectionHomeStats
            data={{
              users,
              drops,
              pickups,
              transactions,
            }}
          />
          <SectionHomeCharts data={{
              users,
              drops,
              pickups,
              transactions,
            }}/>
        </main>
      </AuthGuard>
    </>
  );
}
