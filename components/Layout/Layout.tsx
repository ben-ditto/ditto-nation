import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";

import { gql } from "graphql-request";
import { GraphQLResponse } from "graphql-request/dist/types";

import { useUI } from "components/UI/context";
//components
import Nav from "components/Shared/Nav";
import Footer from "components/Shared/Footer";

interface IProps {
  main: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ main }) => {
  const { displayMenu } = useUI();

  // useEffect(() => {
  //   console.log("rerender");
  // }, []);

  return (
    <>
      <Nav />
      <main
        // math >.<
        className={clsx(
          displayMenu
            ? "top-[181px] min-h-[calc(100vh-253px)]"
            : "top-[118px] min-h-[calc(100vh-190px)]",
          "relative py-4 px-4 mb-14 md:px-6 xl:px-8 lg:py-8 lg:min-h-[calc(100vh-198px)] transition-all duration-300 ease-in-out"
        )}
      >
        {main}
      </main>
      <Footer />
    </>
  );
};

export const getLayout = (page: ReactElement) => <Layout main={page} />;

export default Layout;
