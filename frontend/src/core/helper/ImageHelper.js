import React from "react";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? product.image
    : `https://papamoabeach.co.nz/wp-content/uploads/2020/06/dog-puppy-on-garden-royalty-free-image-1586966191.jpg`;

  return (
    <div className="rounded border border-success p-2 text-center">
      <img
        src={imageUrl}
        alt="productImage"
        className="m-3 rounded"
        style={{ maxHeight: "200px", maxWidth: "100%" }}
      />
    </div>
  );
};

export default ImageHelper;
