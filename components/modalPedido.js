/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { motion } from "framer-motion";
import { formatearNumero } from "libs/items";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
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
    return productos.some(p => p.categoria !== 'soloEfectivo');
  }
  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 font-montserrat">
        <div
          onClick={handleClose}
          className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom  rounded-xl text-left overflow-hidden w-full shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
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
                <h2 className="font-semibold">
                  Fecha: <span className="font-normal text-base">{pedido?.fecha}</span>
                </h2>
                <h2 className="font-semibold">
                  Hora: <span className="font-normal text-base">{pedido?.hora}</span>
                </h2>
              </div>
              {pedido?.cliente && (
                <h2 className="font-semibold mt-1">
                  Cliente: <span className="font-normal  text-base">{pedido.cliente}</span>
                </h2>
              )}

              {pedido.domicilio && (
                <h2 className="font-semibold mt-1">
                  Direccion: <span className="font-normal text-base">{pedido?.domicilio}</span>
                </h2>
              )}
              {pedido?.telefono && (
                <h2 className="font-semibold mt-1">
                  Telefono: <span className="font-normal text-base">{separarNumero(pedido?.telefono)}</span>
                </h2>
              )}
              <h2 className="font-semibold mt-1">
                Tipo de envio: <span className="font-normal text-base">{pedido?.tipoEnvio}</span>
              </h2>
              {pedido.hPersonalizado !== "" && (
                <h2 className="font-semibold mt-1">
                  Horario de {pedido.domicilio ? "entrega" : "retiro"}: <span className="font-normal text-base">{pedido?.hPersonalizado}hs.</span>
                </h2>

              )}
              <h2 className="font-semibold mt-1">
                Medio de pago: <span className="font-normal text-base">{pedido?.medioDePago}</span>
              </h2>

              {pedido?.comentarios && (
                <h2 className="font-semibold mt-1">
                  Comentarios: <span className="font-normal text-base">{pedido?.comentarios}</span>
                </h2>
              )}
              <>

                {categoriasId?.map(categoria => (
                  <div key={categoria.id}>
                    <p className="text-sm font-medium  mt-4 text-gray-500 font-montserrat">{categoria?.categoria}</p>
                    <hr />
                    {productos
                      ?.filter(producto => producto?.categoria === categoria.categoria)
                      .map((item, index) => {
                        return (
                          <div key={index} className="py-1 font-montserrat text-base text-neutral-800">
                            <div className="flex justify-between items-center font-montserrat">
                              <div className="font-semibold">
                                {item?.cant || item?.cantidad} x
                                <span className=" text-base font-normal">
                                  {" "}
                                  {item.nombre}
                                </span>
                                <span className=" pl-1 font-normal ">
                                  {item.categoria === "pizzas" && item?.tamanio}
                                </span>
                              </div>
                              <p className="whitespace-nowrap">{formatearNumero(item.precio * item.cantidad)}</p>
                            </div>
                            {categoria.categoria === 'pizzas' && <p className="font-normal text-gray-500  text-sm w-11/12">{item.descripcion}</p>}
                            {item.extra && (
                              <p className="text-gray-500 text-sm font-normal">
                                Extra: {item.extra}
                              </p>
                            )}
                            {item.products &&
                              item.products.map(producto => (
                                <div key={producto._id}>
                                  <p className="font-normal text-sm text-gray-500">
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
                <p className="text-sm font-normal  mt-2 text-red-500">Se aplica el {promoEfectivo.descuento}% de descuento, excepto soloEfectivo</p>
              )}
              <div className="border-t-2 border-gray-300 my-3"></div>

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
