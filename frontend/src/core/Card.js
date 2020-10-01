import React from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";

// TODO: Deal with this later
const isAuthenticated = true;

const Card = ({ product, addtoCart = true, removefromCart = true }) => {
  const addToCart = () => {
    if (isAuthenticated) {
      addItemToCart(product, () => {});
      console.log("Added to cart");
    } else console.log("Login first !");
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const removeFromCart = (id) => {
    if (isAuthenticated) {
      removeItemFromCart(id);
      console.log("Removed from cart :)");
    } else console.log("Login first !");
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
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
