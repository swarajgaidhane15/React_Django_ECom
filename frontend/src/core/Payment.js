import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { emptyCart } from "./helper/CartHelper";
import { processPayment, getToken } from "./helper/PaymentHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated, signout } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, reload = undefined, setReload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated().user.id;
  const token = isAuthenticated().token;

  useEffect(() => {
    getPaymentToken();
  }, []);

  const getPaymentToken = () => {
    getToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Redirect to="/signin" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + parseFloat(product.price);
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };

        processPayment(userId, token, paymentData).then((res) => {
          if (res.error) {
            if (res.code === "1") {
              console.log("PAYMENT FAILED !!!");
              signout(() => {
                return <Redirect to="/" />;
              });
            }
          } else {
            setInfo({
              ...info,
              success: res.success,
              loading: false,
            });
            console.log("Payment Success");

            let product_names = "";
            products.forEach((product) => {
              product_names += product.name + ", ";
            });

            const orderData = {
              products: product_names,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
            };
            createOrder(userId, token, orderData)
              .then((response) => {
                console.log(response);
                if (response.error) {
                  if (response.code === "1") {
                    console.log("ORDER FAILED");
                  }
                  signout(() => {
                    return <Redirect to="/signin" />;
                  });
                } else {
                  if (response.success === true) {
                    console.log(response.msg);
                  }
                }
              })
              .catch((err) => {
                setInfo({
                  loading: false,
                  success: false,
                });
                console.log("ORDER FAILED BEFORE SUBMITTING");
              });

            emptyCart(() => {
              console.log("CART IS EMPTIED OUT");
            });

            setReload(!reload);
          }
        });
      })
      .catch((err) => console.log("Nonce Error: ", err));
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button onClick={onPurchase} className="btn btn-lg btn-success">
              Pay now
            </button>
          </div>
        ) : (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Please login or add something to cart :( </strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3>Bill: $ {getAmount()}</h3>
      {showDropIn()}
    </div>
  );
};

export default Payment;
