import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import Payment from "./Payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = () => {
    if (products.length !== 0) {
      return (
        <div>
          {products.map((product, idx) => (
            <Card
              key={idx}
              product={product}
              removefromCart={true}
              addtoCart={false}
              reload={reload}
              setReload={setReload}
            />
          ))}
        </div>
      );
    } else {
      return <h4>No products</h4>;
    }
  };

  return (
    <Base title="Sabka Cart" description="Welcome to your cart">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          {products.length ? (
            <Payment products={products} setReload={setReload} />
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
      </div>
    </Base>
  );
};

export default Cart;
