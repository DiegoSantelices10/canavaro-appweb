import axios from 'axios';
import Layout from 'components/Admin/Layout';
import HeaderTitle from 'components/HeaderTitle';
import OrderList from 'components/OrderList';
import Select from 'components/Select'
import useCategories from 'Hooks/useCategories'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ordenarPorProductOrderId } from 'utils';
import { FiSave, FiLayers, FiInfo } from 'react-icons/fi';

const OrderProducts = () => {
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
    }, [productsList, categoryCurrent])

    const handleCategoryChange = (categoria) => {
        setCategoryCurrent(categoria)
        const res = productsList?.filter((product) => product.categoria === categoria)
            .map((product) => ({
                id: product._id,
                name: product.nombre,
                idOrder: product?.productOrder?.id || 0
            }));

        const result = ordenarPorProductOrderId(res);
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
        if (orderCurrent.length === 0) {
            toast.error("No hay cambios para guardar");
            return;
        }

        const newData = {
            orderCurrent,
            categoria: categoryCurrent,
            orderSaved: true
        }

        try {
            const response = await axios.put("/api/products/", newData);
            response.status === 200 && toast.success("Orden actualizado correctamente");
        } catch (error) {
            toast.error("Error al actualizar los datos");
        }
    }

    return (
        <Layout>
            <div className="mb-10 lg:mb-14">
                <HeaderTitle title="Organizar Catálogo" isBack />
                <p className="text-slate-500 mt-2 font-medium">Define la prioridad de visualización de tus productos en la carta.</p>
            </div>

            <div className="max-w-5xl space-y-10">
                {/* Filter Section */}
                <div className="bg-slate-900/5 p-8 rounded-[2.5rem] border border-slate-100 relative group">
                    {/* Decorative Background layer with clipping */}
                    <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 w-full">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Selección de Rubro</p>
                            <div className="w-full md:w-80">
                                <Select
                                    label="Categoría"
                                    data={categories}
                                    handleChange={handleCategoryChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white/50 p-4 rounded-3xl border border-white/50 backdrop-blur-sm">
                            <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                                <FiLayers size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Items</p>
                                <p className="text-sm font-black text-slate-900">{renderProductos?.length || 0} Productos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* List Section */}
                {renderProductos?.length > 0 ? (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <FiInfo className="text-slate-400" />
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Arrastra para reordenar</h4>
                            </div>
                        </div>

                        <div className="w-full">
                            <OrderList items={renderProductos} onOrderChange={onOrderChange} />
                        </div>

                        <div className="flex pt-6">
                            <button
                                onClick={onSaveOrderPress}
                                className="flex items-center justify-center gap-3 px-12 py-5 bg-slate-900 text-white text-[11px] font-black rounded-2xl hover:bg-red-600 transition-all active:scale-95 shadow-2xl shadow-slate-900/20 group tracking-[0.15em]"
                            >
                                <FiSave className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                                <span>GUARDAR NUEVO ORDEN</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                        <div className="p-5 bg-slate-50 rounded-2xl mb-4 text-slate-300">
                            <FiLayers size={40} />
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Sin productos en esta categoría</p>
                    </div>
                )}
            </div>
        </Layout >
    )
}

export default OrderProducts