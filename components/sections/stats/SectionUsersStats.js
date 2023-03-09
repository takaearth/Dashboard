import dynamic from "next/dynamic";
//custom components
import Stats from "@/components/cards/Stats";
import { isThisMonth, isThisWeek } from "date-fns";
//dynamic imports
const FaUserPlus = dynamic(
  async () => (await import("react-icons/fa")).FaUserPlus
);
const FaUserCheck = dynamic(
  async () => (await import("react-icons/fa")).FaUserCheck
);
const FaUsersSlash = dynamic(
  async () => (await import("react-icons/fa")).FaUsersSlash
);
const FaUserFriends = dynamic(
  async () => (await import("react-icons/fa")).FaUserFriends
);
const BsCalendar3Week = dynamic(
  async () => (await import("react-icons/bs")).BsCalendar3Week
);
const BsCalendar3 = dynamic(
  async () => (await import("react-icons/bs")).BsCalendar3
);

export default function SectionUsersStats({ data: users }) {
  const active = users?.filter((user) => user.state === "active");
  const halted = users?.filter((user) => user.state === "halted");
  const weeks = users?.filter(
    (user) => user?.created instanceof Date && isThisWeek(user.created)
  );
  const months = users?.filter(
    (user) => user?.created instanceof Date && isThisMonth(user.created)
  );

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-3">
        <Stats
          title="Active Accounts"
          count={active?.length || 0}
          icon={<FaUserCheck size="2em" />}
        />
        <Stats
          title="Halted Accounts"
          count={halted?.length || 0}
          icon={<FaUsersSlash size="2em" />}
        />
        <Stats
          title="Total Accounts"
          count={users?.length || 0}
          icon={<FaUserFriends size="2em" />}
        />
      </section>
      <section className="grid gap-6 lg:grid-cols-2 mt-6">
        <Stats
          title="New Accounts this week"
          count={weeks?.length || 0}
          icon={<BsCalendar3Week size="2em" />}
        />
        <Stats
          title="New Accounts this month"
          count={months?.length || 0}
          icon={<BsCalendar3 size="2em" />}
        />
      </section>
    </>
  );
}
