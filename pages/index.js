/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import HomeFront from "components/sections/homeFront";
import { setExtras, setProductData } from "store/reducers/productSlice";
import { wrapper } from "store/app/store";
import { getProducts } from "services/fetchData";
import { useDispatch } from 'react-redux'


export default function index({ data }) {

  const dispatch = useDispatch()
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(data));
    addExtras()
  }, []);

  const addExtras = () => {
    const extras = data.filter(item => item.categoria === 'extras' && item.available === true)
    dispatch(setExtras(extras))
  }
  return (
    <div className=" flex flex-col min-h-screen overflow-hidden ">
      <main className="w-full mx-auto">
        <HomeFront imagefront={"/images/fondonuevo.webp"} />
      </main>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ res }) => {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  const data = await getProducts();
  store.dispatch(setProductData(data));
  return {
    props: {
      // Pasa el estado hidratado como prop al componente de Next.js
      data,
    },
  };
});
