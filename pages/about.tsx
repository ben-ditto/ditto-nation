import React from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { dehydrate, QueryClient } from "@tanstack/react-query";

//Layout
import { getLayout } from "components/Layout/Layout";

const About = () => {
  return (
    <>
      <NextSeo
        title={"About"}
        description={"About Page"}
        openGraph={{
          type: "website",
          title: "About",
          description: "About Page",
          url: "https://www.ditto-nation.com/about",
        }}
      />

      <section className="px-4 max-w-8xl mx-auto">
        <h1 className="uppercase font-bold text-2xl lg:text-3xl">About</h1>
        <p className="mt-3 lg:mt-4 lg:text-xl max-w-[850px] 2xl:max-w-[1312px]">
          Ved tidenes morgen delte en fjord seg og sprutet ut vulkansk stein,
          som en salamander med vinger steg opp fra. Han tilintetgjorde tusenvis
          av hærer og slukte sjelene til millioner. Det ble ført en krig for å
          stoppe ham, men intet menneske og ingen algoritme kunne beseire ham.
          Til den dag i dag hersker han over alt fra sitt bevoktede domene,
          plassert på et taggete fjell av blod og tårer. Navnet hans er Ben
          Ditto.
        </p>
      </section>

      <section className="px-4 mt-8 max-w-8xl">
        <ul className="flex gap-4 font-black ">
          <li className=" hover:text-pink transition-all duration-150 ease-linear">
            <Link href="/shipping">
              <a>Shipping</a>
            </Link>
          </li>
          <li className="hover:text-pink transition-all duration-150 ease-linear">
            Legal
          </li>
        </ul>
      </section>
    </>
  );
};

About.getLayout = getLayout;

export default About;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 20, // In seconds
  };
};
