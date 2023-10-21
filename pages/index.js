/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import Header from "components/header";
import HomeFront from "components/sections/homeFront";
import SectionPizzas from "components/sections/sectionPizzas";
import SectionEmpanadas from "components/sections/sectionEmpanadas";
import SectionCombos from "components/sections/sectionCombos";
import SectionZona from "components/sections/sectionZona";
import Footer from "components/sections/footer";
import { setProductData } from "store/reducers/productSlice";
import { useSelector } from "react-redux";
import { wrapper } from "store/app/store";
import { getProducts } from "services/fetchData";


export default function index({ data }) {
  const { products } = useSelector(state => state.product);
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(data));
  });



  return (
    <div className=" flex flex-col min-h-screen overflow-hidden bg-neutral-900 ">
      <main className="font-nunito">
        <Header />
        <HomeFront imagefront={"/images/fondonuevo.webp"} />
        <SectionPizzas products={products} imagefront={"/images/fondonuevo.webp"} />
        <SectionEmpanadas products={products} imagefront={"/images/fondonuevo.webp"} />
        <SectionCombos products={products} imagefront={"/images/fondonuevo.webp"} />
        <SectionZona />
        <Footer />
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
