import Head from "next/head";
import { Inter } from "next/font/google";
//custom components
import { AuthGuard } from "@/components/elements/AuthGuard";
import SectionHomeStats from "@/components/sections/stats/SectionHomeStats";
import SectionHomeCharts from "@/components/sections/charts/SectionHomeCharts";

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
        <main className="bg-gray-100 w-full min-h-screen max-h-screen overflow-y-scroll custom-scroll pt-20 px-6">
          <SectionHomeStats />
          <SectionHomeCharts/>
        </main>
      </AuthGuard>
    </>
  );
}
