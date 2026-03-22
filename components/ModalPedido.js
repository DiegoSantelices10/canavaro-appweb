/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { motion } from "framer-motion";
import { formatearNumero } from "libs/items";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "utils";
const ModalPedido = ({ handleClose, show, pedido, handleDelete }) => {
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
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0 font-montserrat">
        <div onClick={handleClose} className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-slate-800 opacity-60 backdrop-blur-sm"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full w-full border border-gray-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white"
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Detalle del Pedido</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mt-1">
                  <span>{pedido?.fecha}</span>
                  <span>•</span>
                  <span>{pedido?.hora} hs</span>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition p-2 rounded-full focus:outline-none"
              >
                <AiOutlineClose size={22} />
              </button>
            </div>

            <div className="px-4 py-5 overflow-y-auto max-h-[70vh]">
              {/* Sección: Datos del Cliente */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Información de Entrega</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {pedido?.cliente && (
                    <div>
                      <span className="block text-xs text-slate-400 font-medium mb-1">Cliente</span>
                      <span className="font-semibold text-slate-800">{pedido.cliente}</span>
                    </div>
                  )}
                  {pedido?.telefono && (
                    <div>
                      <span className="block text-xs text-slate-400 font-medium mb-1">Teléfono</span>
                      <span className="font-semibold text-slate-800">{separarNumero(pedido.telefono)}</span>
                    </div>
                  )}
                  {pedido?.domicilio && (
                    <div className="sm:col-span-2">
                      <span className="block text-xs text-slate-400 font-medium mb-1">Dirección</span>
                      <span className="font-semibold text-slate-800">{pedido.domicilio}</span>
                    </div>
                  )}

                  <div>
                    <span className="block text-xs text-slate-400 font-medium mb-1">Tipo de Envío</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                      {pedido?.tipoEnvio}
                    </span>
                  </div>

                  {pedido.hPersonalizado !== "" && (
                    <div>
                      <span className="block text-xs text-slate-400 font-medium mb-1">
                        Horario de {pedido.domicilio ? "entrega" : "retiro"}
                      </span>
                      <span className="font-semibold text-slate-800">{pedido?.hPersonalizado} hs.</span>
                    </div>
                  )}
                </div>

                {/* Comentarios del pedido general */}
                {pedido?.comentarios && (
                  <div className="mt-4 bg-amber-50 rounded-lg p-3 border border-amber-100">
                    <span className="block text-xs text-amber-600 font-bold mb-1">Comentarios o notas:</span>
                    <p className="text-sm text-slate-700">{pedido.comentarios}</p>
                  </div>
                )}
              </div>

              {/* Sección: Productos */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Productos</h3>

                <div className="space-y-4">
                  {categoriasId?.map(categoria => {
                    const productosCategoria = productos?.filter(producto => producto?.categoria === categoria.categoria);
                    if (!productosCategoria || productosCategoria.length === 0) return null;

                    return (
                      <div key={categoria.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                          <p className="text-xs font-bold tracking-wide text-gray-500 uppercase">{capitalizeFirstLetter(categoria?.categoria)}</p>
                        </div>

                        <div className="divide-y divide-gray-100">
                          {productosCategoria.map((item, index) => (
                            <div key={index} className="p-4 bg-white transition hover:bg-slate-50">
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex flex-col w-full gap-1">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gray-600 text-white flex items-center justify-center font-bold text-sm">
                                      {item?.cant || item?.cantidad}
                                    </div>
                                    <span className="text-slate-600 font-bold">x</span>
                                    <div className="font-semibold text-slate-800 text-sm">
                                      {item?.tamanio && (
                                        <span className="text-emerald-600 mr-1">{getShortSize(item?.tamanio)}</span>
                                      )}
                                      {item.nombre}
                                    </div>
                                  </div>

                                  <div className="pl-12">
                                    {/* Detalles del producto */}
                                    {categoria.categoria === 'pizzas' && (
                                      <p className="text-xs text-slate-500 mt-1">{item.descripcion}</p>
                                    )}
                                    {item.extra && (
                                      <div className="flex items-center w-fit gap-1 bg-gray-600 rounded-md px-4 py-0.5">
                                        <p className="text-xs text-white font-medium italic">
                                          Extra: {item.extra}
                                        </p>
                                      </div>
                                    )}
                                    {item.products && (
                                      <div className="mt-1 space-y-1">
                                        {item.products.map(producto => (
                                          <p key={producto._id} className="text-xs text-slate-500 flex items-center gap-1">
                                            <span className="font-semibold text-slate-700">
                                              {producto.categoria === 'Postres'
                                                ? item.cantidadPostres && `${item.cantidadPostres}x`
                                                : producto.cantidad && `${producto.cantidad}x`}
                                            </span>
                                            {producto.nombre}
                                          </p>
                                        ))}
                                      </div>
                                    )}
                                    {item.comentarios && (
                                      <p className="text-xs italic text-slate-400 mt-2 bg-slate-50 p-2 rounded">&quot;{item.comentarios}&quot;</p>
                                    )}
                                  </div>
                                </div>

                                <div className="font-bold text-slate-800 whitespace-nowrap text-sm bg-slate-50 px-2 py-1 rounded">
                                  {formatearNumero(item.precio * item.cantidad)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pago y Totales */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col gap-3">

                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-500">Medio de Pago</span>
                  <span className="font-bold text-slate-700">{pedido?.medioDePago}</span>
                </div>

                {promoEfectivo.available && pedido.medioDePago === "Efectivo" && conDescuento() && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-emerald-600">Descuento aplicado</span>
                    <span className="font-bold text-emerald-600">-{promoEfectivo.descuento}%</span>
                  </div>
                )}

                {pedido.pagaCon !== null && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-500">Abonará con:</span>
                    <span className="font-bold text-slate-700">{formatearNumero(pedido.pagaCon)}</span>
                  </div>
                )}

                <hr className="border-slate-200 mt-1 mb-1" />

                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-1">Total a Pagar</span>
                  <span className="text-3xl font-black text-emerald-600 tracking-tight">
                    {formatearNumero(pedido.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Modal - Botón de Acción */}
            {handleDelete && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => {
                    handleDelete(pedido._id);
                    handleClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-base font-bold text-white bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-100"
                  type="button"
                >
                  Liberar Pedido
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalPedido;
