import dynamic from "next/dynamic";
//custom components
import Stats from "@/components/cards/Stats";
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

export default function SectionUsersStats({ data: users }) {
  const active = users?.filter((user) => user.state === "active");
  const halted = users?.filter((user) => user.state === "halted");

  return (
    <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
      <Stats
        title="New Accounts"
        count={users?.length || 0}
        icon={<FaUserPlus size="2em" />}
      />
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
  );
}
