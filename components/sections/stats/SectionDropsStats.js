import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//custom components
import Stats from "@/components/cards/Stats";
import { isThisWeek } from "date-fns";
//dynamic imports
const FaUserTag = dynamic(
  async () => (await import("react-icons/fa")).FaUserTag
);
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
  const [weeks, setWeeks] = useState(0);
  const [totalContainers, setTotalContainers] = useState(0);

  //create new array from all the container arrays in a drop
  const allCont = drops?.map((drop) => drop.containers);
  //flatten the array
  const allContFlat = [].concat.apply([], allCont);
  //sum the total number of containers
  const totalCont = allContFlat.reduce((acc, cur) => {
    return acc + cur.containers;
  }, 0);

  let currentWeekDrops = getCurrentWeekDrops(drops);

  return (
    <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
      <Stats
        title="Drops this Week"
        count={currentWeekDrops?.length || 0}
        icon={<FaUserCheck size="2em" />}
      />
      <Stats
        title="Average Cont per Users"
        count={
          totalCont > 0 ? (totalCont / drops?.length).toFixed(2) : totalCont
        }
        icon={<FaUserTag size="2em" />}
      />
      <Stats
        title="Containers"
        count={totalCont}
        icon={<FaRecycle size="2em" />}
      />
      <Stats
        title="Drops"
        count={drops?.length || 0}
        icon={<FiPackage size="2em" />}
      />
    </section>
  );

  function getCurrentWeekDrops(array) {
    let filtered = array.filter((drop) => {
      return isThisWeek(new Date(drop.timestamp));
    });
    return filtered;
  }
}
