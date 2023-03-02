import dynamic from "next/dynamic";
//hooks
import useFeedbackFetch from "@/hooks/feedback";
//dynamic imports
const BiUserCircle = dynamic(
  async () => (await import("react-icons/bi")).BiUserCircle
);

export default function FeedbackList() {
  const { ussdfeed } = useFeedbackFetch();
  return (
    <section>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Comment
            </th>
          </tr>
        </thead>
        <tbody>
          {ussdfeed.map((pickup) => (
            <tr
              key={pickup.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <span className="text-emerald-600">
                  <BiUserCircle size="3em" />
                </span>
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {pickup?.user?.name}
                  </div>
                  <div className="font-normal text-gray-500">
                    {pickup?.user?.id}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4 ">{pickup?.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
