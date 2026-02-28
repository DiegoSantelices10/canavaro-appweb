import { motion } from "framer-motion";
import { formatearNumero } from "libs/items";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const ModalPedido = ({ handleClose, show, pedido }) => {
  const { promoEfectivo } = useSelector(state => state.setting);
  if (!show) return null;

  const categorias = [...new Set(pedido.productos.map(producto => producto.categoria?.toLowerCase() || 'otros'))];

  const categoriasId = categorias.map((cat, index) => ({
    id: index + 1,
    categoria: cat,
  }));

  const { productos } = pedido;

  const separarNumero = numero => {
    if (!numero) return "";
    const segmento1 = numero.substring(0, 2);
    const segmento2 = numero.substring(2, 6);
    const segmento3 = numero.substring(6, 10);
    return `${segmento1} ${segmento2} ${segmento3}`;
  };

  const conDescuento = () => {
    return productos.some(p => p.categoria?.toLowerCase() !== 'solo efectivo');
  };

  function getShortSize(tamaño) {
    if (!tamaño) return '';
    switch (tamaño.toLowerCase()) {
      case 'gigante':
        return 'GIGANTE';
      case 'mediana':
        return 'MEDIANA';
      case 'chica':
        return 'CHICA';
      default:
        return tamaño.toUpperCase();
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-hidden bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden font-mono flex flex-col max-h-[95vh]"
      >
        {/* Ticket Header Wrapper - More Compact */}
        <div className="p-8 pb-4 flex flex-col items-center border-b-[3px] border-dashed border-slate-100">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors font-sans"
          >
            <AiOutlineClose size={22} />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[13px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <span className="text-slate-900 border-r border-slate-200 pr-6">ORDEN COMPRA</span>
            <span>{pedido?.fecha}</span>
            <span>{pedido?.hora}HS</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-8 py-6 space-y-7">
          {/* Customer Info Section - Larger Text */}
          <div className="space-y-2 text-sm">
            {pedido?.cliente && (
              <div className="flex justify-between border-b border-slate-50 py-1.5">
                <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Cliente:</span>
                <span className="text-slate-900 font-black text-base">{pedido.cliente}</span>
              </div>
            )}
            {pedido?.domicilio && (
              <div className="flex justify-between border-b border-slate-50 py-1.5">
                <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Domicilio:</span>
                <span className="text-slate-900 font-black text-right max-w-[300px] text-[15px]">{pedido.domicilio}</span>
              </div>
            )}
            {pedido?.telefono && (
              <div className="flex justify-between border-b border-slate-50 py-1.5">
                <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Teléfono:</span>
                <span className="text-red-600 font-black text-base tracking-widest">{separarNumero(pedido?.telefono)}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-slate-50 py-1.5">
              <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Envío:</span>
              <span className="text-slate-900 font-black uppercase tracking-wider text-[13px]">{pedido?.tipoEnvio}</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 py-1.5">
              <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Pago:</span>
              <span className="text-slate-900 font-black uppercase tracking-wider text-[13px]">{pedido?.medioDePago}</span>
            </div>
            {pedido.hPersonalizado && (
              <div className="flex justify-between border-b border-slate-100 py-3 bg-red-50 px-5 rounded-xl mt-2 shadow-sm">
                <span className="text-red-400 font-bold text-[11px] uppercase tracking-widest">HORARIO {pedido.domicilio ? "ENTREGA" : "RETIRO"}:</span>
                <span className="text-red-600 font-black text-lg">{pedido?.hPersonalizado}hs</span>
              </div>
            )}
          </div>

          {/* Comentarios Wrapper - Full Width - Clear Font */}
          {pedido?.comentarios && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full shadow-inner">
              <span className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">OBSERVACIONES:</span>
              <p className="text-[14px] text-slate-800 leading-relaxed italic font-bold">&quot;{pedido?.comentarios}&quot;</p>
            </div>
          )}

          {/* Products List Section */}
          <div className="space-y-6">
            {categoriasId?.map(catObj => (
              <div key={catObj.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-white uppercase px-2.5 py-0.5 bg-slate-900 rounded tracking-[0.2em]">
                    {catObj.categoria}
                  </span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <div className="space-y-5">
                  {productos
                    ?.filter(producto => (producto?.categoria?.toLowerCase() || 'otros') === catObj.categoria)
                    .map((item, index) => (
                      <div key={index} className="flex gap-5 items-start">
                        {/* Quantity Block */}
                        <div className="flex items-center justify-center shrink-0 w-8 h-8 bg-red-600 rounded-lg text-white font-black">
                          {item?.cant || item?.cantidad}
                        </div>

                        {/* Product Detail */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex flex-col gap-0.5">
                            {item?.tamanio && (
                              <span className="text-[9px] font-black text-red-600 tracking-[0.3em] uppercase">
                                -- {getShortSize(item?.tamanio)} --
                              </span>
                            )}
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="text-[16px] font-black text-slate-900 uppercase leading-tight">
                                {item.nombre}
                              </h4>
                              <span className="text-[15px] font-black text-slate-900 shrink-0">
                                {formatearNumero(item.precio * (item.cantidad || item.cant || 1))}
                              </span>
                            </div>
                          </div>

                          {/* Sub Detail */}
                          <div className="space-y-1.5 mt-2 pl-3 border-l-2 border-slate-100">
                            {item.extra && (
                              <p className="text-[11px] text-red-500 font-black uppercase tracking-wider">
                                EXTRA: {item.extra}
                              </p>
                            )}
                            {item.products && item.products.map(p => (
                              <p key={p._id} className="text-[11px] text-slate-500 font-bold uppercase">
                                + {p.categoria?.toLowerCase() === 'postres'
                                  ? item.cantidadPostres && `${item.cantidadPostres}x `
                                  : p.cantidad && `${p.cantidad}x `}
                                {p.nombre}
                              </p>
                            ))}
                            {item.comentarios && (
                              <p className="text-[13px] text-slate-600 italic font-sans leading-snug mt-2 bg-slate-50/50 p-2 rounded-lg border border-slate-100/50">
                                <span className="font-bold not-italic text-[10px] text-slate-400 uppercase mr-1">Nota:</span>
                                {item.comentarios}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Footer (Total with Integrated Promo) */}
        <div className="p-8 pt-4 bg-slate-50 border-t-[3px] border-dashed border-white">
          <div className="bg-white p-6 py-8 rounded-2xl border border-slate-200 shadow-lg relative overflow-hidden">
            {/* Promo Badge inside the Card - Refined Typography */}
            {promoEfectivo.available && pedido.medioDePago?.toLowerCase() === "efectivo" && conDescuento() && (
              <div className="absolute top-0 right-0">
                <div className="bg-red-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl shadow-sm tracking-widest uppercase font-sans">
                  {promoEfectivo.descuento}% OFF EFECTIVO
                </div>
              </div>
            )}

            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <span className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] leading-none">Total Cobrar</span>
                {pedido.pagaCon !== null && (
                  <div className="flex flex-col gap-0.5 border-l-2 border-slate-100 pl-3">
                    <span className="text-[11px] font-black text-slate-500 uppercase">Paga: {formatearNumero(pedido.pagaCon)}</span>
                    <span className="text-[11px] font-black text-green-600 uppercase">Vuelto: {formatearNumero(pedido.pagaCon - pedido.total)}</span>
                  </div>
                )}
              </div>
              <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                {formatearNumero(pedido.total)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalPedido;
