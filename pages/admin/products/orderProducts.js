import axios from 'axios';
import Layout from 'components/Admin/Layout';
import HeaderTitle from 'components/HeaderTitle';
import OrderList from 'components/OrderList';
import Select from 'components/Select'
import useCategories from 'Hooks/useCategories'
import React, { useEffect, useState } from 'react'
import { ordenarPorProductOrderId } from 'utils';



const orderProducts = () => {
    const [renderProductos, setRenderProductos] = useState([]);
    const [orderCurrent, setOrderCurrent] = useState([]);
    const [categoryCurrent, setCategoryCurrent] = useState('pizzas');


    const { categories, productsList } = useCategories();


    useEffect(() => {

        const res = productsList?.filter(product => product.categoria === categoryCurrent)
            .map((product) => ({
                id: product._id,
                name: product.nombre,
                ...(product?.productOrder?.id !== undefined && { idOrder: product?.productOrder?.id })
            }));

        const result = ordenarPorProductOrderId(res);



        setRenderProductos(result);
    }, [productsList])



    const handleCategoryChange = (categoria) => {
        console.log('categoria', categoria);


        setCategoryCurrent(categoria)
        const res = productsList?.filter((product) => product.categoria === categoria)
            .map((product) => ({
                id: product._id,
                name: product.nombre,
                idOrder: product.productOrder.id
            }));

        const result = ordenarPorProductOrderId(res);
        console.log('result', result);


        setRenderProductos(result);
    };

    const onOrderChange = async (value) => {

        const body = value?.map((item, index) => {
            return {
                _id: item.id,
                idOrder: index + 1,
            }
        })
        setOrderCurrent(body)
    }

    const onSaveOrderPress = async () => {
        const newData = {
            orderCurrent,
            categoria: categoryCurrent,
            orderSaved: true
        }

        try {
            const response = await axios.put("/api/products/", newData);
            response.status === 200 && alert("Productos actualizados!");
        } catch (error) {
            alert("Error al actualizar los datos");
        }
    }

    console.log('categories', categories);


    return (
        <Layout>
            <HeaderTitle title="Ordena tus productos" />
            <div className='p-8 space-y-8'>
                <Select
                    label="Categoria"
                    data={categories}
                    handleChange={handleCategoryChange}
                />
                {renderProductos?.length > 0 &&
                    <div className='md:flex-row gap-4 w-full flex flex-col space-y-4 md:space-y-0'>
                        <button className="px-3 whitespace-nowrap h-10 w-full md:w-2/5  hover font-montserrat font-normal
                             rounded-lg  text-sm border text-white bg-red-600 hover:bg-red-500"
                            type="button"
                            onClick={onSaveOrderPress}
                        >
                            Guardar lista
                        </button>
                        <div className='w-full'>
                            <OrderList items={renderProductos} onOrderChange={onOrderChange} />
                        </div>
                    </div>
                }
            </div>
        </Layout >
    )
}

export default orderProducts