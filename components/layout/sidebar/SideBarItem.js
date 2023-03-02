import Link from "next/link";
import { motion } from "framer-motion";
import { classNames } from "@/helpers";

export default function SideBarItem({
  open,
  icon,
  link,
  title,
  index,
  selected,
}) {
  return (
    <Link href={link}>
      <motion.div
        initial="hide"
        animate="rest"
        whileTap="tap"
        custom={index}
        variants={buttonAnim}
        className={classNames(
          "relative w-full flex gap-2 items-center p-4 rounded-lg hover:shadow-sm transition-colors duration-75 ease-linear",
          open ? "justify-start" : "justify-center",
          selected && "bg-emerald-800",
          !selected && "hover:bg-emerald-700"
        )}
      >
        {icon}{" "}
        <span className={classNames("font-medium", !open && "hidden")}>
          {title}
        </span>
      </motion.div>
    </Link>
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
