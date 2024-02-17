/* eslint-disable react/prop-types */
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addProductPromo, decrementProductPromo } from "store/reducers/orderSlice";

const CardCart = ({ data: { _id, nombre, imagen, descripcion, categoria, precio } }) => {
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
        <div className="rounded-md relative ">
            <div className="relative bg-white  rounded-t-md" style={{ width: "150px", height: "100px" }}>
                <div className="w-full">
                    <a className="font-bold text-sm text-gray-800">
                        <Image
                            src={imagen?.url !== '' ? imagen.url : "/images/producto-sin-imagen.png"}
                            width={220}
                            height={130}
                            objectFit="contain"
                            objectPosition="center"
                            className="rounded-xl "
                            alt={nombre}
                        />
                    </a>
                </div>
            </div>
            <div className=" h-20 rounded-b-md px-1 py-2 ">
                <p className=" text-gray-800 text-sm font-bold ">{nombre}</p>
                <p className=" text-gray-400 text-xs font-medium ">${precio}</p>

                <div className=" absolute flex items-center justify-center bottom-0 right-0 w-auto  text-end gap-3 text-base">
                    <div
                        className={
                            quantityZero(_id) ? "rounded-md w-7 h-7 grid content-center  shadow  bg-slate-50" : "invisible"
                        }
                    >
                        <button
                            type="button"
                            className="text-red-500 text-3xl "
                            onClick={e => {
                                decrementItems({ _id, nombre, precio, categoria });
                            }}
                        >
                            -
                        </button>
                    </div>

                    <span className="font-normal text-xl  h-6">{productQuantity(_id)}</span>

                    <div className="rounded-md w-8 h-8 grid content-center  shadow  bg-slate-50">
                        <button
                            type="button"
                            className="text-green-500 text-3xl"
                            onClick={e => {
                                addItems({ _id, nombre, precio, categoria });
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCart;
