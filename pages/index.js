/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import HomeFront from "components/sections/homeFront";
import { setExtras, setProductData } from "store/reducers/productSlice";
import { wrapper } from "store/app/store";
import { getProducts } from "services/fetchData";
import { useDispatch } from 'react-redux'
import SectionZona from "components/sections/sectionZona";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import CustomArrow from "components/CustomArrows/CustomArrow";


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


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,

    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,

    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,

    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,

    }
  };
  return (
    <div className=" flex flex-col min-h-screen overflow-hidden ">
      <main className="w-full mx-auto">
        <Carousel
          responsive={responsive}
          customButtonGroup={<CustomArrow />}
          arrows={false}
        >
          <HomeFront imagefront={"/images/fondonuevo.webp"} />
          <SectionZona />
        </Carousel>
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
