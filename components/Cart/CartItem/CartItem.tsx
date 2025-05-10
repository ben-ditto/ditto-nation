import { ChangeEvent, FocusEventHandler, useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Link from "next/link";
import Image from "next/image";

import nookies from "nookies";

import { formatPrice } from "lib/shopify/usePrice";

import {
  useGetCartUsingCartApiQuery,
  GetCartUsingCartApiQuery,
  GetCartUsingCartApiQueryVariables,
  useGetCartItemCountUsingCartApiQuery,
  GetCartItemCountUsingCartApiQuery,
  GetCartItemCountUsingCartApiQueryVariables,
  useRemoveCartItemUsingCartApiMutation,
  RemoveCartItemUsingCartApiMutation,
  RemoveCartItemUsingCartApiMutationVariables,
  useUpdateCartItemUsingCartApiMutation,
  UpdateCartItemUsingCartApiMutation,
  UpdateCartItemUsingCartApiMutationVariables,
  CartLine,
  BaseCartLineEdge,
  CartLineUpdateInput,
} from "src/generated/graphql";

import { useQueryClient } from "@tanstack/react-query";
import { shopifyGraphqlRequestClient } from "src/lib/clients/graphqlRequestClient";

import s from "./CartItem.module.css";
import clsx from "clsx";

//Component
import { Cross } from "components/Icons";
import Adder from "components/UI/Adder";

interface IProps {
  item: CartLine;
  cartId: string;
}

type ItemOption = {
  name: string;
  nameId: number;
  value: string;
  valueId: number;
};

export const CartItem: React.FC<IProps> = ({ item, cartId }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const queryClient = useQueryClient();

  function refetchCart() {
    queryClient.invalidateQueries(
      useGetCartUsingCartApiQuery.getKey({ cartId: cartId })
    );
    queryClient.invalidateQueries(
      useGetCartItemCountUsingCartApiQuery.getKey({ cartId: cartId })
    );
  }

  const {
    isLoading: removing,
    error,
    mutateAsync: removeCartItemAsync,
  } = useRemoveCartItemUsingCartApiMutation<
    RemoveCartItemUsingCartApiMutation,
    Error
  >(shopifyGraphqlRequestClient, {
    onSuccess: refetchCart,
    onError: () => console.error(error),
  });

  const {
    isLoading: updating,
    error: updateError,
    mutateAsync: updateCartItemAsync,
  } = useUpdateCartItemUsingCartApiMutation<
    UpdateCartItemUsingCartApiMutation,
    Error
  >(shopifyGraphqlRequestClient, {
    onSuccess: refetchCart,
    onError: () => setQuantity(item.quantity),
  });

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeCartItemAsync({
        cartId: cartId,
        lineItemId: item.id,
      });
    } catch (error) {
      setIsRemoving(false);
    }
  };

  // const handleUpdate = async (quantity: number) => {
  //   try {
  //     await updateCartItemAsync({
  //       cartId: cartId,
  //       lines: item,
  //       quantity: quantity,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useDebounce(
    () => {
      if (item.quantity !== quantity) {
        // handleUpdate(quantity);
      }
    },
    2000,
    [quantity]
  );

  return (
    <li
      className={clsx(s.root, {
        "opacity-50 pointer-events-none": removing,
      })}
    >
      <div className="flex flex-row items-center space-x-4 py-4">
        <div className="w-16 h-16 relative overflow-hidden cursor-pointer z-0">
          <Link href={`/shop/${item.merchandise.product.handle}`}>
            <a>
              <Image
                className={s.productImage}
                width={150}
                height={150}
                src={item.merchandise.image.url}
                alt={item.merchandise.image!.altText}
                unoptimized
              />
            </a>
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-base">
          <Link href={`/shop/${item.merchandise.product.handle}`}>
            <a>
              <span className={s.productName}>
                {item.merchandise.product.title}
              </span>
            </a>
          </Link>
          <span className="text-sm font-normal tracking-wider">
            x{item.quantity}
          </span>
          {item.merchandise.selectedOptions &&
            item.merchandise.selectedOptions.length > 0 && (
              <div className="flex items-center pb-1">
                {item.merchandise.selectedOptions.map(
                  (option: ItemOption, i: number) => (
                    <div
                      key={`${item.id}-${option.name}`}
                      className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center"
                    >
                      {option.name}
                      {option.name === "Color" ? (
                        <span
                          className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                          style={{
                            backgroundColor: `${option.value}`,
                          }}
                        ></span>
                      ) : (
                        <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                          {option.value}
                        </span>
                      )}
                      {i === item.merchandise.selectedOptions.length - 1 ? (
                        ""
                      ) : (
                        <span className="mr-3" />
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          {item.merchandise.title === "display" && (
            <div className="text-sm tracking-wider">{quantity}x</div>
          )}
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>
            {formatPrice({
              amount: item.merchandise.priceV2.amount * item.quantity,
              currencyCode: item.merchandise.priceV2.currencyCode,
            })}
          </span>
        </div>
        <button onClick={handleRemove} className="">
          <Cross width={24} height={24} />
        </button>
      </div>
      {/* <Adder
        amount={quantity}
        add={() => setQuantity((prev) => prev + 1)}
        subtract={() => setQuantity((prev) => prev - 1)}
      /> */}
    </li>
  );
};

export default CartItem;
