/* eslint-disable react/prop-types */

import ProductLayout from "components/ProductLayout";
import { convertToPath } from "libs/items";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "services/fetchData";
import { setExtras, setProductData } from "store/reducers/productSlice";

export default function Product({ data }) {

  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();


  useEffect(() => {
    if (products?.length <= 0) {
      const res = JSON.parse(localStorage.getItem("productos"));
      const extras = res?.filter(item => item.categoria === 'extras' && item.available === true)
      dispatch(setExtras(extras))
      dispatch(setProductData(res));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <ProductLayout key={data._id} data={data} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const productos = await getProducts();
  const id = query.id;
  const data = await productos.find(
    item =>
      (convertToPath(item.nombre) === id && (item.categoria !== "empanadas" && item.categoria !== "bebidas" && item.categoria !== "porciones"))
  );

  return {
    props: {
      id,
      data,
    },
  };
}
