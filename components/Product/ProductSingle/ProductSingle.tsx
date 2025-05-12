import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPageContext } from "next";

import {
  CheckoutLineItemInput,
  CartLineInput,
  useAddCartItemMutation,
  useAddCartItemUsingCartApiMutation,
  AddCartItemMutation,
  AddCartItemUsingCartApiMutation,
  AddCartItemMutationVariables,
  AddCartItemUsingCartApiMutationVariables,
  useCreateCartMutation,
  useCreateCartUsingCartApiMutation,
  CreateCartMutation,
  CreateCartUsingCartApiMutation,
  CreateCartMutationVariables,
  CreateCartUsingCartApiMutationVariables,
  Product,
  useGetCartItemCountQuery,
  useGetCartItemCountUsingCartApiQuery,
  useGetCartQuery,
  useGetCartUsingCartApiQuery,
  GetCartItemCountQuery,
  GetCartItemCountUsingCartApiQuery,
  GetCartQuery,
  GetCartUsingCartApiQuery,
  GetCartQueryVariables,
  GetCartUsingCartApiQueryVariables,
} from "src/generated/graphql";

import nookies, { parseCookies } from "nookies";
import { useQueryClient } from "@tanstack/react-query";
import { shopifyGraphqlRequestClient } from "src/lib/clients/graphqlRequestClient";

import { formatPrice } from "lib/shopify/usePrice";

//Components
import Adder from "components/UI/Adder";
import Button from "components/UI/Button";
import ProductView from "./components/ProductView";

interface IProps {
  product: Product;
  context: NextPageContext;
}

const ProductSingle: React.FC<IProps> = ({ product, context }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const queryClient = useQueryClient();

  //Variable for trying stuff out
  // let newCheckoutId: string;

  // Create Cart
  const {
    mutateAsync: mutateCreateCartUsingCartApiAsync,
    isLoading: createCartUsingCartApiLoading,
    isError: createCartApiError,
  } = useCreateCartUsingCartApiMutation<CreateCartUsingCartApiMutation, Error>(
    shopifyGraphqlRequestClient,
    {
      onSuccess: (data, _variables, _context) => {
        const cartId = data.cartCreate.cart?.id!;
        queryClient.invalidateQueries(
          useAddCartItemUsingCartApiMutation.getKey()
        );
        queryClient.invalidateQueries(
          useGetCartItemCountUsingCartApiQuery.getKey({ cartId })
        );
      },
      onError: () => {
        console.error(createCartApiError);
      },
    }
  );

  const CART_ID = "CART_ID";

  const { CART_ID: cartId } = parseCookies();

  const {
    mutateAsync: mutateCartItemUsingCartApiAsync,
    isLoading: addCartApiLoading,
    isError: addCartApiError,
    error,
    reset: resetAddCartError,
  } = useAddCartItemUsingCartApiMutation<
    AddCartItemUsingCartApiMutation,
    Error
  >(shopifyGraphqlRequestClient, {
    onSuccess: (data, _variables, _context) => {
      const { CART_ID: cartId } = parseCookies();
      queryClient.invalidateQueries(
        useAddCartItemUsingCartApiMutation.getKey()
      );
      queryClient.invalidateQueries(
        useGetCartItemCountUsingCartApiQuery.getKey({ cartId })
      );
    },
    onError: () => {
      console.error(addCartApiError);
    },
  });

  const addItemToCart = async (lineItem: CartLineInput) => {
    try {
      console.log(cartId);

      await mutateCartItemUsingCartApiAsync({
        cartId,
        lineItem,
      });
      // await ShopifyService.addCartItem({ checkoutId, lineItem });
      // console.log("worked, checkoutid:", checkoutId);
    } catch (error) {
      const { cartCreate } = await mutateCreateCartUsingCartApiAsync({
        input: {
          lines: [
            {
              quantity: lineItem.quantity,
              merchandiseId: lineItem.merchandiseId,
            },
          ],
        },
      });

      // newCheckoutId = checkoutCreate?.checkout?.id;

      nookies.set(null, "CART_ID", cartCreate.cart?.id!, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      queryClient.invalidateQueries(
        useAddCartItemUsingCartApiMutation.getKey()
      );
      queryClient.invalidateQueries(
        useGetCartItemCountUsingCartApiQuery.getKey({
          cartId: cartCreate.cart?.id,
        })
      );
      // Clear any previous add-to-cart error now that a cart was created
      resetAddCartError();
      console.log("error");
    }
  };

  const buyNow = async (lineItem: CartLineInput) => {
    try {
      const { cartCreate } = await mutateCreateCartUsingCartApiAsync({
        input: { lines: [lineItem] },
      });

      // console.log("weburl", checkoutCreate.checkout.webUrl);

      window.open(cartCreate.cart.checkoutUrl, "_self").focus();
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 p-2 md:px-4 lg:px-6 mx-auto max-w-8xl">
      <ProductView images={product?.images?.nodes} />
      <div className="flex flex-col md:px-8">
        <h1 className="font-extrabold text-3xl mt-3 md:m-0">
          {product?.title}
        </h1>
        <span className="font-extrabold text-2xl mt-0 mb-3">
          {formatPrice({
            amount: product.priceRange.maxVariantPrice.amount,
            currencyCode: product.priceRange.maxVariantPrice.currencyCode,
          })}
        </span>
        <Adder
          amount={quantity}
          add={() => setQuantity((prev) => prev + 1)}
          subtract={() => setQuantity((prev) => prev - 1)}
        />

        <Button
          onClick={async () => {
            await addItemToCart({
              quantity: quantity,
              merchandiseId: product?.variants?.nodes[0]?.id,
            });
          }}
          loading={addCartApiLoading}
          disabled={product?.availableForSale === false}
          className="rounded-md py-3 md:max-w-xs hover:bg-accent-2"
        >
          {product?.availableForSale === false ? "Sold Out" : "Add To Cart"}
        </Button>

        {product?.availableForSale && (
          <Button
            onClick={async () => {
              await buyNow({
                quantity: 1,
                merchandiseId: product?.variants?.nodes[0]?.id,
              });
            }}
            // loading={createCartLoading && !isLoading}
            className="rounded-md py-3 mt-3 bg-textbase text-secondary md:max-w-xs hover:bg-accent-7"
          >
            Buy Now
          </Button>
        )}

        {/* {addCartApiError && cartId !== null && (
          <span className="text-pink pt-3 animate-fade-in">
            Error adding item to cart
          </span>
        )} */}

        <div
          className="mt-3"
          dangerouslySetInnerHTML={{ __html: product?.descriptionHtml }}
        />
        {product?.variants?.nodes?.map((variant) => {
          if (variant.title !== "Default Title" && variant?.availableForSale) {
            return (
              <>
                <h2>{variant.title}</h2>
                <div>
                  {variant.selectedOptions.map((option) => option.name)}
                </div>
              </>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProductSingle;
