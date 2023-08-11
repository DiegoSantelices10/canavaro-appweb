import axios from 'axios';
const { DEV_URL, PROD_URL, NODE_ENV } = process.env;

const canavaroApi = axios.create({
    baseURL: `${NODE_ENV === "production" ? PROD_URL : DEV_URL}/api`
});


export default canavaroApi;
