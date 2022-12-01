import { NextSeo } from "next-seo";

import Image from "next/image";
import { shopifyGraphqlRequestClient } from "src/lib/clients/graphqlRequestClient";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { getLayout } from "components/Layout/Layout";

import { useGetShopInfoQuery, GetShopInfoQuery } from "src/generated/graphql";

export default function Home() {
  const { isLoading, error, data } = useGetShopInfoQuery<
    GetShopInfoQuery,
    Error
  >(shopifyGraphqlRequestClient);

  console.log(data);

  const imageUrl = data?.shop?.brand?.coverImage?.image?.url;
  console.log(imageUrl.toString());

  return (
    <>
      <NextSeo
        title="Home"
        description={data?.shop?.description ?? "Ditto Nation Homepage"}
        openGraph={{
          type: "website",
          title: data?.shop?.name ?? "Home",
          description: data?.shop?.description ?? "Ditto Nation Homepage",
          url: "https://www.ditto-nation.com/",
          images: [
            {
              url: data?.shop?.brand?.coverImage?.image?.url!,
              width: 800,
              height: 600,
              alt: "Homepage Cover Image",
            },
          ],
        }}
      />
      <div
        style={{
          backgroundImage:
            `url("${data?.shop?.brand?.coverImage?.image?.url}")` ??
            `url("https://cdn.shopify.com/s/files/1/0521/9357/files/test-ditto-skinhead.jpg?v=1613569482")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={`fixed overflow-hidden top-0 left-0 !h-screen !w-screen bg-center`}
      >
        {/* <Image
          src={
            data?.shop?.brand?.coverImage?.image?.url ??
            "https://cdn.shopify.com/s/files/1/0521/9357/files/test-ditto-skinhead.jpg?v=1613569482"
          }
          alt="homepage"
          width={"100%"}
          height={"100%"}
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
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10, // In seconds
  };
};
