import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import { isAuthenticated } from "../auth/helper/index";

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    setRedirect(true);
    if (isAuthenticated()) {
      addItemToCart(product, () => {});
      console.log("Added to cart");
    } else {
      console.log("Login first !");
    }
  };

  const getRedirect = () => {
    if (isAuthenticated() && redirect) {
      return <Redirect to="/cart" />;
    }
    if (!isAuthenticated() && redirect) {
      return <Redirect to="/signin" />;
    }
  };

  const removeFromCart = (id) => {
    if (isAuthenticated) {
      removeItemFromCart(id);
      setReload(!reload);
      console.log("Removed from cart :)");
    } else console.log("Login first !");
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        {getRedirect()}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap mt-2 px-2">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          <div className="col-12">
            {addtoCart && (
              <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )}
          </div>
          <div className="col-12">
            {removefromCart && (
              <button
                onClick={() => removeFromCart(product.id)}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
