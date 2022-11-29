import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { NextSeo } from "next-seo";
//Layout
import { getLayout } from "components/Layout/Layout";

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  });

  return (
    <>
      <NextSeo noindex={true} />

      <div className="w-screen h-screen grid self-center">404</div>
    </>
  );
};

Error.getLayout = getLayout;

export default Error;
