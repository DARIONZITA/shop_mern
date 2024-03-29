import React from "react";
import { useSelector } from "react-redux";
import ModalOrder from "../../../components/modalorder";

const CartBottom = () => {
  const  cartTotalAmount  = useSelector((store) => store.cart.cartTotalAmount);

  function formatPrice(price) {
    // Get the user's locale from the browser
    const userLocale = navigator.language || "en-US";

    // Format the price value using the user's locale and currency
    const formattedPrice = Number(price).toLocaleString(userLocale, {
      style: "currency",
      currency: "AOA",
      currencyDisplay:'symbol'
    });

    return formattedPrice;
  }

  return (
    <div className="space-y-2 border-t-2 bg-bgcolor p-4 font-urbanist">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-primary">Valor Parcial:</h1>
        <span className="rounded bg-primary py-1 px-2 text-sm text-white md:text-base">
          {cartTotalAmount} Kz
        </span>
      </div>

      <div className="grid items-center justify-items-center gap-2">
        <p className="text-center text-sm font-medium md:text-lg p-2">
          Taxas e frete serão calculados ao efectuar a encomenda 
        </p>    
        <ModalOrder />
      </div>
    </div>
  );
};

export default CartBottom;
