import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPageContext } from "next";

import {
  CheckoutLineItemInput,
  useAddCartItemMutation,
  AddCartItemMutation,
  AddCartItemMutationVariables,
  useCreateCartMutation,
  CreateCartMutation,
  CreateCartMutationVariables,
  Product,
  useGetCartItemCountQuery,
  useGetCartQuery,
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
    mutateAsync: mutateCreateCartAsync,
    isLoading: createCartLoading,
    isError: cartError,
  } = useCreateCartMutation<CreateCartMutation, Error>(
    shopifyGraphqlRequestClient,
    {
      onSuccess: (
        data: AddCartItemMutation,
        _variables: CreateCartMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries(useCreateCartMutation.getKey());
        queryClient.invalidateQueries(useAddCartItemMutation.getKey());
        queryClient.invalidateQueries(useGetCartItemCountQuery.getKey(null));
      },
      onError: () => {
        console.log(error);
      },
    }
  );

  const CHECKOUT_ID = "CHECKOUT_ID";

  const {
    mutate,
    isLoading,
    error,
    isError,
    mutateAsync: mutateCartItemAsync,
  } = useAddCartItemMutation<AddCartItemMutation, Error>(
    shopifyGraphqlRequestClient,
    {
      onSuccess: (
        data: AddCartItemMutation,
        _variables: AddCartItemMutationVariables,
        _context: unknown
      ) => {
        const checkoutId = nookies.get(context).CHECKOUT_ID;
        const cookies = parseCookies();
        console.log(cookies.CHECKOUT_ID, checkoutId);
        queryClient.invalidateQueries(useAddCartItemMutation.getKey());
        queryClient.invalidateQueries(
          useGetCartItemCountQuery.getKey({ checkoutId: checkoutId })
        );
        // console.log("product mutation data", data);
      },
      onError: () => {
        console.error(error);
      },
    }
  );

  const addItemToCart = async (lineItem: CheckoutLineItemInput) => {
    try {
      const checkoutId = nookies.get(context).CHECKOUT_ID;
      const cookies = parseCookies();
      console.log(cookies.CHECKOUT_ID, checkoutId);

      await mutateCartItemAsync({ checkoutId: checkoutId, lineItem: lineItem });
      // await ShopifyService.addCartItem({ checkoutId, lineItem });
      // console.log("worked, checkoutid:", checkoutId);
    } catch (error) {
      const { checkoutCreate } = await mutateCreateCartAsync({
        input: { lineItems: [lineItem] },
      });

      // newCheckoutId = checkoutCreate?.checkout?.id;

      nookies.set(context, CHECKOUT_ID, checkoutCreate?.checkout?.id!, {
        maxAge: 30 * 24 * 60 * 60,
      });

      queryClient.invalidateQueries(useAddCartItemMutation.getKey());
      queryClient.invalidateQueries(
        useGetCartItemCountQuery.getKey({
          checkoutId: checkoutCreate?.checkout?.id,
        })
      );
      console.log("error");
    }
  };

  const buyNow = async (lineItem: CheckoutLineItemInput) => {
    try {
      const { checkoutCreate } = await mutateCreateCartAsync({
        input: { lineItems: [lineItem] },
      });

      // console.log("weburl", checkoutCreate.checkout.webUrl);

      window.open(checkoutCreate.checkout.webUrl, "_self").focus();
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
              variantId: product?.variants?.nodes[0]?.id,
            });
          }}
          loading={isLoading}
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
                variantId: product?.variants?.nodes[0]?.id,
              });
            }}
            // loading={createCartLoading && !isLoading}
            className="rounded-md py-3 mt-3 bg-textbase text-secondary md:max-w-xs hover:bg-accent-7"
          >
            Buy Now
          </Button>
        )}

        {isError && cartError && (
          <span className="text-pink pt-3">Error adding item to cart</span>
        )}

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
