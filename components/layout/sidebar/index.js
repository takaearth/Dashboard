import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
//custom components
import SideBarItem from "./SideBarItem";
import { useAuth } from "@/context/authContext";
import { classNames } from "@/helpers";
import SideBarDrop from "./SideBarDrop";
import Link from "next/link";
//dynamic imports
const RiHomeFill = dynamic(
  async () => (await import("react-icons/ri")).RiHomeFill
);
const HiUsers = dynamic(async () => (await import("react-icons/hi")).HiUsers);
const FiPackage = dynamic(
  async () => (await import("react-icons/fi")).FiPackage
);
const MdFeedback = dynamic(
  async () => (await import("react-icons/md")).MdFeedback
);
const MdAttachMoney = dynamic(
  async () => (await import("react-icons/md")).MdAttachMoney
);
const FaTruckPickup = dynamic(
  async () => (await import("react-icons/fa")).FaTruckPickup
);
const BiRightArrow = dynamic(
  async () => (await import("react-icons/bi")).BiRightArrow
);
const BiLeftArrow = dynamic(
  async () => (await import("react-icons/bi")).BiLeftArrow
);

export default function Sidebar() {
  const router = useRouter();
  const controls = useAnimationControls();
  const { user, Logout } = useAuth();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) {
      controls.start("rest");
    } else {
      controls.start("shrink");
    }
  }, [open, router?.pathname]);

  if (
    router.pathname.indexOf("/auth/") === 0 ||
    router.pathname.indexOf("/welcome") === 0
  ) {
    return <></>;
  } else {
    return (
      <motion.aside
        variants={contAnim}
        initial="hide"
        animate={controls}
        className="relative h-screen bg-gradient-to-b from-emerald-600 to-emerald-800 text-white drop-shadow-2xl flex flex-col gap-2 pt-5 px-4"
      >
        <div className="flex justify-end w-full">
          <button
            onClick={toggleAnimation}
            className="btn btn-sm btn-circle btn-ghost"
          >
            {open ? (
              <BiLeftArrow size="1.5em" />
            ) : (
              <BiRightArrow size="1.5em" />
            )}
          </button>
        </div>
        <div className="relative h-[5vh] w-full">
          <Link href="/">
            <Image
              src={
                open ? "/images/logo-white-color.png" : "/images/taka-bin.svg"
              }
              sizes="(max-width: 150px) 100vw"
              className="object-contain"
              alt="Taka Earth"
              priority
              fill
            />
          </Link>
        </div>
        <SideBarItem
          link="/"
          index={1}
          open={open}
          title="Home"
          selected={router.pathname === "/"}
          icon={<RiHomeFill size="1.5em" />}
        />
        <SideBarDrop
          index={2}
          open={open}
          title="Users"
          link="/users"
          sublinks={[
            { title: "Analytics", link: "/users" },
            { title: "Users List", link: "/users/list" },
          ]}
          selected={router.pathname.indexOf("/users") === 0}
          icon={<HiUsers size="1.5em" />}
        />
        <SideBarDrop
          index={2}
          open={open}
          link="/drops"
          title="Drop Offs"
          sublinks={[
            { title: "Analytics", link: "/drops" },
            { title: "Drops List", link: "/drops/list" },
          ]}
          selected={router.pathname.indexOf("/drops") === 0}
          icon={<FiPackage size="1.5em" />}
        />
        <SideBarItem
          index={4}
          open={open}
          title="Transactions"
          link="/transactions"
          selected={router.pathname.indexOf("/transactions") === 0}
          icon={<MdAttachMoney size="1.5em" />}
        />
        <SideBarItem
          index={5}
          open={open}
          link="/pickups"
          title="Pick Ups"
          selected={router.pathname.indexOf("/pickups") === 0}
          icon={<FaTruckPickup size="1.5em" />}
        />
        <SideBarItem
          index={6}
          open={open}
          title="Feedback"
          link="/feedback"
          selected={router.pathname.indexOf("/feedback") === 0}
          icon={<MdFeedback size="1.5em" />}
        />
        <div className="flex-1"></div>
        <div className="dropdown dropdown-right">
          <div
            tabIndex={0}
            className={classNames(
              "flex items-center gap-2 pb-10",
              !open && "flex-col"
            )}
          >
            <div className="avatar online">
              <div className="w-10 rounded-full relative">
                <Image src="/images/bin-yellow.png" alt="User" fill />
              </div>
            </div>
            <div>
              <p className={classNames("font-medium", !open && "text-center")}>
                {user?.name}
              </p>
              {open && <p className="text-xs break-all">{user?.email}</p>}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-emerald-600"
          >
            <li onClick={Logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </motion.aside>
    );
  }

  function toggleAnimation() {
    setOpen((prevState) => !prevState);
  }
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const contAnim = {
  hide: {
    width: 0,
    opacity: 0,
    transition: spring,
  },
  shrink: {
    width: "100px",
    transition: {
      when: "beforeChildren",
      type: "spring",
      stiffness: 200,
      damping: 30,
    },
  },
  rest: {
    width: "300px",
    opacity: 1,
    transition: {
      when: "beforeChildren",
      type: "spring",
      stiffness: 200,
      damping: 30,
    },
  },
};
