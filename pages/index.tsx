import { NextSeo } from "next-seo";

import Image from "next/image";
import { shopifyGraphqlRequestClient } from "src/lib/clients/graphqlRequestClient";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { getLayout } from "components/Layout/Layout";

import { useGetShopInfoQuery } from "src/generated/graphql";

export default function Home() {
  return (
    <>
      <NextSeo title="Home" />
      <div className="fixed overflow-hidden top-0 left-0 !h-screen !w-screen bg-[url('https://cdn.shopify.com/s/files/1/0521/9357/files/test-ditto-skinhead.jpg?v=1613569482')] bg-center">
        {/* <Image
          src={
            "https://cdn.shopify.com/s/files/1/0521/9357/files/test-ditto-skinhead.jpg?v=1613569482"
          }
          alt="homepage"
          layout="fill"
        ></Image> */}
      </div>
    </>
  );
}

Home.getLayout = getLayout;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useGetShopInfoQuery.getKey(),
    useGetShopInfoQuery.fetcher(shopifyGraphqlRequestClient)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 180, // In seconds
  };
};
