import Link from "next/link";
import { Fragment } from "react";
import dynamic from "next/dynamic";
//dynamic imports
const RiHomeFill = dynamic(
  async () => (await import("react-icons/ri")).RiHomeFill
);
const MdOutlineKeyboardArrowRight = dynamic(
  async () => (await import("react-icons/md")).MdOutlineKeyboardArrowRight
);

export default function Breadcrumb({ routes }) {
  return (
    <div className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-emerald-600">
      <RiHomeFill size="1em" />
      <Link href="/">
        <span>Dashboard</span>
      </Link>
      {routes &&
        routes?.length > 0 &&
        routes.map((route, index) => {
          return (
            <Fragment key={index}>
              <MdOutlineKeyboardArrowRight size="1.5em" />
              <span>{route}</span>
            </Fragment>
          );
        })}
    </div>
  );
}
