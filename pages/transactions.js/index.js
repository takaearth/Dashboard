//custom components
import TransactionsList from "./TransactionsList";
import Breadcrumb from "@/components/elements/Breadcrumb";
import { AuthGuard } from "@/components/elements/AuthGuard";

export default function TransactionsPage() {
  return (
    <AuthGuard>
      <main className="bg-gray-100 w-full h-screen pt-20 px-6">
        <Breadcrumb routes={["Transactions"]} />
        <TransactionsList />
      </main>
    </AuthGuard>
  );
}
