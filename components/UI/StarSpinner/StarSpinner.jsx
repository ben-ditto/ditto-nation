import Link from "next/link";

import { Star } from "components/Icons";

const StarSpinner = () => {
  return (
    <div className="fixed right-[15%] top-[24%] cursor-pointer z-[9999999999]">
      <Link href="/shop" className="">
        <div className="relative text-current ">
          <div className="animate-spin-slow hover:animate-none text-lime rotate-45">
            <Star />
          </div>
          <h2 className="m-0 p-0 px-1 bg-white pointer-events-none font-bold leading-none text-xl uppercase text-black absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -rotate-[22deg]">
            shop
            <br />
            now
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default StarSpinner;
