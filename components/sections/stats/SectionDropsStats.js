import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//custom components
import Stats from "@/components/cards/Stats";
//dynamic imports
const HiUsers = dynamic(async () => (await import("react-icons/hi")).HiUsers);
const FiPackage = dynamic(
  async () => (await import("react-icons/fi")).FiPackage
);
const FaUserCheck = dynamic(
  async () => (await import("react-icons/fa")).FaUserCheck
);
const FaRecycle = dynamic(
  async () => (await import("react-icons/fa")).FaRecycle
);

export default function SectionDropsStats({ data: drops }) {
  const [totalContainers, setTotalContainers] = useState(0);

  useEffect(() => {
    if (drops?.length > 0) {
      //create new array from all the container arrays in a drop
      const allCont = drops?.map((drop) => drop.containers);
      //flatten the array
      const allContFlat = [].concat.apply([], allCont);

      //sum the total number of containers
      const totalCont = allContFlat.reduce((acc, cur) => {
        return acc + cur.containers;
      }, 0);
      setTotalContainers(totalCont);
    }
  }, [drops]);

  return (
    <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
      <Stats
        title="Active Users this Week"
        count={drops?.length || 0}
        icon={<FaUserCheck size="2em" />}
      />
      <Stats
        title="Active Users this month"
        count={drops?.length || 0}
        icon={<FaUserCheck size="2em" />}
      />
      <Stats
        title="Containers"
        count={totalContainers}
        icon={<FaRecycle size="2em" />}
      />
      <Stats
        title="Drops"
        count={drops?.length || 0}
        icon={<FiPackage size="2em" />}
      />
    </section>
  );
}
