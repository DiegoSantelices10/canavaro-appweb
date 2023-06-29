import Image from "next/image";
import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addPromoOrderList,
  calculateSubTotal,
  calculateTotalQuantity,
  clearOrderPromo,
} from "store/reducers/orderSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

export default function Index() {
  const [select, setSelect] = useState("gigante");
  const [radioSelect, setRadioSelect] = useState([]);
  const [total, setTotal] = useState(0);
  const { products } = useSelector(state => state.product);

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
    Swal.fire({
      title: "Estas seguro que deseas salir?",
      showDenyButton: true,
      confirmButtonText: "Descartar",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(clearOrderPromo());
        router.push("/order/home");
      }
    });
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

    const promo = {
      _id: idGenerator,
      nombre: `Pizza ${select}`,
      descripcion: concatenatedString,
      categoria: "pizzas",
      comentarios: comentariosRef.current.value,
      precio: totalRedondeado,
      cantidad: 1,
    };
    dispatch(addPromoOrderList(promo));
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
    router.push("/order/home");
    setRadioSelect([]);
    toast.error("Se agrego al carrito!", {
      icon: false,
      theme: "dark",
    });
  };

  return (
    <div className=" min-h-screen  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5">
      <div className="relative overflow-hidden h-52 lg:h-60  mx-auto  ">
        <Image
          src={"/images/descarga.jpeg"}
          layout="responsive"
          width={80}
          height={40}
          objectFit="cover"
          objectPosition="center"
          alt={"img"}
        />
        <button onClick={returnHome}>
          <FiChevronsLeft className="absolute text-slate-800 bg-slate-50 rounded-full p-1 top-4 left-4" size={30} />
        </button>
      </div>

      <div className="w-full h-auto">
        <div className="flex flex-col  w-full">
          <div className="w-full bg-white p-3">
            <h1 className="font-bold text-lg text-gray-800">Arma tu pizza</h1>
            <p className=" font-normal text-sm  text-gray-400">Elegi los gustos que quieras</p>
          </div>
          <hr className="pb-3" />
          <div className="flex w-full justify-around font-nunito font-bold mt-3">
            <div className="grid content-center gap-2">
              <input
                id="chica"
                type="radio"
                value="chica"
                name="chica"
                onChange={onChangeValue}
                checked={select === "chica"}
                className="mx-auto"
              />
              <h3 className="font-semibold text-sm">Chica</h3>
            </div>
            <div className="grid content-center gap-2">
              <input
                id="mediana"
                type="radio"
                value="mediana"
                name="mediana"
                onChange={onChangeValue}
                checked={select === "mediana"}
                className="mx-auto"
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
                className="mx-auto"
              />
              <h3 className="font-semibold text-sm">Gigante</h3>
            </div>
          </div>
          <div className="text-center font-poppins py-2 text-gray-400 text-sm">
            <p>puedes elegir hasta {select === "gigante" ? "4" : "2"} gustos</p>
          </div>
          <div
            className={
              total === 1
                ? "bg-green-500  w-full text-white p-2 mt-2 text-center font-medium"
                : "bg-sky-900 w-full text-white p-2 mt-2 text-center font-medium"
            }
          >
            {productTotal()}
          </div>
          <div className="text-sm font-semibold text-left bg-white p-3 my-1">
            {products
              .filter(item => item.categoria === "pizzas" && item.nombre !== "Fugazzeta rellena")
              ?.sort((a, b) => a.nombre.localeCompare(b.nombre))

              .map(item => {
                return (
                  <div key={item._id} className="flex justify-between items-center py-2  my-2 ">
                    <h2 className="font-nunito font-semibold text-lg">{item.nombre}</h2>
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
                          <div className="flex items-center gap-x-1">
                            <h3 className="text-gray-400 text-base">1/4</h3>
                            <input
                              type="radio"
                              value="1/4"
                              name={item.nombre}
                              checked={radioSelect[item._id]?.fraccion === "1/4"}
                              onChange={() => handleChangeRadioButton(item, "1/4")}
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-x-1">
                          <h3 className="text-gray-400 text-base">1/2</h3>
                          <input
                            type="radio"
                            value="1/2"
                            name={item.nombre}
                            checked={radioSelect[item._id]?.fraccion === "1/2"}
                            onChange={() => handleChangeRadioButton(item, "1/2")}
                          />
                        </div>
                      </div>
                    </div>
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

      <div className="bg-white w-full fixed bottom-0 p-4 border-t-2 border-gray-200  sm:w-4/5 md:w-3/5 lg:w-2/5">
        <button
          className={`${
            total === 1
              ? "flex justify-center gap-3 text-center rounded-md w-full p-4 bg-sky-900  hover:-translate-y-1 transition-all duration-500 text-white text-base font-semibold "
              : "invisible"
          }`}
          onClick={() => {
            addCartPromo(radioSelect, select);
          }}
        >
          Agregar al Carrito
          <FiShoppingCart size={23} />{" "}
        </button>
      </div>
    </div>
  );
}
