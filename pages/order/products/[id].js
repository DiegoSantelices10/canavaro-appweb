/* eslint-disable react/prop-types */

import ProductLayout from "components/ProductLayout";
import { convertToPath } from "libs/items";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "services/fetchData";
import { setExtras, setProductData } from "store/reducers/productSlice";
import { useRouter } from "next/router";

export default function Product({ data }) {

  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (products?.length <= 0) {
      try {
        const res = JSON.parse(localStorage.getItem("productos"));
        if (Array.isArray(res)) {
          const extras = res.filter(item => item.categoria === 'extras' && item.available === true);
          dispatch(setExtras(extras || []));
          dispatch(setProductData(res));
        }
      } catch (error) {
        console.error("Error al cargar productos del localStorage:", error);
      }
    }
  }, []);

  // Si data es null (producto no encontrado), redirigir al home
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-600 font-montserrat text-lg">Producto no encontrado</p>
        <button
          onClick={() => router.push("/order/home")}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-montserrat font-medium hover:-translate-y-1 transition-all duration-300"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductLayout key={data._id} data={data} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const productos = await getProducts();
    const id = query.id;

    // Validar que productos sea un array
    if (!Array.isArray(productos)) {
      return {
        props: {
          id,
          data: null,
        },
      };
    }

    const data = productos.find(
      item =>
        (convertToPath(item.nombre) === id && (item.categoria !== "empanadas" && item.categoria !== "bebidas" && item.categoria !== "porciones"))
    );

    return {
      props: {
        id,
        data: data || null, // Prevenir undefined (no es serializable por Next.js)
      },
    };
  } catch (error) {
    console.error("Error en getServerSideProps [id].js:", error);
    return {
      props: {
        id: query.id,
        data: null,
      },
    };
  }
}
