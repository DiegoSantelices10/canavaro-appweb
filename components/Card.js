/* eslint-disable react/prop-types */
import { convertToPath, formatearNumero } from "libs/items";
import Image from "next/image";
import Link from "next/link";
import Add01Icon from "public/images/add-01-stroke-rounded";
import MinusSignIcon from "public/images/minus-sign-stroke-rounded";
import { useDispatch, useSelector } from "react-redux";
import { addProductPromo, decrementProductPromo } from "store/reducers/orderSlice";

const Card = ({ data: { _id, nombre, imagen, descripcion, categoria, precio, precioExtra } }) => {
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
    <div>
      <div className="py-3">
        {categoria === "Postres" || categoria === "empanadas" || categoria === "bebidas" || categoria === "porciones" ? (
          <div className="flex justify-between items-center gap-x-2">
            <Image
              className="rounded-lg overflow-hidden"
              src={imagen?.url || "/images/producto-sin-imagen.png"}
              width={140}
              height={140}
              objectFit='cover'
              objectPosition='center'
              alt={nombre}
            />
            <div className="relative w-full h-24 self-start">
              <h1 className="font-semibold font-montserrat text-sm text-neutral-800">{nombre}</h1>
              <p className="text-gray-400 text-xs tracking-wider">{descripcion}</p>
              <p className="text-sm py-1 text-gray-400">{precioExtra ? `${formatearNumero(precioExtra + precio)}` : formatearNumero(precio)}</p>

              <div className="absolute flex items-center justify-center bottom-0 right-0 w-auto  text-end gap-3 text-base">
                <div
                  className={
                    quantityZero(_id) ? "rounded-full w-7 h-7 grid content-center  shadow-sm  bg-gray-50" : "invisible"
                  }
                >
                  <button
                    type="button"
                    className="text-red-500 text-2xl font-normal flex justify-center items-center"
                    onClick={e => {
                      decrementItems({ _id, nombre, precio, precioExtra, categoria });
                    }}
                  >
                    <MinusSignIcon color={"bg-red-500"} width={18} height={18} />
                  </button>
                </div>

                <span className="font-normal text-xl  h-6">{productQuantity(_id) === 0 ? "" : productQuantity(_id)}</span>

                <div className="rounded-full w-8 h-8 grid content-center  shadow-sm  bg-gray-50">
                  <button
                    type="button"
                    className="text-green-500 text-2xl font-normal flex justify-center items-center"
                    onClick={e => {
                      addItems({ _id, nombre, precio, precioExtra, categoria });
                    }}
                  >
                    <Add01Icon color={"bg-green-500"} width={18} height={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link href={`/order/products/${convertToPath(nombre)}`}>
            <a>
              <div className="flex justify-between items-center gap-x-2">
                <Image
                  className="rounded-md"
                  src={imagen?.url || "/images/producto-sin-imagen.png"}
                  objectFit='cover'
                  objectPosition='center'
                  width={140}
                  height={140}
                  alt={nombre} />
                <div className="w-full self-start">
                  <h1 className="font-semibold text-sm font-montserrat text-neuttral-800">{nombre}</h1>
                  <p className="text-gray-400 text-xs">{descripcion}</p>
                  {categoria !== "pizzas" && <p className="text-gray-400  text-sm py-1">{formatearNumero(precio)}</p>}
                </div>
              </div>
            </a>
          </Link>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Card;
