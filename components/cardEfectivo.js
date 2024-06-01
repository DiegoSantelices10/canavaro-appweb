/* eslint-disable react/prop-types */
import { formatearNumero } from "libs/items";
import Add01Icon from "public/images/add-01-stroke-rounded";
import MinusSignIcon from "public/images/minus-sign-stroke-rounded";
import { useDispatch, useSelector } from "react-redux";
import { addProductPromo, decrementProductPromo } from "store/reducers/orderSlice";

const CardEfectivo = ({ data: { _id, nombre, imagen, descripcion, categoria, precio } }) => {
    const { orderPromo } = useSelector(state => state.order);

    const dispatch = useDispatch();

    const addItems = value => {
        dispatch(addProductPromo(value));
    };

    const decrementItems = value => {
        dispatch(decrementProductPromo(value));
    };

    const productQuantity = _id => {
        const pre = orderPromo?.find(item => item._id === _id);
        return pre?.cantidad ? pre.cantidad : 0;
    };

    const quantityZero = _id => {
        return orderPromo?.find(item => item._id === _id);
    };
    return (
        <div className="rounded-xl shadow p-3">
            <div
                className="w-60 flex flex-col h-full justify-between"
            >
                <div>
                    <p className=" text-gray-800 text-sm font-bold">{nombre}</p>
                    <p className=" text-gray-400 text-xs tracking-wider">{descripcion}</p>
                    <p className=" text-gray-400 text-sm font-poppins py-1">{formatearNumero(precio)}</p>
                </div>
                <div className="flex items-end justify-between   text-end gap-3 text-base">
                    <p className="text-gray-400 text-xs">Solo efectivo</p>
                    <div className="flex items-center gap-3 ">
                        <div
                            className={
                                quantityZero(_id) ? "rounded-full w-7 h-7 grid content-center  shadow  bg-slate-50" : "invisible"
                            }
                        >
                            <button
                                type="button"
                                className="text-red-500 text-3xl flex justify-center items-center "
                                onClick={e => {
                                    decrementItems({ _id, nombre, precio, categoria });
                                }}
                            >
                                <MinusSignIcon color={"bg-red-500"} width={18} height={18} />
                            </button>
                        </div>

                        <span className="font-normal text-xl  h-6">{productQuantity(_id) === 0 ? "" : productQuantity(_id)}</span>

                        <div className="rounded-full w-8 h-8 grid content-center  shadow  bg-slate-50">
                            <button
                                type="button"
                                className="text-green-500 text-3xl flex justify-center items-center"
                                onClick={e => {
                                    addItems({ _id, nombre, precio, categoria });
                                }}
                            >
                                <Add01Icon color={"bg-green-500"} width={18} height={18} />

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardEfectivo;
