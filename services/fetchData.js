import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
})

export const getProducts = async () => {
  const { DEV_URL, PROD_URL, NODE_ENV } = process.env;

  try {
    const response = await axios.get(`${NODE_ENV === "production" ? PROD_URL : DEV_URL}/api/products` , { httpsAgent: agent });
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los productos", error);
  }
};

export const getProductsFront = async () => {
  try {
    const response = await axios.get(`/api/products`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los productos", error);
  }
};

export const getSales = async () => {
  try {
    const response = await axios.get(`/api/sales`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener las ventas", error);
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

export const getPromo = async () => {
  try {
    const data = await axios.get("/api/settings/promo");
    return data;
  } catch (error) {
    throw new Error("Failed to log out");
  }
};

export const getDelay = async () => {
  const { DEV_URL, PROD_URL, NODE_ENV } = process.env;

  try {
    const { data } = await axios.get(`${NODE_ENV === "production" ? PROD_URL : DEV_URL}` + "/api/delay", { httpsAgent: agent });
    return data;
  } catch (error) {
    throw new Error("Failed to log out");
  }
};
