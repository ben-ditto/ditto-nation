import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { NextSeo } from "next-seo";
import Error from "next/error";
//Layout
import { getLayout } from "components/Layout/Layout";

const Error404 = () => {
  const router = useRouter();

  useEffect(() => {
    window.location.replace("/");
    // router.replace("/");
  });

  return (
    <>
      <NextSeo noindex={true} />

      <div className="w-screen h-screen grid self-center text-center">
        <Error statusCode={404} />
      </div>
    </>
  );
};

Error404.getLayout = getLayout;

export default Error404;
