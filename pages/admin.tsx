import React, { FC } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { dehydrate, QueryClient } from "@tanstack/react-query";

//Layout
import { getLayout } from "components/Layout/Layout";

//Components
import ExternalLink from "components/Shared/ExternalLink";

const About = () => {
  return (
    <>
      <NextSeo
        title={"Admin Dashboard"}
        description={"Admin Dashboard Page"}
        openGraph={{
          type: "website",
          title: "Admin Dashboard",
          description: "Admin Dashboard",
          url: "https://www.ditto-nation.com/admin",
        }}
        noindex={true}
      />
      <section className="px-4 max-w-8xl mx-auto">
        <h1 className="uppercase font-bold text-2xl lg:text-3xl">Dashboard</h1>

        <p>Dashboard Stuff like upload and delete images etc.</p>
      </section>

      <section className="px-4 mt-8 max-w-8xl">
        <ul className="flex gap-4 font-black ">
          <li className=" hover:text-pink transition-all duration-150 ease-linear">
            <Link href="/shipping">
              <a>Shipping</a>
            </Link>
          </li>
          <li className="hover:text-pink transition-all duration-150 ease-linear">
            <Link href="/legal">
              <a>Terms & Conditions</a>
            </Link>
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
