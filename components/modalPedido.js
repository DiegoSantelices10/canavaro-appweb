/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
const ModalPedido = ({ handleClose, show, pedido }) => {
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
  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 font-nunito">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom  rounded-lg text-left overflow-hidden w-full shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
            <div className="font-extrabold text-left text-lg font-nunito">
              {pedido?.cliente && (
                <h2>
                  Cliente: <span className="font-bold text-gray-500 text-base">{pedido.cliente}</span>
                </h2>
              )}

              {pedido.domicilio && (
                <h2>
                  Direccion: <span className="font-bold text-gray-500 text-base">{pedido?.domicilio}</span>
                </h2>
              )}
              {pedido?.telefono && (
                <h2>
                  Telefono: <span className="font-bold text-gray-500 text-base">{separarNumero(pedido?.telefono)}</span>
                </h2>
              )}
              <h2>
                Tipo de envio: <span className="font-bold text-gray-500 text-base">{pedido?.tipoEnvio}</span>
              </h2>
              <h2>
                Horario de {pedido.domicilio ? "entrega" : "retiro"}: <span className="font-bold text-gray-500 text-base">{pedido?.hPersonalizado}</span>
              </h2>
              <h2>
                Medio de pago: <span className="font-bold text-gray-500 text-base">{pedido?.medioDePago}</span>
              </h2>
              <h2>
                Fecha: <span className="font-bold text-gray-500 text-base">{pedido?.fecha}</span>
              </h2>
              <h2>
                Hora: <span className="font-bold text-gray-500 text-base">{pedido?.hora}</span>
              </h2>
              {pedido?.comentarios && (
                <h2>
                  Comentarios: <span className="font-bold text-gray-500 text-base">{pedido?.comentarios}</span>
                </h2>
              )}
              <div className="border-t-2 border-gray-300 my-3"></div>
              <>
                <h3>Pedido:</h3>
                {categoriasId?.map(categoria => (
                  <div key={categoria.id}>
                    <p className="text-base">{categoria?.categoria}</p>

                    {productos
                      ?.filter(producto => producto?.categoria === categoria.categoria)
                      .map((item, index) => {
                        return (
                          <div key={index} className="py-2">
                            <div className="flex justify-between items-center font-nunito">
                              <p className="font-bold text-neutral-900 text-base">
                                {item.nombre}
                                <span className=" pl-1 font-semibold text-gray-500 text-base">
                                  {item.categoria === "pizzas" && item?.tamanio}
                                </span>
                                <span className="text-gray-400 text-sm font-normal">
                                  {" "}
                                  x {item?.cant || item?.cantidad}
                                </span>
                              </p>
                              <p>$ {item.categoria === "bebidas" ? item.precio * item.cantidad : item?.precio}</p>
                            </div>
                            <p className="font-semibold text-gray-500 text-sm w-11/12">{item.descripcion}</p>
                            {item.products &&
                              item.products.map(producto => (
                                <div key={producto._id}>
                                  <p className="font-semibold text-gray-500 text-base">
                                    {producto.nombre} <span>{producto.cantidad && `x ${producto.cantidad}`}</span>
                                  </p>
                                </div>
                              ))}
                            <p className="font-semibold text-gray-500 text-sm w-11/12">{item.comentarios}</p>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </>
              <div className="border-t-2 border-gray-300 my-3"></div>

              <div className="flex justify-between items-center">
                <h2>Total</h2>
                <p>$ {pedido.total}</p>
              </div>
              {pedido.pagaCon !== 0 && (
                <div className="flex justify-between items-center font-medium text-gray-400">
                  <h2>Paga con</h2>
                  <p>$ {pedido.pagaCon}</p>
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
