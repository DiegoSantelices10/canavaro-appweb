import Layout from "components/Admin/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { setProductData } from "store/reducers/productSlice";
import { getProductsFront } from "services/fetchData";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Delete02Icon from "public/images/delete-02-stroke-rounded";
import PencilEdit02Icon from "public/images/pencil-edit-02-stroke-rounded";
import Search01Icon from "public/images/search-01-stroke-rounded";
import Table from "components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import Select from "components/Select";
import { FiPlus, FiDollarSign, FiLayers } from "react-icons/fi";



const Products = () => {
  const [renderProductos, setRenderProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();

  const columnHelper = createColumnHelper()

  const compararDisponibilidad = (objeto1, objeto2) => {
    if (objeto1.available === objeto2.available) {
      return 0;
    }
    return objeto1.available ? 1 : -1;
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductsFront();
        const order = res.sort(compararDisponibilidad);
        const categories = [...new Set(res.map(producto => producto.categoria))];
        setCategorias(categories);
        setRenderProductos(order);
        dispatch(setProductData(order));
      } catch (error) {
        alert("Error al obtener los datos");
      }
    })();
  }, []);

  const handleChangeSearch = e => {
    const minus = e.target.value;
    const delayDebounceFn = setTimeout(() => {
      // Aquí puedes realizar la búsqueda en el listado con el valor de inputValue
      const resultado = renderProductos?.filter(item => item.nombre.toLowerCase().includes(minus.toLowerCase()));
      if (e.target.value === "") {
        setRenderProductos(products);
      } else {
        setRenderProductos(resultado);
      }
    }, 1000); // Establece el tiempo de espera deseado en milisegundos (500 ms en este ejemplo)

    return () => {
      clearTimeout(delayDebounceFn);
    };
  };

  const handleCheckboxChange = async (id, availableCurrent) => {
    const updatedProductos = renderProductos.map(producto => {
      if (producto._id === id) {
        return { ...producto, available: !producto.available };
      }
      return producto;
    });
    setRenderProductos(updatedProductos);

    try {
      await axios.put(`/api/products/${id}`, {
        available: !availableCurrent,
      });
    } catch (error) {
      alert("Error al actualizar el estado")
    }
  };

  const handleCategoryChange = categoria => {
    const res = products.filter(products => products.categoria === categoria);
    res.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setRenderProductos(res);
  };

  const deleteItemEndPoint = async (tId, id) => {
    toast.dismiss(tId)
    try {
      await axios.delete(`/api/products/${id}`);
      const res = renderProductos.filter(item => item._id !== id)
      setRenderProductos(res);
      toast.success('Producto Eliminado!')
    } catch (error) {
      alert("Error al actualizar el estado")
    }
  }


  const deleteItem = async (id) => {
    toast((t) => (
      <div className="flex flex-col gap-4 p-2 min-w-[280px]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg text-red-600">
            <RiDeleteBin6Line size={20} />
          </div>
          <p className="font-bold text-slate-900 text-sm">¿Eliminar este producto?</p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed -mt-2 ml-10">
          Esta acción no se puede deshacer. El producto será borrado permanentemente.
        </p>
        <div className="flex justify-end gap-2 ml-10">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => deleteItemEndPoint(t.id, id)}
            className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
          >
            Eliminar permanentemente
          </button>
        </div>
      </div>
    ), { duration: 5000, style: { borderRadius: '1.5rem', padding: '1rem' } });
  }

  const columns = [
    columnHelper.accessor('nombre', {
      header: () => <h1 className="text-left pl-2">Nombre</h1>,
      cell: info => <h2 className="text-left font-medium w-full text-sm md:text-sm">{info.getValue()}</h2>,
    }),
    columnHelper.accessor('categoria', {
      header: () => <div className="text-left">Categoría</div>,
      cell: info => <div className="text-left w-full">{info.getValue()}</div>,
    }),
    columnHelper.accessor('disponible', {
      header: () => <div className="text-left">Disp</div>,
      cell: info => {
        const id = info.row.original._id;
        const available = info.row.original.available;
        return (
          <div className="flex justify-start items-center w-full">
            <label className="inline-flex items-center cursor-pointer">
              <input
                id={id}
                type="checkbox"
                onChange={() => handleCheckboxChange(id, available)}
                checked={available}
                className="sr-only peer" />
              <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-200 
              peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[3px] 
              after:bg-white  after:border focus:outline-none focus:right-0 after:rounded-full 
              after:h-3.5 after:w-3.5 after:transition-all  peer-checked:bg-red-500"></div>
            </label>
          </div>
        )
      },
    }),
    columnHelper.accessor('editar', {
      header: () => <p className="text-left">Editar</p>,
      cell: info => {
        const id = info.row.original._id; // Accede al id de la fila
        return (
          <div className="flex justify-start w-full">
            <Link href={`/admin/products/${id}`}>
              <a>
                <PencilEdit02Icon color={"#1C27C5"} />
              </a>
            </Link>
          </div>
        );
      },
    }),
    columnHelper.accessor('Eliminar', {
      header: () => <p className="text-left">Eliminar</p>,
      cell: info => {
        const id = info.row.original._id; // Accede al id de la fila
        return (
          <button className="flex justify-start w-full" onClick={() => deleteItem(id)}>
            <Delete02Icon color={"#DB1313"} />
          </button>
        )
      },
    }),
  ]



  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="px-2 md:px-0">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center md:text-left">Gestión de Productos</h1>
          <p className="text-slate-500 mt-1 text-center md:text-left text-sm">Crea, edita y organiza el catálogo de la pizzería.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/create" passHref>
            <a className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[13px] font-black bg-slate-900 text-white hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10">
              <FiPlus className="text-lg" />
              <span>NUEVO PRODUCTO</span>
            </a>
          </Link>
          <Link href="/admin/products/updatePrices" passHref>
            <a className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[13px] font-black bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 shadow-sm">
              <FiDollarSign className="text-slate-400 group-hover:text-red-500" />
              <span>PRECIOS</span>
            </a>
          </Link>
          <Link href="/admin/products/orderProducts" passHref>
            <a className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[13px] font-black bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 shadow-sm">
              <FiLayers className="text-slate-400 group-hover:text-red-500" />
              <span>ORDENAR</span>
            </a>
          </Link>

        </div>
      </div>

      <div className="bg-slate-900/5 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 mb-6 md:mb-10 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
        <div className="relative flex flex-col lg:flex-row gap-6 items-end">
          <div className="relative flex-1 group w-full">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Búsqueda Rápida</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search01Icon color="#94a3b8" width={20} className="group-focus-within:text-red-600 transition-colors" />
              </div>
              <input
                id="query"
                name="query"
                type="text"
                placeholder="Escribe el nombre del producto..."
                onChange={handleChangeSearch}
                className="w-full pl-14 pr-6 py-4 bg-white shadow-sm border-2 border-transparent rounded-[1.5rem] text-sm text-slate-700 placeholder:text-slate-400 focus:border-red-500/20 focus:shadow-xl focus:shadow-red-500/5 transition-all outline-none"
              />
            </div>
          </div>

          <div className="w-full lg:w-80">
            <Select
              label="Filtrar por Categoría"
              data={categorias}
              placeholder="Seleccione una categoría"
              handleChange={handleCategoryChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        {renderProductos.length > 0 && (
          <Table
            data={renderProductos}
            columns={columns}
          />
        )}
      </div>
      {/* <div className="w-full px-1 md:px-3 mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid lg:grid-cols-3 gap-3">
        {renderProductos.map(({ _id, nombre, imagen, available, categoria }) => {
          return (
            <div key={_id} className="bg-white h-auto ">
              <div className="flex justify-between items-center relative border rounded-md h-full">
                <Image
                  className="rounded-tl-md rounded-bl-md"
                  src={imagen?.url || "/images/producto-sin-imagen.png"}
                  width={140}
                  height={140}
                  alt={nombre}
                />
                <div className=" p-2 relative w-full font-montserrat  self-start  h-full">
                  <h1 className="font-medium text-sm text-gray-800">{nombre}</h1>
                  <h4 className="text-gray-400 text-xs font-normal ">{categoria}</h4>
                  <div className="absolute bottom-1 ">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id={_id}
                        type="checkbox"
                        className="sr-only peer"
                        checked={available}
                        onChange={() => handleCheckboxChange(_id, available)}
                      />
                      <div className="w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-0
                                      rounded-full
                                      dark:bg-gray-200 peer-checked:after:translate-x-full
                                      after:content-[''] after:absolute
                                      after:top-[2px] after:left-[2px] after:bg-white
                                      after:rounded-full after:h-4 after:w-4 after:transition-all
                                    dark:border-gray-600 peer-checked:bg-red-600">

                      </div>
                    </label>
                  </div>
                  <div className="absolute bottom-2 right-3 flex gap-3">
                    <Link href={`/admin/products/${_id}`}>
                      <a>
                        <PencilEdit02Icon color={"blue"} />
                      </a>
                    </Link>
                    <button onClick={() => deleteItem(_id)}>
                      <Delete02Icon color={"red"} />
                    </button>

                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div> */}
    </Layout >
  );
}

export default Products;
