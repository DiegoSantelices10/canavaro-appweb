import { useState } from 'react';
import Layout from 'components/Admin/Layout';
import HeaderTitle from 'components/HeaderTitle';

const BoxSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
const ArrowRightSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
);
const CartSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const TouchSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
);

export default function StockManager() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Coca Cola 1.5L', category: 'bebidas', stockDeposito: 50, stockHeladera: 15 },
    { id: 2, name: 'Cerveza Quilmes 1L', category: 'bebidas', stockDeposito: 120, stockHeladera: 30 },
    { id: 3, name: 'Agua Mineral 1L', category: 'bebidas', stockDeposito: 80, stockHeladera: 10 },
    { id: 4, name: 'Sprite 1.5L', category: 'bebidas', stockDeposito: 40, stockHeladera: 8 },
    { id: 5, name: 'Tiramisú', category: 'postres', stockDeposito: 10, stockHeladera: 5 },
    { id: 6, name: 'Flan Casero', category: 'postres', stockDeposito: 5, stockHeladera: 8 },
    { id: 7, name: 'Helado 1KG', category: 'postres', stockDeposito: 20, stockHeladera: 10 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("bebidas");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("cards");

  // Form states for the 3 operations
  const [ingresoDeposito, setIngresoDeposito] = useState("");
  const [movimientoHeladera, setMovimientoHeladera] = useState("");
  const [ventasDia, setVentasDia] = useState("");

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  const handleUpdateStock = (type) => {
    if (!selectedProduct) return;

    const parseIntVal = type === 'ingreso' ? ingresoDeposito : type === 'movimiento' ? movimientoHeladera : ventasDia;
    const value = parseInt(parseIntVal);
    if (isNaN(value) || value <= 0) return;

    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id !== selectedProduct.id) return p;
      let newDeposito = p.stockDeposito;
      let newHeladera = p.stockHeladera;

      if (type === 'ingreso') {
        newDeposito += value;
      } else if (type === 'movimiento') {
        if (value > newDeposito) {
          alert("No hay suficiente stock en depósito para realizar este movimiento.");
          return p;
        }
        newDeposito -= value;
        newHeladera += value;
      } else if (type === 'venta') {
        if (value > newHeladera) {
          alert("No hay suficiente stock en heladera para registrar esta venta.");
          return p;
        }
        newHeladera -= value;
      }

      const updatedProduct = { ...p, stockDeposito: newDeposito, stockHeladera: newHeladera };
      setSelectedProduct(updatedProduct);
      return updatedProduct;
    }));

    if (type === 'ingreso') setIngresoDeposito("");
    if (type === 'movimiento') setMovimientoHeladera("");
    if (type === 'venta') setVentasDia("");
  };

  const handleSaveAll = () => {
    if (!selectedProduct) return;

    const inDep = parseInt(ingresoDeposito) || 0;
    const movHel = parseInt(movimientoHeladera) || 0;
    const ventDia = parseInt(ventasDia) || 0;

    if (inDep <= 0 && movHel <= 0 && ventDia <= 0) return;

    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id !== selectedProduct.id) return p;
      let newDeposito = p.stockDeposito;
      let newHeladera = p.stockHeladera;

      // 1. Ingreso de Proveedor
      if (inDep > 0) {
        newDeposito += inDep;
      }

      // 2. Mover a Heladera
      if (movHel > 0) {
        if (movHel > newDeposito) {
          alert(`No hay suficiente stock en depósito para realizar movimiento a heladera.\nStock disponible tras ingreso: ${newDeposito}`);
          return p;
        }
        newDeposito -= movHel;
        newHeladera += movHel;
      }

      // 3. Ventas del Día
      if (ventDia > 0) {
        if (ventDia > newHeladera) {
          alert(`No hay suficiente stock en heladera para registrar ventas.\nStock disponible tras movimiento: ${newHeladera}`);
          return p;
        }
        newHeladera -= ventDia;
      }

      const updatedProduct = { ...p, stockDeposito: newDeposito, stockHeladera: newHeladera };
      // Actualizamos el producto seleccionado localmente
      setSelectedProduct(updatedProduct);
      return updatedProduct;
    }));

    // Resetear inputs
    setIngresoDeposito("");
    setMovimientoHeladera("");
    setVentasDia("");
  };

  return (
    <Layout>
      <HeaderTitle title="Gestión de Stock" isBack={true} />

      <div className="w-full mt-6 bg-slate-50 min-h-screen pb-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8 pt-6">

          {/* COLUMNA IZQUIERDA: Listado y Filtros */}
          <div className="w-full lg:w-3/5 flex flex-col gap-6">

            {/* Header del listado (Filtros y Vistas) */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                <button
                  onClick={() => { setSelectedCategory("bebidas"); setSelectedProduct(null); }}
                  className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 ${selectedCategory === 'bebidas' ? 'bg-red-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  🥤 Bebidas
                </button>
                <button
                  onClick={() => { setSelectedCategory("postres"); setSelectedProduct(null); }}
                  className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 ${selectedCategory === 'postres' ? 'bg-red-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  🍰 Postres
                </button>
              </div>
              <div className="flex gap-2 w-full sm:w-auto bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${viewMode === 'cards' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'}`}
                >
                  Tarjetas
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${viewMode === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'}`}
                >
                  Tabla
                </button>
              </div>
            </div>

            {/* Listado de Productos */}
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 h-auto lg:max-h-[700px] overflow-y-auto pr-2 custom-scrollbar pb-6 mt-2">
                {filteredProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`cursor-pointer border-2 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between min-h-[160px] ${selectedProduct?.id === p.id
                      ? "border-red-500 bg-red-50 shadow-md"
                      : "bg-white border-transparent shadow-sm hover:shadow-md hover:border-slate-200"
                      }`}
                  >
                    <div className="mb-4 whitespace-normal break-words">
                      <h3 className="font-extrabold text-slate-800 text-base sm:text-lg capitalize font-montserrat tracking-tight leading-tight">{p.name}</h3>
                      <span className="text-xs font-bold text-slate-400 mt-1 block uppercase tracking-wider">{p.category}</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                      <div className="flex justify-between items-center bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wide">Depósito</span>
                        <span className="text-lg font-black text-slate-700 leading-none">{p.stockDeposito}</span>
                      </div>
                      <div className="flex justify-between items-center bg-sky-50 p-2.5 rounded-xl border border-sky-100">
                        <span className="text-[11px] text-sky-600 font-extrabold uppercase tracking-wide">Heladera</span>
                        <span className="text-lg font-black text-sky-700 leading-none">{p.stockHeladera}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto mt-2 bg-white rounded-2xl shadow-sm border border-slate-200 lg:max-h-[700px] custom-scrollbar pb-6">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
                    <tr className="border-b border-slate-200">
                      <th className="p-4 text-sm font-bold text-slate-600 uppercase">Nombre</th>
                      <th className="p-4 text-sm font-bold text-slate-600 uppercase text-center whitespace-nowrap">Depósito</th>
                      <th className="p-4 text-sm font-bold text-slate-600 uppercase text-center whitespace-nowrap">Heladera</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(p => (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className={`cursor-pointer transition-colors border-b border-slate-100 last:border-0 ${selectedProduct?.id === p.id ? "bg-red-50" : "hover:bg-slate-50/50 bg-white"
                          }`}
                      >
                        <td className="p-4 min-w-[150px]">
                          <div className="font-bold text-slate-800 text-base leading-tight capitalize">{p.name}</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="bg-slate-100 text-slate-700 font-black py-1.5 px-3 rounded-lg text-lg inline-block min-w-[3rem]">{p.stockDeposito}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="bg-sky-50 text-sky-700 font-black py-1.5 px-3 rounded-lg border border-sky-100 text-lg inline-block min-w-[3rem]">{p.stockHeladera}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: Acciones del Producto */}
          <div className="w-full lg:w-2/5 flex flex-col gap-6">
            {selectedProduct ? (
              <div className="bg-white p-5 sm:p-8 rounded-[2rem] shadow-xl border border-slate-100 sticky top-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 font-montserrat leading-tight line-clamp-2 capitalize">
                      {selectedProduct.name}
                    </h2>
                  </div>
                </div>

                {/* Resumen de Stock Actual */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3 mb-6">
                  <div className="flex-1 bg-slate-800 text-white p-4 rounded-2xl flex flex-col relative overflow-hidden shadow-md min-w-[120px]">
                    <div className="absolute -right-4 -top-4 opacity-10">
                      <BoxSVG />
                    </div>
                    <span className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase mb-1 z-10">En Depósito</span>
                    <span className="text-3xl sm:text-4xl font-black z-10">{selectedProduct.stockDeposito}</span>
                  </div>
                  <div className="flex-1 bg-sky-500 text-white p-4 rounded-2xl flex flex-col relative overflow-hidden shadow-md min-w-[120px]">
                    <div className="absolute -right-4 -top-4 opacity-20">
                      <CartSVG />
                    </div>
                    <span className="text-[10px] sm:text-xs text-sky-100 font-bold uppercase mb-1 z-10">En Heladera</span>
                    <span className="text-3xl sm:text-4xl font-black z-10">{selectedProduct.stockHeladera}</span>
                  </div>
                </div>

                <hr className="my-5 border-slate-100 border-2 rounded-full" />

                {/* Controles de Acción */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Acciones de Stock</h3>

                <div className="flex flex-col gap-3">

                  {/* 1. Ingreso a Deposito */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 transition focus-within:ring-2 focus-within:ring-slate-300 focus-within:border-slate-300">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <div className="bg-slate-200 p-1.5 rounded-lg text-slate-600"><BoxSVG /></div>
                      Ingreso de Proveedor a Depósito
                    </h4>
                    <div className="flex flex-wrap sm:flex-nowrap gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        onWheel={(e) => e.target.blur()}
                        className="w-full sm:w-20 text-center p-2.5 text-lg font-bold border border-slate-300 rounded-xl outline-none focus:ring-0 bg-white"
                        value={ingresoDeposito}
                        onChange={e => setIngresoDeposito(e.target.value)}
                      />
                      <button
                        onClick={() => handleUpdateStock('ingreso')}
                        className="w-full sm:flex-1 bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm flex justify-center items-center text-sm sm:text-base"
                      >
                        Cargar
                      </button>
                    </div>
                  </div>

                  {/* 2. Movimiento a Heladera */}
                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 transition focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-300">
                    <h4 className="text-xs sm:text-sm font-bold text-indigo-800 mb-3 flex items-center gap-2">
                      <div className="bg-indigo-200/50 p-1.5 rounded-lg text-indigo-600"><ArrowRightSVG /></div>
                      Mover de Depósito a Heladera
                    </h4>
                    <div className="flex flex-wrap sm:flex-nowrap gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        onWheel={(e) => e.target.blur()}
                        className="w-full sm:w-20 text-center p-2.5 text-lg font-bold border border-indigo-200 text-indigo-900 rounded-xl outline-none focus:ring-0 bg-white shadow-inner"
                        value={movimientoHeladera}
                        onChange={e => setMovimientoHeladera(e.target.value)}
                      />
                      <button
                        onClick={() => handleUpdateStock('movimiento')}
                        className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm flex justify-center items-center text-sm sm:text-base"
                      >
                        Trasladar
                      </button>
                    </div>
                  </div>

                  {/* 3. Ventas del Dia */}
                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 transition focus-within:ring-2 focus-within:ring-emerald-300 focus-within:border-emerald-300">
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-800 mb-3 flex items-center gap-2">
                      <div className="bg-emerald-200/50 p-1.5 rounded-lg text-emerald-600"><CartSVG /></div>
                      Ingresar Ventas del Día
                    </h4>
                    <div className="flex flex-wrap sm:flex-nowrap gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        onWheel={(e) => e.target.blur()}
                        className="w-full sm:w-20 text-center p-2.5 text-lg font-bold border border-emerald-200 text-emerald-900 rounded-xl outline-none focus:ring-0 bg-white shadow-inner"
                        value={ventasDia}
                        onChange={e => setVentasDia(e.target.value)}
                      />
                      <button
                        onClick={() => handleUpdateStock('venta')}
                        className="w-full sm:flex-1 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm flex justify-center items-center text-sm sm:text-base"
                      >
                        Extraer
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveAll}
                    className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-transform hover:-translate-y-1 active:translate-y-0 shadow-lg mt-2 flex justify-center items-center"
                  >
                    Guardar Secuencia
                  </button>

                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-6 sm:p-10 flex flex-col items-center justify-center text-center h-auto min-h-[400px] lg:h-[600px] shadow-sm sticky top-6">
                <div className="bg-slate-50 p-6 rounded-full mb-6 border border-slate-100 shadow-inner">
                  <TouchSVG />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-600 font-montserrat mb-3">Selecciona un producto</h3>
                <p className="text-slate-500 text-sm sm:text-base max-w-[250px] font-medium leading-relaxed">
                  Haz clic en un producto de la lista para ver sus detalles y registrar los movimientos de stock.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
