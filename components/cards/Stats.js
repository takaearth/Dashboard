import Router from "next/router";
import dynamic from "next/dynamic";
//dynamic imports
const BiRightArrow = dynamic(
  async () => (await import("react-icons/bi")).BiRightArrow
);

export default function Stats({ icon, title, count, link }) {
  return (
    <div
      onClick={handleClick}
      className="rounded-lg bg-white py-4 px-6 shadow-lg"
    >
      <div className="flex gap-2 items-center justify-start">
        {icon} <span className="font-medium">{title}</span>
      </div>
      <p className="font-semibold text-4xl text-right text-primary">{count}</p>
      {link?.length > 0 && (
        <div className="flex gap-2 items-center justify-end mt-4">
          <span className="text-xs">View More</span>{" "}
          <BiRightArrow size="0.75em" />
        </div>
      )}
    </div>
  );

  function handleClick() {
    link?.length > 0 && Router.push(link);
  }
}
