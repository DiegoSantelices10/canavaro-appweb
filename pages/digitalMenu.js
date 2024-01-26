import React, { useEffect } from 'react'
import SectionPizzas from "components/sections/sectionPizzas";
import SectionEmpanadas from "components/sections/sectionEmpanadas";
import SectionCombos from "components/sections/sectionCombos";
import SectionZona from "components/sections/sectionZona";
import Carousel from 'react-multi-carousel';
import { useSelector, useDispatch } from "react-redux";
import Header from 'components/header';

import 'react-multi-carousel/lib/styles.css';
import CustomArrow from 'components/CustomArrows/CustomArrow';
import { setProductData } from 'store/reducers/productSlice';




// eslint-disable-next-line react/prop-types
function DigitalMenu() {

    const { products } = useSelector(state => state.product);
    const dispatch = useDispatch()

    useEffect(() => {
        if (products?.length <= 0) {
            const res = JSON.parse(localStorage.getItem("productos"));
            dispatch(setProductData(res));
        }

    }, []);


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 2,

        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,

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
        <div className='bg-zinc-900 min-h-screen'>
            <Header />
            <Carousel
                responsive={responsive}
                customButtonGroup={<CustomArrow />}
                arrows={false}
            >
                <SectionPizzas products={products} />
                <SectionEmpanadas products={products} />
                <SectionCombos products={products} />
                <SectionZona />
            </Carousel>
        </div>
    )
}



export default DigitalMenu;
