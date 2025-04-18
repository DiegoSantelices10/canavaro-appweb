/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { motion } from "framer-motion";
import { formatearNumero } from "libs/items";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "utils";
const ModalPedido = ({ handleClose, show, pedido }) => {
  const { promoEfectivo } = useSelector(state => state.setting);
  const showHideClassName = show ? "fixed z-10 inset-0 overflow-y-auto w-full" : "hidden";
  let idIcrement = 1;
  const categorias = [...new Set(pedido.productos.map(producto => producto.categoria))];

  const categoriasId = categorias.map(producto => ({
    id: idIcrement++,
    categoria: producto,
  }));

  const { productos } = pedido;

  const separarNumero = numero => {
    const segmento1 = numero.substring(0, 2);
    const segmento2 = numero.substring(2, 6);
    const segmento3 = numero.substring(6, 10);

    return `${segmento1} ${segmento2} ${segmento3}`;
  };


  const conDescuento = () => {
    return productos.some(p => p.categoria !== 'solo efectivo');
  }

  function getShortSize(tamaño) {
    switch (tamaño.toLowerCase()) {
      case 'gigante':
        return 'Gig';
      case 'mediana':
        return 'Med';
      case 'chica':
        return 'Chi';
      default:
        return '';
    }
  }


  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 font-montserrat">
        <div
          onClick={handleClose}
          className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom  rounded-lg text-left overflow-hidden w-full shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white px-4 pt-5 pb-4 sm:pb-4"
          >
            <div className="flex justify-end h-full w-full">
              <button onClick={handleClose}>
                <AiOutlineClose
                  className=" text-slate-200 bg-sky-900 bg-opacity-40 rounded-full p-1 top-4 left-4"
                  size={30}
                />
              </button>
            </div>
            <div className="font-normal text-left text-base font-montserrat mt-4 text-gray-800">
              <div className="flex justify-between w-full ">
                <h2 className="font-semibold text-gray-500 text-sm">
                  Fecha <span className="font-normal text-sm">{pedido?.fecha}</span>
                </h2>
                <h2 className="font-semibold text-gray-500 text-sm">
                  Hora <span className="font-normal text-sm">{pedido?.hora}</span>
                </h2>
              </div>

              <div className="shadow shadow-gray-300 space-y-2 rounded-lg px-3 py-3 mt-2">
                {pedido?.cliente && (
                  <div className="flex justify-between items-center w-full">
                    <h2 className="font-semibold text-sm text-gray-500">
                      Cliente
                    </h2>
                    <span className="font-medium text-gray-500 tracking-wide text-sm">{pedido.cliente}</span>
                  </div>
                )}

                {pedido?.domicilio && (
                  <div className="flex justify-between items-center w-full">
                    <h2 className="font-semibold text-sm text-gray-500">
                      Direccion
                    </h2>
                    <h2 className="font-medium text-gray-500 tracking-wide text-sm">{pedido.domicilio}</h2>
                  </div>
                )}
                {pedido?.telefono && (
                  <div className="flex justify-between items-center w-full">
                    <h2 className="font-semibold text-sm text-gray-500">
                      Telefono
                    </h2>
                    <span className="font-medium text-gray-500 tracking-wide text-sm">{separarNumero(pedido?.telefono)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center w-full">
                  <h2 className="font-semibold text-sm text-gray-500">
                    Tipo de envio
                  </h2>
                  <span className="font-medium text-gray-500 tracking-wide text-sm">{pedido?.tipoEnvio}</span>
                </div>
                {pedido.hPersonalizado !== "" && (
                  <div className="flex justify-between items-center w-full">
                    <h2 className="font-semibold text-sm text-gray-500">
                      Horario de {pedido.domicilio ? "entrega" : "retiro"}
                    </h2>
                    <span className="font-medium text-gray-500 tracking-wide text-sm">{pedido?.hPersonalizado}hs.</span>
                  </div>

                )}
                <div className="flex justify-between items-center w-full">
                  <h2 className="font-semibold text-sm text-gray-500">
                    Medio de pago
                  </h2>
                  <span className="font-medium text-gray-500 tracking-wide text-sm">{pedido?.medioDePago}</span>
                </div>

                {pedido?.comentarios && (
                  <div className="flex gap-1 items-center">
                    <h2 className="font-semibold text-sm text-gray-500">
                      Comentarios:
                    </h2>
                    <span className="font-medium text-gray-500 tracking-wide text-sm">{pedido?.comentarios}</span>
                  </div>
                )}
              </div>

              <>

                {categoriasId?.map(categoria => (
                  <div key={categoria.id}>
                    <p className="text-sm font-medium tracking-wide mt-4 text-gray-500 font-montserrat">{capitalizeFirstLetter(categoria?.categoria)}</p>
                    <hr />
                    {productos
                      ?.filter(producto => producto?.categoria === categoria.categoria)
                      .map((item, index) => {
                        return (
                          <div key={index} className="py-1 font-montserrat text-sm text-neutral-800">
                            <div className="flex justify-between items-center font-montserrat">
                              <div className="font-semibold flex gap-1">
                                <div className="flex gap-1 items-start">
                                  <h2>
                                    {item?.cant || item?.cantidad}
                                  </h2>
                                  <p>x</p>
                                </div>
                                <div className="flex gap-1">
                                  <span className="font-semibold text-gray-800">
                                    {item.categoria === "pizzas" && getShortSize(item?.tamanio)}
                                  </span>
                                  <span className="font-normal line-clamp-1 text-gray-800 pr-2">
                                    {" "}
                                    {item.nombre}
                                  </span>
                                </div>
                              </div>
                              <p className="whitespace-nowrap">{formatearNumero(item.precio * item.cantidad)}</p>
                            </div>
                            {categoria.categoria === 'pizzas' && <p className="font-normal text-gray-500  text-sm w-11/12">{item.descripcion}</p>}
                            {item.extra && (
                              <p className="text-gray-500  font-normal">
                                Extra: {item.extra}
                              </p>
                            )}
                            {item.products &&
                              item.products.map(producto => (
                                <div key={producto._id}>
                                  <p className="font-normal text-gray-500">
                                    {producto.cantidad && `${producto.cantidad}  `}<span>{producto.nombre}</span>
                                  </p>
                                </div>
                              ))}
                            <p className="font-normal text-gray-400 text-sm w-11/12">{item.comentarios}</p>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </>
              {promoEfectivo.available && pedido.medioDePago === "Efectivo" && conDescuento() && (
                <p className="text-xs font-normal  mt-2 text-red-500">Se aplicó el {promoEfectivo.descuento}% de descuento, excepto solo efectivo</p>
              )}
              <div className="border-t-2 border-gray-200 my-3"></div>

              <div className="flex font-bold justify-between items-center text-gray-900">
                <h2>Total</h2>
                <p className="text-2xl font-semibold">{formatearNumero(pedido.total)}</p>
              </div>
              {pedido.pagaCon !== null && (
                <div className="flex justify-between items-center font-medium">
                  <h2>Paga con</h2>
                  <p>{formatearNumero(pedido.pagaCon)}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalPedido;
