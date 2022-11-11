import React from "react";

import { shopifyGraphqlRequestClient } from "src/lib/clients/graphqlRequestClient";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import Layout from "components/Layout";
import Loader from "components/UI/Loader";

import { useGetShopInfoQuery, GetShopInfoQuery } from "src/generated/graphql";

const ShippingPage = () => {
  const { isLoading, error, data } = useGetShopInfoQuery<
    GetShopInfoQuery,
    Error
  >(shopifyGraphqlRequestClient);

  if (isLoading) return <Loader />;
  if (error) return null;

  return (
    <Layout
      main={
        <div
          className="max-w-8xl"
          dangerouslySetInnerHTML={{ __html: data?.shop?.shippingPolicy?.body }}
        />
      }
    />
  );
};

export default ShippingPage;

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
