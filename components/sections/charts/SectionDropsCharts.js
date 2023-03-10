//hooks
//custom components
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";

export default function SectionDropsCharts({ data: drops }) {
  //create new array from all the container arrays in a drop
  const allCont = drops?.map((drop) => drop.containers);
  //flatten the array
  const allContFlat = [].concat.apply([], allCont);

  let processDrops = getImportantValues(allContFlat);

  //count the types of waste
  let types = {
    values: Object.values(processDrops.mergedTypes) || [],
    labels: Object.keys(processDrops.mergedTypes) || [],
  };

  //count the brands of waste
  let brands = {
    values: Object.values(processDrops.countBrands) || [],
    labels: Object.keys(processDrops.countBrands) || [],
  };

  return (
    <section className="mb-20">
      <div className="grid gap-6 2xl:grid-cols-3">
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <DonutChart
            title="Waste"
            subtitle="Waste Types"
            values={types.values}
            labels={types.labels}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative 2xl:col-span-2">
          <LineChart
            title="Interactions"
            subtitle="Customer Interactions"
            label="Label"
            values={[0, 0, drops?.length || 0]}
            categories={["Jan", "Feb", "Mar"]}
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
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <PieChart
            title="Other Brands"
            subtitle="Brands with Custom Containers"
            values={[
              processDrops?.countOthers?.brands.length || 0,
              (allContFlat.length || 0) -
                (processDrops?.countOthers?.brands.length || 0),
            ]}
            labels={["Others", "Listed"]}
          />
        </section>
        <section className="bg-white p-6 rounded-xl mt-10 relative">
          <PieChart
            title="Other Products"
            subtitle="Products with Custom Containers"
            values={[
              processDrops?.countOthers?.products.length || 0,
              (allContFlat.length || 0) -
                (processDrops?.countOthers?.products.length || 0),
            ]}
            labels={["Others", "Listed"]}
          />
        </section>
      </div>
      <div className="grid gap-6 2xl:grid-cols-2">
          <section className="bg-white p-6 rounded-xl mt-10 relative w-full">
            <p className="font-medium text-black">Other Brands</p>
            <p className="font-light text-gray-700 text-xs mb-6">List of typed Brands</p>
            <div className="flex flex-1 flex-wrap gap-2">
              {processDrops?.countOthers?.brands?.length > 0 &&
                processDrops?.countOthers?.brands?.map((brand) => {
                  return <span className="badge badge-primary">{brand}</span>;
                })}
            </div>
          </section>
          <section className="bg-white p-6 rounded-xl mt-10 relative w-full">
            <p className="font-medium text-black">Other Products</p>
            <p className="font-light text-gray-700 text-xs mb-6">List of typed Products</p>
            <div className="flex flex-wrap gap-2">
              {processDrops?.countOthers?.products?.length > 0 &&
                processDrops?.countOthers?.products?.map((prod) => {
                  return <span className="badge badge-primary">{prod}</span>;
                })}
            </div>
          </section>
        </div>
    </section>
  );

  function getImportantValues(items) {
    const countTypes = {};
    const countBrands = {};
    const countOthers = {
      brands: [],
      products: [],
      count: 0,
    };

    for (let i = 0; i < items.length; i++) {
      const type = items[i].type;
      const num = items[i].containers;

      if (typeof type === "string") {
        if (countTypes[type]) {
          countTypes[type] += num;
        } else {
          countTypes[type] = num;
        }
      }

      const brand = items[i].brand;

      if (typeof brand === "string" && !items[i].ob) {
        if (countBrands[brand]) {
          countBrands[brand]++;
        } else {
          countBrands[brand] = 1;
        }
      }

      if (items[i].ob) {
        countOthers.brands.push(items[i].brand);
      } else if (items[i].op) {
        countOthers.products.push(items[i].product);
      }
    }

    let mergedTypes = mergePlastics(countTypes);
    return {
      mergedTypes,
      countBrands,
      countOthers,
    };
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
