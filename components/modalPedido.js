/* eslint-disable react/prop-types */
import React from "react";

// eslint-disable-next-line react/prop-types
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
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden w-full shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                Medio de pago: <span className="font-bold text-gray-500 text-base">{pedido?.medioDePago}</span>
              </h2>
              <h2>
                Hora pedido: <span className="font-bold text-gray-500 text-base">{pedido?.creado}</span>
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
                            {item.products &&
                              item.products.map(producto => (
                                <div key={producto._id}>
                                  <p className="font-semibold text-gray-500 text-sm">
                                    {producto.nombre} <span>{producto.cantidad && `x ${producto.cantidad}`}</span>
                                  </p>
                                </div>
                              ))}
                            <p className="font-semibold text-gray-500 text-xs w-11/12">{item.descripcion}</p>
                            <p className="font-semibold text-gray-500 text-xs w-11/12">{item.comentarios}</p>
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
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPedido;
