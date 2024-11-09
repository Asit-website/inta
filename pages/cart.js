import React, { useEffect, useState } from "react";
import style from "./css/cart.module.scss";
import Link from "next/link";
import Cookies from "js-cookie";
import HeadSEO from "../components/common/Head/head";
import CartItemsLoading from "../components/common/Cart/cart-items-loading";
import { useSession } from "next-auth/react";
import CartItems from "../components/common/Cart/cart-items";

import EventDetMinus from "../components/common/svg/eventDetials/minus";
import EventDetPlus from "../components/common/svg/eventDetials/plus";
import GlobalHeaderFooter from "../utils/common/global-header-footer";

export default function Cart() {
  const [cartLoad, setCartLoad] = useState(true);
  const [cartEnpty, setCartEnpty] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(false);
  const [cartData, setCartData] = useState({});
  const { data: session, status } = useSession();
  const nx_cart_id = Cookies.get("nx_cart_id");


  //Get Cart
  const getCartDetails = async () => {
    
    if (typeof nx_cart_id != "undefined" && nx_cart_id != "") {
      const getCart = await fetch(process.env.next.api_url + "cart/get", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_id: nx_cart_id }),
      });
      const cartRes = await getCart.json();

      
      if (cartRes?.status && cartRes?.status == 404) {
        setCartEnpty(true);
        setCartLoad(false);
        Cookies.remove("nx_cart_id");
        setCartUpdate(false);
        return false;
      }
      if (typeof cartRes?.data != "undefined") {
        setCartEnpty(false);
        setCartLoad(false);
        setCartData(cartRes?.data);
        setCartUpdate(false);
        return false;
      }
    }else{
      setCartEnpty(true);
      setCartLoad(false);
      setCartUpdate(false);
      Cookies.remove("nx_cart_id");
      return false;
    }
  };
  

  useEffect(function () {
    getCartDetails();
  }, []);

  
  return (
    <div className={style.cartBody}>
      <HeadSEO
        title={"Shopping Cart"}
        description={"Shopping Cart"}
        image={false}
      />

      { cartUpdate == true ? (<span className='loadingOverlay' style={{display:'block', position:'fixed'}} />) : "" }

      {cartEnpty === false ? (
        <div className="container cart_container">

          <table
            className={
              cartLoad == true
                ? style.cartTabel + " " + style.isLoading
                : style.cartTabel
            }
          >
            <thead>
              <tr>
                <th className={style.item_th_1}>Product</th>
                <th className={style.item_th_2}>Price</th>
                <th className={style.item_th_3}>Quantity</th>
                <th className={style.item_th_4}>Total</th>
              </tr>
            </thead>
            <tbody>
              
              {cartLoad == true ? (
                <>
                  <CartItemsLoading />
                  <CartItemsLoading />
                  <CartItemsLoading />
                </>
              ) : (
                 cartData?.line_items?.physical_items?.map((ls,i) => (
                  <CartItems key={i} items={ls} stateCartUpdate={[cartUpdate,setCartUpdate]} getCartDetails={getCartDetails} cartData={cartData} />
                 ))
              )}
            </tbody>
          </table>

          {cartLoad == false ? (
            <div className={style.cartSummary}>
              <ul>
                <li>
                  <span>Subtotal</span>
                  <span>${cartData?.cart_amount.toFixed(2)}</span>
                </li>
                <li>
                  <span>Shipping & Tax</span>
                  <span>Calculated at Checkout</span>
                </li>
                <li className={style.grandTotal}>
                  <span>Total</span>
                  <span>${cartData?.cart_amount.toFixed(2)}</span>
                </li>
              </ul>
              <p className={style.discountInfo}>
                Discount codes can be applied during checkout.
              </p>

              {status == "authenticated" ? (<Link href={cartData?.redirect_urls?.checkout_url} className={style.btnCheckout}>Checkout</Link>):(<Link href={'/login'} className={style.btnCheckout}>Checkout</Link>)}
              
              
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="container">
          <div className={style.cart_empty}>
            <svg fill="#1C2E33" width="26" height="28" viewBox="0 0 26 28">
              <path d="M10 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM24 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM26 7v8c0 0.5-0.391 0.938-0.891 1l-16.312 1.906c0.078 0.359 0.203 0.719 0.203 1.094 0 0.359-0.219 0.688-0.375 1h14.375c0.547 0 1 0.453 1 1s-0.453 1-1 1h-16c-0.547 0-1-0.453-1-1 0-0.484 0.703-1.656 0.953-2.141l-2.766-12.859h-3.187c-0.547 0-1-0.453-1-1s0.453-1 1-1h4c1.047 0 1.078 1.25 1.234 2h18.766c0.547 0 1 0.453 1 1z"></path>
            </svg>
            <h2>Your cart is empty</h2>
            <Link href={"/"}>Go to Home</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    
    const globalSettings = await GlobalHeaderFooter();
    return {
      props: {
        page_content: false,
        navbar: globalSettings?.header,
        footer: globalSettings?.footer
      },
    };

  } catch (error) {
    
    return {
      props: {
        page_content: false,
        navbar: false,
        footer: false
      },
      notFound: true
    };

  }
}
