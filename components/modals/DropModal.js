import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
//context
import { useData } from "@/context/dataContext";
//hooks
import usePersonFetch from "@/hooks/person";
//custom
import { findBrand, findProduct, censorPhoneNumber, imageMap } from "@/helpers";

//dynamic imports
const BiUserCircle = dynamic(
  async () => (await import("react-icons/bi")).BiUserCircle
);

export default function DropModal() {
  const { selDrop } = useData();
  const { getPersonFromDb } = usePersonFetch();

  const [person, setPerson] = useState(null);

  useEffect(() => {
    if (selDrop?.submitted?.length > 0) {
      getPersonFromDb(selDrop.submitted).then((person) => {
        setPerson(person);
      });
    }
  }, [selDrop]);

  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-gray-400">Customer Drop</h3>
          <section className="grid gap-4 grid-cols-5 pl-6">
          <div className="col-span-2 flex items-center justify-start gap-4">
              <p className="text-base">Drop ID :</p>
            </div>
            <div className="col-span-3 flex items-center justify-start gap-4">
              <p className="font-medium text-lg text-primary capitalize">
                {selDrop?.id}
              </p>
            </div>
            <div className="col-span-2 flex items-center justify-start gap-4">
              <p className="text-base">Droppped by :</p>
            </div>
            <div className="col-span-3 flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <span className="text-emerald-600">
                <BiUserCircle size="3em" />
              </span>
              <div className="pl-3">
                <div className="text-base font-medium">
                  {selDrop?.user?.name}
                </div>
                <div className="font-normal text-gray-500">
                  {censorPhoneNumber(selDrop?.user?.id)}
                </div>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-start gap-4">
              <p className="text-base">Droppped :</p>
            </div>
            <div className="col-span-3 flex items-center justify-start gap-4">
              <p className="font-medium text-lg text-primary">
                {selDrop?.timestamp instanceof Date &&
                  formatDistanceToNow(selDrop?.timestamp)}{" "}
                ago
              </p>
            </div>
            <div className="col-span-2 flex items-center justify-start gap-4">
              <p className="text-base">Status :</p>
            </div>
            <div className="col-span-3 flex items-center justify-start gap-4">
              <p className="font-medium text-lg text-primary capitalize">
                {selDrop?.status}
              </p>
            </div>
            <div className="col-span-2 flex items-center justify-start gap-4">
              <p className="text-base">Submitted by :</p>
            </div>
            <div className="col-span-3 flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <span className="text-emerald-600">
                <div className="avatar">
                  <div className="w-10 rounded-full relative">
                    <Image src="/images/bin-yellow.png" alt="User" fill />
                  </div>
                </div>
              </span>
              <div className="pl-3">
                <div className="text-base">{person?.name}</div>
                <div className="text-base">{person?.email}</div>
              </div>
            </div>
          </section>
          <h3 className="text-lg font-bold text-gray-400 mb-6">Containers</h3>
          {selDrop?.containers?.length > 0 &&
            selDrop?.containers.map((c, i) => (
              <div className="grid grid-cols-3 border border-dashed bg-white w-full" key={i}>
                <div className="relative h-20">
                  <Image
                    className="object-contain"
                    src={imageMap[c.type]}
                    alt={c.type}
                    fill
                  />
                </div>
                <div className="flex items-center justify-start">
                  <div className="py-2 px-6">
                    {c.op ? (
                      <p className="font-semibold">{c?.product}</p>
                    ) : (
                      <p className="font-semibold">
                        {findProduct(c?.brand, c?.product)}
                      </p>
                    )}
                    {c?.ob ? (
                      <p className="text-sm text-gray-500">{c?.brand}</p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        {findBrand(c?.brand)}
                      </p>
                    )}
                  </div>
                </div>

                <span className="p-4 text-center font-bold">
                  {c?.containers}
                </span>
              </div>
            ))}
        </label>
      </label>
    </div>
  );
}
