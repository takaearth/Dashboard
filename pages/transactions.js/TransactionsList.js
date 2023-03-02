import dynamic from "next/dynamic";
//hooks
import useTransactionsFetch from "@/hooks/transactions";
//dynamic imports
const BiUserCircle = dynamic(
  async () => (await import("react-icons/bi")).BiUserCircle
);

export default function TransactionsList() {
  const { transactions } = useTransactionsFetch();
  return (
    <section>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              FILEID
            </th>
            <th scope="col" className="px-4 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Ref
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((trans) => (
            <tr
              key={trans.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              
              <td className="px-6 py-4 ">{trans.file_id}</td>
              <td className="px-6 py-4 ">{trans.user}</td>
              <td className="px-6 py-4 ">{trans.provider_reference}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                  {trans?.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-emerald-600 dark:text-emerald-500 hover:underline"
                >
                  View More
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
