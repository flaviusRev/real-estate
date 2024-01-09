/** @format */

import { mockProperties } from "../utils/mockProperties"; // Import the products data

export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  return product;
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const removeFromCart = (index) => {
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCartByID = (productID) => {
  const product = mockProperties.find((p) => p.ProductID == productID);
  let res;
  if (product) {
    res = addToCart(product);
  } else {
    res =
      "Product not found with ID: " +
      productID +
      JSON.stringify(mockProperties, null, 2);
  }
  return res;
};
