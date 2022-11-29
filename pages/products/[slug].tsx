import React from "react";
import { useRouter } from "next/router";
import type { GetStaticPropsContext, NextPageContext } from "next";

import { gql } from "graphql-request";
import { shopifyGraphqlRequestClient } from "src/lib/clients/graphqlRequestClient";

import { NextSeo } from "next-seo";

import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";

import { useAddItem } from "lib/shopify/CartHooks";
import { getLayout } from "components/Layout/Layout";
import Loader from "components/UI/Loader";

import {
  GetProductBySlugQuery,
  useGetProductBySlugQuery,
  Product,
  useGetShopInfoQuery,
} from "src/generated/graphql";

import ProductSingle from "components/Product/ProductSingle";

const ProductPage = (context?: NextPageContext) => {
  const router = useRouter();
  const pid = router.query;

  const {
    isLoading: isLoadingProduct,
    error: productError,
    data,
  } = useGetProductBySlugQuery<GetProductBySlugQuery, Error>(
    shopifyGraphqlRequestClient,
    { slug: pid.slug as string }
  );

  const product = data?.productByHandle;

  if (isLoadingProduct) return <Loader />;
  if (productError) return <p>{productError.message}</p>;

  if (!product) router.replace("/");

  console.log(pid);

  return (
    <>
      <NextSeo
        title={product.title}
        description={product.description}
        openGraph={{
          type: "website",
          title: product.title,
          description: product.description,
          images: [
            {
              url: product?.images?.nodes[0]?.url,
              width: 800,
              height: 600,
              alt: product.title,
            },
          ],
        }}
      />
      <ProductSingle context={context} product={product as Product} />
    </>
  );
};

ProductPage.getLayout = getLayout;

export default ProductPage;

export async function getStaticPaths() {
  // Return a list of possible value for slug
  const { products } = await shopifyGraphqlRequestClient.request(
    GET_ALL_PROD_HANDLES_QUERY
  );

  return {
    paths: products.nodes.map(
      (product: Product) => `/products/${product.handle}`
    ),
    fallback: false,
  };
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const queryClient = new QueryClient();

  const { slug } = params;

  await queryClient.prefetchQuery(
    useGetProductBySlugQuery.getKey({ slug: slug }),
    useGetProductBySlugQuery.fetcher(shopifyGraphqlRequestClient, {
      slug: slug,
    })
  );

  await queryClient.prefetchQuery(
    useGetShopInfoQuery.getKey(),
    useGetShopInfoQuery.fetcher(shopifyGraphqlRequestClient)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 180, // In seconds
  };
};

const GET_ALL_PROD_HANDLES_QUERY = gql`
  query getAllProductHandles {
    products(first: 250) {
      nodes {
        handle
      }
    }
  }
`;
