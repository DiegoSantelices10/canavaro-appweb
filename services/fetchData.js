import axios from "axios";

export const getProducts = async () => {
  const { DEV_URL, PROD_URL, NODE_ENV } = process.env;

  try {
    const response = await fetch(`${NODE_ENV === "production" ? PROD_URL : DEV_URL}/api/products`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProductsFront = async () => {
  try {
    const response = await fetch(`/api/products`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProductId = async id => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createProduct = async body => {
  try {
    const response = await axios.post(`/api/products`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateProduct = async (id, body) => {
  try {
    const response = await axios.put(`/api/products/${id}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = async () => {
  const { data } = await axios.get("/api/auth/logout");

  if (data.message === "ok") {
    return data.message;
  } else {
    throw new Error("Failed to log out");
  }
};
