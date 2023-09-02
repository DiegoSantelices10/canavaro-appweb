/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import PizzaInfo from "./pizzaInfo";
import Promotion from "./promotion";

import { toast } from "react-toastify";

import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";

import {
  addProductPizza,
  calculateSubTotal,
  calculateTotalQuantity,
  addPromoOrderList,
  clearOrderPromo,
  decrementProductPizza,
} from "store/reducers/orderSlice";

import { useDispatch, useSelector } from "react-redux";
import ModalMessage from "./modalMessage";
export default function ProductLayout({
  data,
  data: { _id, nombre, descripcion, categoria, cantidadMaxima, imagen, tamanio, precio },
}) {
  const { orderPromo, orderList, quantityDemanded } = useSelector(state => state.order);
  const [selectCombo, setSelectCombo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({ title: "", description: "", status: true });

  const comentarioRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
  }, [orderList, dispatch]);

  const productQuantity = _id => {
    const pre = orderPromo.find(item => item._id === _id);
    return pre?.cantidad ? pre.cantidad : 0;
  };

  const result = () => {
    if (data.addEmpanadas) {
      if (quantityDemanded < 1 && orderPromo.length > 0) {
        return true;
      }
    } else {
      if (orderPromo.length > 0) {
        return true;
      }
    }
  };
  const incrementCartPizza = data => {
    dispatch(addProductPizza(data));
  };

  const decrementCartPizza = data => {
    dispatch(decrementProductPizza(data));
  };

  const returnHome = () => {
    setInfo({
      title: "Estas seguro que deseas salir?",
      description: "Los datos no seran guardados al carrito",
      status: false,
    });
    setShowModal(true);
  };

  const addCartPromo = value => {
    if (data.addEmpanadas === "si") {
      if (selectCombo) {
        const promo = {
          _id,
          nombre,
          descripcion,
          products: [selectCombo, ...value],
          categoria,
          comentarios: comentarioRef.current.value,
          cantidadMaxima,
          precio,
          cantidad: 1,
        };
        dispatch(addPromoOrderList(promo));
        toast.error("Se agrego al carrito!", {
          icon: false,
          theme: "dark",
        });
      } else {
        const promo = {
          _id,
          nombre,
          descripcion,
          products: [...value],
          categoria,
          comentarios: comentarioRef.current.value,
          cantidadMaxima,
          precio,
          cantidad: 1,
        };
        dispatch(addPromoOrderList(promo));
        toast.error("Se agrego al carrito!", {
          icon: false,
          theme: "dark",
        });
      }
    } else {
      toast.error("Se agrego al carrito!", {
        icon: false,
        theme: "dark",
      });
      value.map(item => dispatch(addPromoOrderList({ ...item, comentarios: comentarioRef.current.value })));
    }

    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  return (
    <div className=" min-h-screen  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 ">
      {showModal && (
        <ModalMessage showModal={showModal} handleClose={handleCloseModal} info={info} setShowModal={setShowModal} />
      )}


      <div className="flex justify-center items-center  w-full mt-12">
        <Image
          className="rounded-md w-1/2"
          src={imagen?.url}
          width={230}
          height={200}
          alt={nombre} />

      </div>
      <button onClick={returnHome}>
        <FiChevronsLeft className="absolute text-slate-800 bg-slate-50  rounded-md shadow p-1 top-4 left-4" size={30} />
      </button>
      <div className="w-full h-auto">
        <div className="flex flex-col   w-full">
          <div className="w-full bg-white px-3 ">
            <h1 className="font-bold text-lg font-nunito text-gray-800">{nombre}</h1>
            <p className=" font-normal text-sm  text-gray-400 font-nunito">{descripcion}</p>
            {categoria === "promociones" && (
              <p className=" font-normal font-nunito text-sm text-gray-400">$ {precio}</p>
            )}
            <hr className="mt-4" />
          </div>
          <div className="text-sm font-semibold text-left bg-white p-3 my-1">
            {categoria === "pizzas" ? (
              <div className=" flex flex-col gap-y-2  justify-evenly">
                <PizzaInfo
                  data={data}
                  incrementCart={incrementCartPizza}
                  decrementCart={decrementCartPizza}
                  cart={orderPromo}
                />
              </div>
            ) : (
              <Promotion
                setSelectCombo={setSelectCombo}
                data={data}
                quantity={productQuantity}
                cantMax={cantidadMaxima}
              />
            )}
          </div>
        </div>

        <div className="font-normal text-left text-sm pb-24 pt-5 bg-white p-3 max-h-full">
          <label className="pb-1">
            Comentarios
            <input
              id="comentarios"
              name="comentarios"
              type="text"
              ref={comentarioRef}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </label>
        </div>
      </div>

      <div className="bg-white w-full fixed bottom-0 p-4 border-t-2 border-gray-200  sm:w-4/5 md:w-3/5 lg:w-2/5">
        <button
          className={`${result() > 0
            ? "flex justify-center gap-3 text-center rounded-md w-full p-4 bg-sky-900 hover:-translate-y-1 transition-all duration-500 text-white text-base font-semibold"
            : "invisible"
            } `}
          onClick={() => {
            addCartPromo(orderPromo);
          }}
        >
          Agregar al Carrito
          <FiShoppingCart size={23} />{" "}
        </button>
      </div>
    </div>
  );
}
