import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//hooks
import useUsersFetch from "@/hooks/users";
//custom
import { censorPhoneNumber } from "@/helpers";

//dynamic imports
const BiUserCircle = dynamic(
  async () => (await import("react-icons/bi")).BiUserCircle
);
const RiArrowLeftCircleLine = dynamic(
  async () => (await import("react-icons/ri")).RiArrowLeftCircleLine
);
const RiArrowRightCircleLine = dynamic(
  async () => (await import("react-icons/ri")).RiArrowRightCircleLine
);

export default function UsersList({ search }) {
  const { users } = useUsersFetch();
  let limit = 10;
  const [filtered, setFiltered] = useState(users);
  const [page, setPage] = useState([]);
  const [pin, setPin] = useState({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    if (search.length > 0) {
      let tmp = users.filter((user) => {
        let phone = user.id;
        let names = user.name.toLowerCase().split(" ");
        let matched = names.some((name) =>
          name
            .toLowerCase()
            .startsWith(search.slice(0, Math.max(name.length - 1, 1)))
        );
        return phone.includes(search.toLowerCase()) || matched;
      });
      setFiltered(tmp);
    } else {
      setFiltered(users);
    }
  }, [search, users]);

  useEffect(() => {
    if (filtered?.length > limit) {
      setPin({ start: 0, end: limit });
    }else{
      setPin({ start: 0, end: filtered.length })
    }
  }, [filtered]);

  useEffect(() => {
    if (pin) {
      setPage(filtered.slice(pin.start, pin.end));
    }
  }, [pin, filtered]);

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
          {page.map((user) => (
            <tr
              key={user.id}
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
                  <div className="text-base font-medium">{user.name}</div>
                  <div className="font-normal text-gray-500">
                    {censorPhoneNumber(user.id)}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4 ">{user.points}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                  Online
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium  text-emerald-600 dark:text-emerald-500 hover:underline"
                >
                  Edit user
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 justify-center mt-6">
        {pin.start >= limit && (
          <button onClick={loadPrev} className="gap-1 btn btn-sm btn-primary">
            <RiArrowLeftCircleLine size="1.25em" />
            <p>Prev</p>
          </button>
        )}

        {pin.end <= users.length  && page?.length == limit && (
          <button onClick={loadNext} className="gap-1 btn btn-sm btn-primary">
            <p>Next</p>
            <RiArrowRightCircleLine size="1.25em" />
          </button>
        )}
      </div>
    </section>
  );

  function loadPrev() {
    setPin({
      start: pin.start - limit,
      end: pin.end - limit,
    });
  }

  function loadNext() {
    setPin({
      start: pin.start + limit,
      end: pin.end + limit,
    });
  }
}
