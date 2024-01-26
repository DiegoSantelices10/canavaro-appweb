/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import PizzaInfo from "./pizzaInfo";
import Promotion from "./promotion";
import { useCollapse } from 'react-collapsed'
import { Toaster, toast } from "react-hot-toast";

import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

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
  const { extras } = useSelector(state => state.product);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    easing: '0.4',
    duration: 10,
  })
  const [selectCombo, setSelectCombo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [extraPizza, setExtraPizza] = useState([]);
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
        toast.success("Se agrego al pedido!");
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
        toast.success("Se agrego al pedido!");
      }
    } else {
      toast.success("Se agrego al pedido!");

      value.map(item =>
        dispatch(addPromoOrderList({
          ...item,
          comentarios: comentarioRef.current.value,
          precio: item.precio + extraPizza.reduce((total, extra) => total + extra.precio, 0),
          extra: `${extraPizza.map(extra => extra.nombre).join(', ')}`
        })));
    }

    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  const addExtra = (item) => {
    setExtraPizza([...extraPizza, item]);
  }

  return (
    <div className="relative min-h-screen  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 ">
      {showModal && (
        <ModalMessage showModal={showModal} handleClose={handleCloseModal} info={info} setShowModal={setShowModal} />
      )}
      <Toaster />
      <div className="flex justify-center items-center  w-full mt-8">
        <Image
          className="rounded-md "
          src={imagen?.url}
          width={280}
          height={200}
          alt={nombre} />

      </div>
      <button onClick={returnHome}>
        <FiChevronsLeft className="absolute text-neutral-800 bg-slate-50  rounded-md shadow p-1 top-0 left-4" size={30} />
      </button>
      <div className="w-full h-auto">
        <div className="flex flex-col  w-full">
          <div className="w-full bg-white px-3 ">
            <h1 className="font-semibold text-lg font-poppins text-neutral-800">{nombre}</h1>
            <p className=" font-normal text-sm  text-gray-400 font-poppins">{descripcion}</p>
            {categoria === "promociones" && (
              <p className=" font-normal font-poppins text-sm text-gray-400">$ {precio}</p>
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
                {result() > 0 && extras.length > 0 && (
                  <div className="mt-1 font-poppins">
                    <button
                      className="flex w-full justify-between items-center py-3 focus:"
                      {...getToggleProps()}
                    >
                      <div className="text-left">
                        <p className="text-base tracking-wide">
                          Eleg&iacute; extras para tu pizza
                        </p>
                        <p className="text-xs font-normal text-gray-400">
                          Si elegis mas de una pizza, el extra se suma a ambas
                        </p>

                      </div>
                      {isExpanded ?
                        <FaAngleUp size={25} className="text-red-500" /> :
                        <FaAngleDown size={25} className="text-green-500" />
                      }
                    </button>
                    <hr />
                    {isExpanded && extras.map(item => (
                      <div
                        key={item._id}
                      >
                        <section
                          {...getCollapseProps()}
                          className="my-4 text-base font-normal flex justify-between"
                        >
                          <div className="flex justify-between w-3/5">
                            <p>
                              {item.nombre}
                            </p>
                            <p>
                              $ {item.precio}
                            </p>
                          </div>
                          {extraPizza.includes(item) ? (
                            <p
                              className="text-sm"
                            >Agregado</p>
                          ) : (
                            <button
                              onClick={() => addExtra(item)}
                              className="bg-red-500 rounded-md text-sm text-white p-1 px-2"
                            >
                              Agregar
                            </button>
                          )

                          }

                        </section>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
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

      <div className=" w-full fixed bottom-0 p-4  sm:w-4/5 md:w-3/5 lg:w-2/5">
        <button
          className={`${result() > 0
            ? "flex justify-center gap-3 text-center rounded-md w-full p-4 bg-red-600 hover:-translate-y-1 transition-all duration-500 text-white text-base font-semibold"
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
