import React, { useEffect, useState } from "react";

import { getProducts } from "./helper/CoreApiCalls";
import Base from "./Base";
import Card from "./Card";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to Sabka Store">
      <h1>Home Component</h1>
      <div className="row">
        {products.map((product) => {
          return (
            <div key={product.id} className="col-4 mb-4">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}

export default Home;
