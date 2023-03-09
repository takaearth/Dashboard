import { useState, useEffect } from "react";
//hooks
//custom components
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";

export default function SectionDropsCharts({ data: drops }) {
  const [types, setTypes] = useState({ values: [], labels: [] });
  const [brands, setBrands] = useState({ values: [], labels: [] });

  useEffect(() => {
    if (drops?.length > 0) {
      //create new array from all the container arrays in a drop
      const allCont = drops?.map((drop) => drop.containers);
      //flatten the array
      const allContFlat = [].concat.apply([], allCont);

      let tmpTypes = countTypes(allContFlat);
      setTypes({
        values: Object.values(tmpTypes),
        labels: Object.keys(tmpTypes),
      });
      let tmpBrands = countBrands(allContFlat);
      setBrands({
        values: Object.values(tmpBrands),
        labels: Object.keys(tmpBrands),
      });
    }
  }, [drops]);

  return (
    <section className="mb-20">
      <div className="grid gap-6  2xl:grid-cols-4">
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <DonutChart
            title="Waste"
            subtitle="Waste Types"
            values={types.values}
            labels={types.labels}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <BarChart
            title="Top Brands"
            subtitle="Containers by Brand"
            label="Label"
            values={brands.values}
            labels={brands.labels}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative 2xl:col-span-2">
          <LineChart
            title="Interactions"
            subtitle="Customer Interactions"
            label="Label"
            values={[0, 0, 0, 0, drops?.length || 0]}
            categories={["Jan", "Feb", "Apr", "May", "Jun"]}
          />
        </section>
      </div>
    </section>
  );

  function countBrands(items) {
    const counts = {};

    for (let i = 0; i < items.length; i++) {
      const type = items[i].brand;

      if (typeof type === "string" && !items[i].ob) {
        if (counts[type]) {
          counts[type]++;
        } else {
          counts[type] = 1;
        }
      }
    }

    return counts;
  }

  function countTypes(items) {
    const counts = {};

    for (let i = 0; i < items.length; i++) {
      const type = items[i].type;

      if (typeof type === "string") {
        if (counts[type]) {
          counts[type]++;
        } else {
          counts[type] = 1;
        }
      }
    }

    return mergePlastics(counts);
  }

  function mergePlastics(obj) {
    const result = {};
    let plasticSum = 0;
    for (const prop in obj) {
      if (prop.includes("plastic")) {
        plasticSum += obj[prop];
      } else {
        result[prop] = obj[prop];
      }
    }
    if (plasticSum > 0) {
      result["plastic"] = plasticSum;
    }
    return result;
  }
}
