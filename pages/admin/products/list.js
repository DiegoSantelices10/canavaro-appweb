import Layout from "components/Admin/Layout";
import { useRouter } from "next/router";
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
import HeaderTitle from "components/HeaderTitle";
import Select from "components/Select";



const Products = () => {
  const [renderProductos, setRenderProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { products } = useSelector(state => state.product);
  const router = useRouter();
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
      <div className="text-gray-900 flex justify-start gap-3 items-center font-montserrat w-auto">
        <h1 className="font-normal">
          ¿Confirmas la acción?
        </h1>
        <button
          className="p-2 bg-red-500 text-white font-normal font-montserrat flex gap-1 item-center justify-center rounded-md"
          onClick={() => deleteItemEndPoint(t.id, id)}>
          <h1>
            Eliminar
          </h1>
          <RiDeleteBin6Line size={17} className="text-white" />
        </button>
      </div>
    ));
  }

  const columns = [
    columnHelper.accessor('nombre', {
      header: () => <h1 className="text-left pl-2">Nombre</h1>,
      cell: info => <h2 className="text-left font-medium text-sm md:text-sm">{info.getValue()}</h2>,
    }),
    columnHelper.accessor('categoria', {
      header: () => 'Categoría',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('disponible', {
      header: () => 'Disp',
      cell: info => {
        const id = info.row.original._id;
        const available = info.row.original.available;
        return (
          <div className=" flex justify-center items-center">
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
      header: () => '',
      cell: info => {
        const id = info.row.original._id; // Accede al id de la fila
        return (
          <div className="flex justify-center">
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
      header: () => '',
      cell: info => {
        const id = info.row.original._id; // Accede al id de la fila
        return (
          <button onClick={() => deleteItem(id)}>
            <Delete02Icon color={"#DB1313"} />
          </button>
        )
      },
    }),
  ]



  return (
    <Layout>
      <HeaderTitle title="Productos" />
      <div className="lg:flex grid grid-rows-1  gap-4 border-none  w-full mx-auto lg:items-center gap-x-4 lg:justify-between mt-6 pb-4 h-auto">
        <div className="flex flex-col sm:flex-col md:flex-row items-end w-full gap-4 ">

          <div className="flex w-full justify-between items-center h-10 pr-3 py-2 text-sm leading-tight text-gray-700 border
                            rounded-lg appearance-none focus:outline-none focus:shadow-outline">
            <input
              id="query"
              name="query"
              type="text"
              placeholder="¿Que Desea Buscar?"
              onChange={handleChangeSearch}
              className="w-full border-none text-sm rounded-lg text-gray-700 placeholder:text-gray-400 placeholder:font-montserrat  focus:outline-none focus:ring-0"
            />
            <Search01Icon color="#BFBFBF" width={20} />
          </div>

          <Select
            label="Categoria"
            data={categorias}
            handleChange={handleCategoryChange}
          />
          <button className="px-3 whitespace-nowrap h-10 w-full md:w-1/3 hover font-montserrat font-normal
                             rounded-lg  text-sm border text-white bg-red-600 hover:bg-red-500"
            type="button"
            onClick={() =>
              router.push("/admin/products/create")
            }
          >
            Producto Nuevo
          </button>

          <button className="px-3 whitespace-nowrap h-10 w-full md:w-1/3 hover font-montserrat font-normal
                             rounded-lg  text-sm border text-white bg-red-600 hover:bg-red-500"
            type="button"
            onClick={() => {
              router.push("/admin/products/updatePrices");
            }}
          >
            Actualizar precios
          </button>
          <button className="px-3 whitespace-nowrap h-10 w-full md:w-1/3 hover font-montserrat font-normal
                             rounded-lg  text-sm border text-white bg-red-600 hover:bg-red-500"
            type="button"
            onClick={() => {
              router.push("/admin/products/orderProducts");
            }}
          >
            Ordenar Productos
          </button>

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
