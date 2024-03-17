import Image from "next/image";
import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import {
  addPromoOrderList,
  calculateSubTotal,
  calculateTotalQuantity,
  clearOrderPromo,
} from "store/reducers/orderSlice";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import { v4 as uuidv4 } from "uuid";
import ModalMessage from "components/modalMessage";

export default function Index() {
  const [select, setSelect] = useState("gigante");
  const [radioSelect, setRadioSelect] = useState([]);
  const [extraPizza, setExtraPizza] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({ title: "", description: "", status: true });
  const [total, setTotal] = useState(0);
  const { products, extras } = useSelector(state => state.product);

  const dispatch = useDispatch();
  const router = useRouter();
  const comentariosRef = useRef();
  const idGenerator = uuidv4();

  useEffect(() => {
    checkSuma(radioSelect);
  }, [radioSelect]);

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
  }, [dispatch]);

  const onChangeValue = e => {
    const value = e.target.value;
    setSelect(value);
  };

  const handleChangeRadioButton = (item, value) => {
    const { _id, nombre, precioPizza } = item;
    radioSelect[_id] = { _id, nombre, precioPizza, "fraccion": value };
    setRadioSelect({ ...radioSelect });
  };

  const clearFraction = _id => {
    const result = Object.values(radioSelect)?.find(prod => prod._id === _id);
    if (result.fraccion === "cuarto") setTotal(total - 1);
    if (result.fraccion === "mediana") setTotal(total - 2);

    const res = Object.values(radioSelect)?.filter(pro => pro._id !== _id);
    const response = res.reduce((acc, user) => {
      acc[user._id] = user;
      return acc;
    }, {});
    setRadioSelect(response);
  };
  const returnHome = () => {
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  const checkSuma = radioArray => {
    const sumaFracciones = Object.values(radioArray).reduce((total, fracc) => {
      const fracciones = fracc.fraccion;
      const [numerador, denominador] = fracciones.split("/");
      const valorDecimal = parseInt(numerador) / parseInt(denominador);
      return total + valorDecimal;
    }, 0);
    setTotal(sumaFracciones);
  };

  const productTotal = () => {
    if (total === 0) return <h1>Selecciona como armar tu pizza</h1>;
    if (total === 0.25) return <h1>Te falta 3/4 de pizza para completar la promo</h1>;
    if (total === 0.5) return <h1>Te falta 1/2 de pizza para completar la promo</h1>;
    if (total === 0.75) return <h1>Te falta 1/4 de pizza para completar la promo</h1>;
    if (total === 1) return <h1>¡ Completaste la promo correctamente !</h1>;
    if (total > 1) return <h1>Completa la cantidad correctamente</h1>;
  };
  const addCartPromo = (value, tamanio) => {
    let total = 0;
    let cantidad = 0;
    Object.values(value).forEach(objeto => {
      total += objeto.precioPizza[tamanio];
      cantidad++;
    });

    const newList = Object.values(value).map(({ precioPizza, ...resto }) => resto);

    const promedio = total / cantidad;

    const totalRedondeado = Math.ceil(promedio / 100) * 100;

    const concatenatedString = Object.values(newList)
      .map(product => `${product.fraccion} ${product.nombre} `)
      .join(", ");
    let promo = {};

    if (extraPizza.length > 0) {
      promo = {
        _id: idGenerator,
        nombre: `Pizza ${select}`,
        descripcion: concatenatedString,
        categoria: "pizzas",
        comentarios: comentariosRef.current.value,
        extra: `${extraPizza.map(extra => extra.nombre).join(', ')}`,
        precio: totalRedondeado + extraPizza.reduce((total, extra) => total + extra.precio, 0),
        cantidad: 1,
      };
    } else {
      promo = {
        _id: idGenerator,
        nombre: `Pizza ${select}`,
        descripcion: concatenatedString,
        categoria: "pizzas",
        comentarios: comentariosRef.current.value,
        precio: totalRedondeado,
        cantidad: 1,
      };
    }
    dispatch(addPromoOrderList(promo));
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
    router.push("/order/home");
    setRadioSelect([]);
    toast.success('Se agrego al pedido!')

  };

  const handleCloseModal = () => {
    addCartPromo(radioSelect, select);
    setShowModal(false);
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };
  const addExtra = (item) => {
    setExtraPizza([...extraPizza, item]);
  }

  const openModal = () => {
    if (extras.length > 0) {
      setInfo({
        title: "Puedes agregar extras",
        status: null,
      });
      setShowModal(true);
    } else {
      addCartPromo(radioSelect, select);
    }
  }

  return (
    <div className="relative min-h-screen  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-1/2">
      {showModal && (
        <ModalMessage
          handleClose={handleCloseModal}
          addExtra={addExtra}
          showModal={showModal}
          extraPizza={extraPizza}
          setShowModal={setShowModal}
          extras={extras}
          info={info}
        />
      )}
      <Toaster />
        <Image
          src={"/images/pizzafree.webp"}
          className="-z-10"
          layout="responsive"
          objectFit="contain"
          objectPosition="top"
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        
          alt={"img"} />

      <button onClick={returnHome}>
        <FiChevronsLeft className="absolute text-slate-800 bg-slate-50  rounded-md shadow p-1 top-6 left-6" size={30} />
      </button>
      <div className="w-full h-auto -mt-60 sm:-mt-72 md:-mt-72 lg:-mt-80">
        <div className="flex flex-col  w-full ">
          <div className="w-full bg-white rounded-t-3xl p-4">
            <h1 className="font-semibold text-lg text-neutral-800 font-poppins">Arma tu pizza</h1>
            <p className=" font-normal text-sm  text-gray-400 font-poppins">Elegi los gustos que quieras</p>
          </div>
          <div className="flex w-full justify-around font-poppins font-bold bg-white z-10">
            <div className="grid content-center gap-2">
              <input
                id="chica"
                type="radio"
                value="chica"
                name="chica"
                onChange={onChangeValue}
                checked={select === "chica"}
                className="mx-auto rounded focus:ring-0 focus:text-sky-800"
              />
              <h3 className="font-semibold font-poppins text-sm">Chica</h3>
            </div>
            <div className="grid content-center gap-2">
              <input
                id="mediana"
                type="radio"
                value="mediana"
                name="mediana"
                onChange={onChangeValue}
                checked={select === "mediana"}
                className="mx-auto rounded focus:ring-0 focus:text-sky-800"
              />
              <h3 className="font-semibold text-center text-sm">Mediana</h3>
            </div>
            <div className="grid content-center gap-2">
              <input
                id="gigante"
                type="radio"
                value="gigante"
                name="gigante"
                onChange={onChangeValue}
                checked={select === "gigante"}
                className="mx-auto rounded focus:ring-0 focus:text-sky-800"
              />
              <h3 className="font-semibold text-sm">Gigante</h3>
            </div>
          </div>
          <div className="text-center font-poppins py-2 text-gray-400 text-base">
            <p>puedes elegir hasta {select === "gigante" ? "4" : "2"} gustos</p>
          </div>
          <div className="px-3 rounded-md">
            <div
              className={
                total === 1
                  ? "bg-green-500 font-poppins rounded-xl  w-full text-sm text-white p-3 mt-2 text-center font-semibold"
                  : "bg-red-600 w-full font-poppins rounded-xl text-white text-sm p-3 mt-2 text-center font-semibold"
              }
            >
              {productTotal()}
            </div>
          </div>
          <div className="text-sm font-semibold text-left bg-white p-3 my-1">
            {products
              .filter(
                item => item.categoria === "pizzas" && item.nombre !== "Fugazzeta rellena" && item.available === true
              )
              ?.sort((a, b) => a.nombre.localeCompare(b.nombre))

              .map(item => {
                return (
                  <div key={item._id}>
                  
                  <div className="flex justify-between items-center py-2  my-2 ">
                    <h2 className="font-poppins font-medium text-neutral-800 text-base">{item.nombre}</h2>
                    <div className="w-auto   px-3 text-end space-x-4 text-base">
                      <div className="flex w-full justify-around items-center gap-5">
                        {radioSelect[item._id]?.fraccion && (
                          <button
                            onClick={() => clearFraction(item._id)}
                            className="text-gray-400 text-xs font-semibold"
                          >
                            Deshacer
                          </button>
                        )}
                        {select === "gigante" && (
                          <div className="flex items-center justify-center gap-x-2">
                            <h3 className="text-gray-400 text-sm font-poppins">1/4</h3>
                            <input
                              type="radio"
                              value="1/4"
                              name={item.nombre}
                              className="mx-auto rounded focus:ring-0 focus:text-sky-800"
                              checked={radioSelect[item._id]?.fraccion === "1/4"}
                              onChange={() => handleChangeRadioButton(item, "1/4")}
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-x-2">
                          <h3 className="text-gray-400 text-sm font-poppins">1/2</h3>
                          <input
                            type="radio"
                            value="1/2"
                            name={item.nombre}
                            className="mx-auto rounded focus:ring-0 focus:text-sky-800 hover:text-sky-800"
                            checked={radioSelect[item._id]?.fraccion === "1/2"}
                            onChange={() => handleChangeRadioButton(item, "1/2")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="font-normal text-left text-sm pb-24 pt-5 bg-white p-3 max-h-full">
          <h1 className="pb-1">Comentarios</h1>
          <input
            ref={comentariosRef}
            id="comentarios"
            name="comentarios"
            type="text"
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
      </div>
      {total === 1 && (
        <div className="bg-white w-full fixed bottom-0 p-3  border-gray-200  sm:w-4/5 md:w-3/5 lg:w-2/5">
          <button
            className={`${total === 1
              ? "flex justify-center gap-3 text-center rounded-2xl w-full p-4 bg-red-600  hover:-translate-y-1 transition-all font-poppins duration-500 text-white text-base font-semibold "
              : "invisible"
              }`}
            onClick={() => {
              openModal();
              // addCartPromo(radioSelect, select);
            }}
          >
            Agregar al Carrito
            <FiShoppingCart size={23} />{" "}
          </button>
        </div>
      )}
    </div>
  );
}
