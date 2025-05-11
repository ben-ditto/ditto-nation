import React, { useEffect } from "react";
import { NextSeo } from "next-seo";

import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageContext,
} from "next";

import nookies, { destroyCookie, parseCookies } from "nookies";

import { shopifyGraphqlRequestClient } from "src/lib/clients/graphqlRequestClient";

import { getLayout } from "components/Layout/Layout";

//Components
import CartItem from "components/Cart/CartItem";
import Button from "components/UI/Button";
import Loader from "components/UI/Loader";

import {
  useGetCartUsingCartApiQuery,
  GetCartUsingCartApiQuery,
  GetCartUsingCartApiQueryVariables,
  useRemoveCartItemUsingCartApiMutation,
  RemoveCartItemUsingCartApiMutation,
  RemoveCartItemUsingCartApiMutationVariables,
  CartLine,
} from "src/generated/graphql";

const CartPage = (context?: NextPageContext) => {
  const CART_ID = "CART_ID";

  const cookies = parseCookies();

  const cartId = cookies.CART_ID;

  const { data, isLoading, error, isSuccess } = useGetCartUsingCartApiQuery<
    GetCartUsingCartApiQuery,
    Error
  >(shopifyGraphqlRequestClient, {
    cartId: cartId,
  });

  const emptyMessage = (
    <>
      <NextSeo
        title={"Cart"}
        description={"My Cart"}
        openGraph={{
          type: "website",
          title: "Cart",
          description: "My Cart",
        }}
      />
      <h1 className="text-center uppercase font-bold text-2xl">cart empty</h1>
    </>
  );

  useEffect(() => {
    // When the cart has been completed or deleted, the API returns null for data.cart
    if (data && data.cart === null) {
      destroyCookie(context, CART_ID);
    }
  }, [data, context]);

  if (!cartId) {
    return emptyMessage;
  }

  if (isLoading)
    return (
      <>
        <NextSeo title="Cart" />
        <Loader />
      </>
    );

  if (error)
    return (
      <>
        <NextSeo title="Cart" />
        <div className="flex-1 px-4 flex flex-col justify-center items-center max-w-8xl">
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      </>
    );

  if (data) {
    if (data.cart?.__typename === "Cart") {
      if (data?.cart?.lines?.edges.length <= 0) {
        return emptyMessage;
      } else {
        if (isSuccess) {
          return (
            <>
              <NextSeo title="Cart" />
              <div className="px-4 sm:px-6 text-xl flex-1 uppercase font-bold">
                <h1 className="text-center uppercase font-bold text-2xl">
                  My Cart
                </h1>
                {/* <Text variant="pageHeading">My Cart</Text>
          <Text variant="sectionHeading">Review your Order</Text> */}
                <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b border-accent-2">
                  {data.cart.lines.edges.map((item) => (
                    <CartItem
                      key={item.node.id}
                      item={item.node as CartLine}
                      cartId={cartId}
                    />
                  ))}
                </ul>
                {data?.cart?.lines?.edges.length <= 0 ? (
                  <Button
                    href="/"
                    Component="a"
                    className="rounded-md py-3 w-full md:w-auto"
                  >
                    Continue Shopping
                  </Button>
                ) : (
                  <Button
                    href={data?.cart?.checkoutUrl}
                    Component="a"
                    openSeperate
                    className="rounded-md py-3 md:px-2 md:mt-4 w-full md:w-auto"
                  >
                    Proceed to Checkout
                  </Button>
                )}
              </div>
            </>
          );
        }
      }
    }
    return null;
  }
};

CartPage.getLayout = getLayout;

export default CartPage;
