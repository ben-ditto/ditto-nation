import React from "react";
import { NextSeo } from "next-seo";

import { shopifyGraphqlRequestClient } from "src/lib/clients/graphqlRequestClient";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import Loader from "components/UI/Loader";

//Layout
import { getLayout } from "components/Layout/Layout";

import { useGetShopInfoQuery, GetShopInfoQuery } from "src/generated/graphql";

const LegalPage = () => {
  const { isLoading, error, data } = useGetShopInfoQuery<
    GetShopInfoQuery,
    Error
  >(shopifyGraphqlRequestClient);

  if (isLoading) return <Loader />;
  if (error) return null;

  return (
    <>
      <NextSeo
        title="Legal"
        description={"Legal"}
        openGraph={{
          type: "website",
          title: "Legal",
          description: "Legal",
        }}
      />

      <div
        className="max-w-8xl inner-html"
        dangerouslySetInnerHTML={{ __html: data?.shop.termsOfService?.body }}
      />
    </>
  );
};

LegalPage.getLayout = getLayout;

export default LegalPage;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useGetShopInfoQuery.getKey(),
    useGetShopInfoQuery.fetcher(shopifyGraphqlRequestClient)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10, // In seconds
  };
};
