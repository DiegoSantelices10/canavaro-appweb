/* eslint-disable react/prop-types */
import { formatearNumero } from "libs/items";
import Image from "next/image";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addProductDirect, decrementProductDirect } from "store/reducers/orderSlice";
import { motion, AnimatePresence } from "framer-motion";

const CardCart = ({ data: { _id, nombre, imagen, descripcion, categoria, precio } }) => {
    const { orderList } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const addItems = value => {
        dispatch(addProductDirect(value));
    };

    const decrementItems = value => {
        dispatch(decrementProductDirect(value));
    };

    const productQuantity = _id => {
        const item = orderList?.find(item => item._id === _id);
        return item?.cantidad ? item.cantidad : 0;
    };

    const quantity = productQuantity(_id);

    return (
        <div className="flex-shrink-0 w-32 flex flex-col items-center group">
            {/* Image Container - Slightly wider than tall */}
            <div className="relative w-32 h-32 rounded-lg overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-neutral-200 transition-all duration-300 shadow-lg bg-neutral-100">
                <Image
                    src={imagen?.url || "/images/producto-sin-imagen.png"}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-700"
                    alt={nombre}
                />

                {/* Quantity Badge Overlaid */}
                <AnimatePresence>
                    {quantity > 0 && (
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 20 }}
                            className="absolute top-4 right-4 z-20 bg-neutral-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-2xl border-2 border-white"
                        >
                            {quantity}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Info Section */}
            <div className="text-center w-full px-2">
                <h4 className="text-xs font-black font-montserrat text-neutral-900 uppercase truncate tracking-tight mb-1">
                    {nombre}
                </h4>
                <p className="text-xs font-black text-neutral-400 font-montserrat mb-4">
                    {formatearNumero(precio)}
                </p>

                {/* Minimal Controls */}
                <div className="flex items-center justify-center gap-3">
                    {quantity > 0 && (
                        <button
                            type="button"
                            onClick={() => decrementItems({ _id, nombre, precio, categoria })}
                            className="w-9 h-9 flex items-center justify-center bg-white border border-neutral-200 text-neutral-800 rounded-xl active:scale-90 transition-all shadow-sm hover:bg-neutral-50"
                        >
                            <FiMinus size={16} />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => addItems({ _id, nombre, precio, categoria })}
                        className={`w-9 h-9 flex items-center justify-center ${quantity > 0 ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-800'} rounded-xl active:scale-95 transition-all shadow-md hover:brightness-110`}
                    >
                        <FiPlus size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardCart;
