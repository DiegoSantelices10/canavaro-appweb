import Layout from "components/admin/layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaRegEdit } from "react-icons/fa";
import { setProductData } from "store/reducers/productSlice";
import { getProductsFront } from "services/fetchData";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Products() {
  const [renderProductos, setRenderProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { products } = useSelector(state => state.product);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getProductsFront();
      const order = res.sort((a, b) => a.nombre.localeCompare(b.nombre));
      const categories = [...new Set(res.map(producto => producto.categoria))];
      setCategorias(categories);
      setRenderProductos(order);
      dispatch(setProductData(order));
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
      const response = await axios.put(`/api/products/${id}`, {
        available: !availableCurrent,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = event => {
    const cat = event.target.value;
    const res = products.filter(products => products.categoria === cat);
    res.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setRenderProductos(res);
  };

  return (
    <Layout>
      <div className="lg:flex grid grid-rows-1 px-2 lg:px-0 gap-4  w-full md:w-11/12 lg:w-11/12 mx-auto lg:items-center gap-x-4 lg:justify-between py-4 h-auto">
        <div className="bg-white flex w-full lg:w-1/3  items-center gap-x-2 ">
          <div
            className="flex  justify-between items-center w-full  h-12  pr-3 py-2 text-sm leading-tight text-gray-700 border-0 
                         rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <input
              id="query"
              name="query"
              type="text"
              placeholder="¿Que Desea Buscar?"
              onChange={handleChangeSearch}
              className="w-full border-0  focus:outline-none focus:ring-0"
            />
            <FaSearch size={20} />
          </div>
        </div>
        <div className="w-full lg:w-1/3 h-12 border-none shadow appearance-none focus:outline-none focus:shadow-outline">
          <select
            onChange={handleCategoryChange}
            className="h-12 border-none font-nunito  text-gray-900 text-lg rounded-lg  block w-full p-2.5 "
          >
            <option className="text-gray-200" value="">
              Selecciona una categoria
            </option>
            {categorias.map(item => (
              <option key={item} value={item} className="text-lg font-nunito font-semibold">
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full my-2 md:my-0  lg:w-1/3 items-center justify-between ">
          <h1
            className="text-md lg:text-md font-nunito font-extrabold text-center
                       text-zinc-800 w-full "
          >
            ¡Ingresa un producto nuevo!
          </h1>

          <button
            className="w-64 h-12 col-start-2 font-nunito font-bold
                             rounded-md  text-base 
                             border text-white bg-sky-800"
            type="button"
            onClick={() => {
              router.push("/admin/products/create");
            }}
          >
            Producto Nuevo
          </button>
        </div>
      </div>

      <div className="w-full px-2 md:w-11/12 lg:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid lg:grid-cols-3 gap-3">
        {renderProductos.map(({ _id, nombre, descripcion, imagen, available, categoria }) => {
          return (
            <div key={_id}>
              <div className=" flex justify-between items-center p-0  relative ">
                <Image
                  className="rounded-xl"
                  src={imagen?.url || "/images/logocanavaro.png"}
                  width={140}
                  height={140}
                  alt={nombre}
                />
                <div className=" p-2 relative w-full font-nunito h-28  self-start">
                  <h1 className="font-bold text-sm text-gray-800">{nombre}</h1>
                  <p className="text-gray-400 text-xs">{descripcion}</p>
                  <h4 className="text-gray-700 text-xs ">{categoria}</h4>
                  <div className="absolute bottom-0">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id={_id}
                        type="checkbox"
                        className="sr-only peer"
                        checked={available}
                        onChange={() => handleCheckboxChange(_id, available)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-sky-900 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-800"></div>
                    </label>
                  </div>
                </div>
                <div className="flex absolute bottom-2 right-3 gap-3">
                  <Link href={`/admin/products/${_id}`}>
                    <a>
                      <FaRegEdit size={25} className="text-gray-800" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
    </Layout>
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
