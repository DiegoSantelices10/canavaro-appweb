/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { formatearNumero } from "libs/items";
import Image from 'next/image';
import Add01Icon from "public/images/add-01-stroke-rounded";
import MinusSignIcon from "public/images/minus-sign-stroke-rounded";
import { useDispatch } from "react-redux";
import { addProductPromo, decrementProductPromo } from "store/reducers/orderSlice";
const ModalMessage = ({
  handleClose,
  addExtra,
  showModal,
  orderPromo,
  extraPizza,
  extras,
  info: { title, type }
}) => {
  const showHideClassName = showModal ? "fixed z-40 inset-0 overflow-y-auto mx-auto py-10" : "hidden";
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

  const orderExtras = (extras) => {

    const cantidad = extras.filter(item => item.isCantidad === 'si')
    const notCantidad = extras.filter(item => item.isCantidad === 'no')

    return [...cantidad, ...notCantidad]
  }

  return (
    <div className={showHideClassName}>
      <div className="flex items-center   justify-center p-3 text-center sm:block ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
        </div>

        <div className="align-bottom w-full    text-left 
                        overflow-hidden  transform transition-all  
                         flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className=" mx-auto  text-zinc-800 lg:w-3/5 md:w-4/5  w-full bg-white p-3 h-full py-5 rounded-3xl font-montserrat font-semibold"
          >
            <div className="w-full">
              <h2 className="text-base font-semibold  text-center">{title}</h2>
            </div>
            <hr className=" bg-gray-500 mt-3" />
            <div
              className="grid md:grid-cols-2 gap-x-3"
            >
              {extras.length > 0 && orderExtras(extras)?.map(item => (
                <div
                  key={item._id}
                  className="flex justify-between items-start w-full gap-2 mb-2 pt-4">
                  <div className="w-2/5">
                    <Image
                      className="rounded-md"
                      src={item.imagen?.url || "/images/producto-sin-imagen.png"}
                      objectFit='cover'
                      objectPosition='center'
                      width={140}
                      height={140}
                      alt={item.nombre} />
                  </div>
                  <div className="w-full self-start">
                    <h1 className="font-semibold text-sm font-montserrat text-neuttral-800">{item.nombre}</h1>
                    <p className="text-gray-400 font-normal text-sm">{formatearNumero(item.precio)}</p>
                  </div>
                  {
                    item?.isCantidad === 'si' ? (
                      <div className="flex items-center justify-between bottom-0 right-0 w-1/2    text-end  text-base">
                        <div
                          className={
                            quantityZero(item._id) ? "rounded-full w-7 h-7 grid content-center  shadow-sm  bg-slate-50" : "w-7 h-7"
                          }
                        >
                          <button
                            type="button"
                            className="text-red-500 text-3xl flex justify-center items-center "
                            onClick={e => {
                              decrementItems({ _id: item._id, nombre: item.nombre, precio: item.precio, categoria: item.categoria });
                            }}
                          >
                            {
                              quantityZero(item._id) && (
                                <MinusSignIcon color={"bg-red-500"} width={18} height={18} />
                              )
                            }
                          </button>
                        </div>

                        <span className="font-normal text-xl text-center w-6  h-6">{productQuantity(item._id) === 0 ? "" : productQuantity(item._id)}</span>

                        <div className="rounded-full w-7 h-7 grid content-center  shadow-sm  bg-slate-50">
                          <button
                            type="button"
                            className="text-green-500 text-3xl flex justify-center items-center "
                            onClick={e => {
                              addItems({ _id: item._id, nombre: item.nombre, precio: item.precio, categoria: item.categoria });
                            }}
                          >
                            <Add01Icon color={"bg-green-500"} width={18} height={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-1/2 flex justify-center">
                        {extraPizza.includes(item) ? (
                          <p
                            className="text-lg text-center  rounded-md  p-1 px-3"
                          >Listo!</p>
                        ) : (
                          <button
                            onClick={() => addExtra(item)}
                            className="bg-green-500 rounded-lg font-normal shadow text-sm text-white p-2 px-4 font-montserrat"
                          >
                            Agregar
                          </button>
                        )}
                      </div>
                    )
                  }
                </div>
              ))}
            </div>
            <div>
              <button
                className="p-4 mt-8 rounded-2xl font-medium font-montserrat w-full shadow text-white bg-red-500 mx-auto text-center"
                onClick={handleClose}>{type !== 'return home' ? 'Continuar con el pedido' : 'Aceptar'}</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
