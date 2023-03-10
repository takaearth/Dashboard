import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

//custom components
import { classNames } from "@/helpers";

export default function SideBarDrop({
  open,
  icon,
  link,
  title,
  index,
  sublinks,
  selected,
}) {
  const router = useRouter();
  return (
    <motion.div
      initial="hide"
      animate="rest"
      whileTap="tap"
      custom={index}
      variants={buttonAnim}
      className={classNames(
        "relative w-full collapse  collapse-arrow rounded-lg hover:shadow-sm transition-colors duration-75 ease-linear",
        selected && "bg-emerald-800",
        !selected && "hover:bg-emerald-700"
      )}
    >
      <input defaultChecked={selected} type="checkbox" className="peer" readOnly />
      <div
        className={classNames(
          "collapse-title flex gap-2 p-4 items-center text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content",
          open ? "justify-start" : "justify-center"
        )}
      >
        {icon}{" "}
        <span className={classNames("font-medium", !open && "hidden")}>
          {title}
        </span>
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-white">
        {sublinks?.length > 0 &&
          sublinks.map((s, i) => (
            <Link key={i} href={s.link}>
              <div
                className={classNames(
                  "flex gap-2 py-2 items-center mt-2 rounded-md hover:bg-emerald-700",
                  open ? "justify-start px-2" : "justify-center",
                  selected ? "hover:bg-emerald-700" : "hover:bg-emerald-800"
                )}
              >
                {s?.icon ? s.icon : icon}{" "}
                <span className={classNames("font-medium", !open && "hidden")}>
                  {s.title}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </motion.div>
  );

}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const buttonAnim = {
  hide: {
    scale: 0,
    opacity: 0,
    transition: spring,
  },
  rest: (custom) => ({
    scale: 1,
    opacity: 1,
    transition: {
      ...spring,
      delay: custom * 0.1,
    },
  }),
  tap: {
    scale: 1.05,
    transition: spring,
  },
};
