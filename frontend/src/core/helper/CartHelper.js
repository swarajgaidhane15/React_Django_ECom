// Adding item to cart
export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

// Loading / Getting items from cart
export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

// Removing item from cart
export const removeItemFromCart = (productID) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart = cart.filter((item) => item.id !== productID);
    // cart.map((item, idx) => {
    //   if (item.id === productID) {
    //     cart.splice(idx, 1);
    //   }
    // });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

// Delete all items from cart
export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
