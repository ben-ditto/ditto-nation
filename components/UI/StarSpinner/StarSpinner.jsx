import Link from "next/link";

import { Star } from "components/Icons";

const StarSpinner = () => {
  return (
    <div className="fixed right-[20%] top-[60%] cursor-pointer z-[9999999999]">
      <Link href="/shop" className="">
        <div className="relative text-current ">
          <div className=" animate-spin-slow  hover:animate-none">
            <Star />
          </div>
          <h2 className="m-0 p-0 pointer-events-none font-bold text-2xl uppercase text-secondary absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            shop
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default StarSpinner;
