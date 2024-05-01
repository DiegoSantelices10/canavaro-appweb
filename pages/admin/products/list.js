import Layout from "components/admin/layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { setProductData } from "store/reducers/productSlice";
import { getProductsFront } from "services/fetchData";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Delete02Icon from "public/images/delete-02-stroke-rounded";
import PencilEdit02Icon from "public/images/pencil-edit-02-stroke-rounded";
import Search01Icon from "public/images/search-01-stroke-rounded";

export default function Products() {
  const [renderProductos, setRenderProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { products } = useSelector(state => state.product);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductsFront();
        const order = res.sort((a, b) => a.nombre.localeCompare(b.nombre));
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

  const handleCategoryChange = event => {
    const cat = event.target.value;
    const res = products.filter(products => products.categoria === cat);
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
      <div className="text-gray-900 flex justify-start gap-3 items-center font-poppins w-auto">
        <h1 className="font-normal">
          ¿Confirmas la acción?
        </h1>
        <button
          className="p-2 bg-red-500 text-white font-normal font-poppins flex gap-1 item-center justify-center rounded-md"
          onClick={() => deleteItemEndPoint(t.id, id)}>
          <h1>
            Eliminar
          </h1>
          <RiDeleteBin6Line size={17} className="text-white" />
        </button>
      </div>
    ));
  }

  return (
    <Layout>
      <Toaster />
      <div className="lg:flex grid grid-rows-1  gap-4 border-none  w-full px-1 md:px-3 mx-auto lg:items-center gap-x-4 lg:justify-between py-10 h-auto">
        <div className="flex flex-col sm:flex-col md:flex-row w-full gap-2">

          <div className="bg-white flex w-full lg:w-1/2  items-center gap-x-2">
            <div
              className="flex  justify-between items-center w-full  h-10  pr-3 py-2 text-sm leading-tight text-gray-700 border
                         rounded-xl appearance-none focus:outline-none focus:shadow-outline"
            >
              <input
                id="query"
                name="query"
                type="text"
                placeholder="¿Que Desea Buscar?"
                onChange={handleChangeSearch}
                className="w-full border-none text-sm rounded-xl  focus:outline-none focus:ring-0"
              />
              <Search01Icon color="#BFBFBF" width={20} />
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-10 rounded-xl appearance-none focus:outline-none focus:shadow-outline focus:ring-white focus:right-0-0">
            <select
              onChange={handleCategoryChange}
              className="h-10 border border-gray-200 font-poppins focus:ring-0 focus:ring-gray-200 focus:right-0 focus:outline-none text-gray-400 text-sm rounded-xl  block w-full p-2.5 "
            >
              <option className="text-gray-200 text-sm font-poppins" value="">
                Seleccione una categoria
              </option>
              {categorias.map(item => (
                <option key={item} value={item} className="text-sm font-poppins font-medium">
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full my-2 md:my-0  lg:w-1/3 items-center justify-end gap-5 ">
          <button
            className="px-3 whitespace-nowrap h-10  col-start-2 font-poppins font-normal
                             rounded-xl  text-sm 
                             border text-white bg-red-600"
            type="button"
            onClick={() =>
              router.push("/admin/products/create")
            }
          >
            Producto Nuevo
          </button>
          <button
            className=" h-10 col-start-2 whitespace-nowrap  px-3 font-poppins font-normal
                             rounded-xl  text-sm 
                             border  bg-red-600 text-white"
            type="button"
            onClick={() => {
              router.push("/admin/products/updatePrices");
            }}
          >
            Actualizar precios
          </button>
        </div>

      </div>

      <div className="w-full px-1 md:px-3 mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid lg:grid-cols-3 gap-3">
        {renderProductos.map(({ _id, nombre, imagen, available, categoria }) => {
          return (
            <div key={_id} className="bg-white h-auto ">
              <div className="flex justify-between items-center relative border rounded-md ">
                <Image
                  className="rounded-md"
                  src={imagen?.url || "/images/producto-sin-imagen.png"}
                  width={140}
                  height={140}
                  alt={nombre}
                />
                <div className=" p-2 relative w-full font-poppins  self-start">
                  <h1 className="font-semibold text-sm text-gray-800">{nombre}</h1>

                  <h4 className="text-gray-500 text-xs font-medium ">{categoria}</h4>
                  <div className="absolute bottom-0">
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
                </div>
                <div className="flex absolute bottom-2 right-3 gap-3">
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
          );
        })}
      </div>
    </Layout >
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;

  const token = req.headers.cookie?.includes("token") || req.cookies.token;
  if (!token) {
    res.setHeader("location", "/admin/auth/login"); // Redirigir al usuario a la página de inicio de sesión
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { props: {} };
}
