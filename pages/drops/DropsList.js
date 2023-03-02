import dynamic from "next/dynamic";
//hooks
import useDropsFetch from "@/hooks/drops";
//dynamic imports
const BiUserCircle = dynamic(
  async () => (await import("react-icons/bi")).BiUserCircle
);

export default function DropsList() {
  const { drops } = useDropsFetch();
  return (
    <section>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Points
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
          {drops.map((drop) => (
            <tr
              key={drop.id}
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
                    {drop?.user?.name}
                  </div>
                  <div className="font-normal text-gray-500">
                    {drop?.user?.id}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4 ">{drop?.containers?.length || 0}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                  {drop?.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-emerald-600 dark:text-emerald-500 hover:underline"
                >
                  View Drop
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
