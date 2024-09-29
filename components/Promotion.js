/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import useDrinks from "Hooks/useDrinks";
import Add01Icon from "public/images/add-01-stroke-rounded";
import MinusSignIcon from "public/images/minus-sign-stroke-rounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { addDrinksPromo, addProductPromo, clearDrinks, clearOrderPromo, decrementDrinksPromo, decrementProductPromo, setQuantityDemanded, setQuantityDemandedDrinks } from "store/reducers/orderSlice";

export default function Promotion({
  cantMax,
  data,
  data: { _id, nombre, categoria, descripcion, precio, addEmpanadas, extras, cantidadExtras, addExtras },
  setSelectCombo,
}) {
  const [select, setSelect] = useState("Combo 1");

  const dispatch = useDispatch();

  const { orderPromo, quantityDemanded, quantityDemandedDrinks, bebidas } = useSelector(state => state.order);
  const { products } = useSelector(state => state.product);
  const { drinks } = useDrinks();

  useEffect(() => {
    dispatch(setQuantityDemanded(0));
    dispatch(setQuantityDemandedDrinks(0));
    dispatch(setQuantityDemanded(cantMax || 0));
    dispatch(setQuantityDemandedDrinks(cantidadExtras || 0));
    dispatch(clearOrderPromo())
    dispatch(clearDrinks());
    if (nombre === 'Combo 4' || nombre === 'Combo 5') {
      const { _id, nombre, descripcion } =
        products.filter(item => item.categoria === "promociones").find(item => item.nombre === select) || {};
      const res = { _id, nombre, descripcion };
      setSelectCombo(res);
    }
  }, []);


  const listAvailableDrinks = () => {
    const updatedExtras = extras.filter(extra => {
      const matchingDrink = drinks.find(drink => drink._id === extra._id);

      // Si no hay matching drink o si available es true, mantenemos el extra
      return !(matchingDrink && matchingDrink.available === false);
    });

    return updatedExtras;
  };


  const addItems = value => {
    if (value.categoria === 'bebidas') {
      dispatch(addDrinksPromo(value));
    } else {
      dispatch(addProductPromo(value));
    }
  };

  const decrementItems = value => {
    if (value.categoria === 'bebidas') {
      dispatch(decrementDrinksPromo(value));
    } else {
      dispatch(decrementProductPromo(value));
    }
  };

  const setQuantity = value => {
    dispatch(setQuantityDemanded(value));
  };

  const setQuantityDrinks = value => {
    dispatch(setQuantityDemandedDrinks(value));
  };


  const productQuantity = _id => {
    const pre = orderPromo?.find(item => item._id === _id);
    return pre?.cantidad ? pre.cantidad : 0;
  };

  const drinksQuantity = _id => {
    const pre = bebidas?.find(item => item._id === _id);
    return pre?.cantidad ? pre.cantidad : 0;
  };

  const onChangeValue = e => {
    setSelect(e.target.value);
    if (products !== null) {
      const { _id, nombre, descripcion } =
        products.filter(item => item.categoria === "promociones").find(item => item.nombre === e.target.value) || {};
      const res = { _id, nombre, descripcion };
      setSelectCombo(res);
    }
  };

  const quantityZero = _id => {
    return orderPromo?.find(item => item._id === _id);
  };

  const quantityZeroDrinks = _id => {
    return bebidas?.find(item => item._id === _id);
  };


  return (
    <div className="mt-4">
      {(nombre === "Combo 4" || nombre === "Combo 5") && (
        <>
          <div className="font nunito p-1 flex gap-2 justify-start items-center">
            <input
              id="1"
              type="radio"
              value="Combo 1"
              name="combo"
              onChange={onChangeValue}
              checked={select === "Combo 1"}
            />
            {products
              ?.filter(item => item.nombre.includes("Combo 1"))
              .map(producto => {
                return (
                  <div key={producto._id}>
                    <h3 className="text-base text-neutral-800 font-montserrat">{producto.nombre}</h3>
                    <h4 className="text-gray-400 text-xs font-montserrat font-normal">{producto.descripcion}</h4>
                  </div>
                );
              })}
          </div>
          <div className="font nunito p-1 flex gap-2 justify-start items-center">
            <input
              id="2"
              type="radio"
              value="Combo 2"
              name="combo"
              onChange={onChangeValue}
              checked={select === "Combo 2"}
            />
            {products
              ?.filter(item => item.nombre.includes("Combo 2"))
              .map(producto => {
                return (
                  <div key={producto._id}>
                    <h3 className="text-base text-neutral-800 font-montserrat">{producto.nombre}</h3>
                    <h4 className="text-gray-400 text-xs font-montserrat font-normal">{producto.descripcion}</h4>
                  </div>
                );
              })}
          </div>
        </>
      )}

      {(addEmpanadas === "no" && addExtras === "no") && (
        <div className="flex justify-between items-center ">
          <div className="font-montserrat text-neutral-800 text-lg font-medium">
            <h2>{nombre}</h2>
          </div>
          <div className=" flex items-center justify-center  w-auto  text-end gap-3 text-base">
            <div
              className={
                orderPromo.length >= 1
                  ? "rounded-full  w-7 h-7 flex items-center justify-center  shadow-sm  bg-slate-50"
                  : "invisible"
              }
            >
              <button
                type="button"
                className="text-red-500 font-normal text-2xl flex justify-center items-center"
                onClick={e => {
                  decrementItems({ _id, nombre, categoria, descripcion, precio, addEmpanadas });
                  setQuantity(quantityDemanded - 1);
                }}
              >
                <MinusSignIcon color={"bg-red-500"} width={18} height={18} />
              </button>
            </div>
            <span className="font-normal text-xl  h-6">{productQuantity(_id) === 0 ? "" : productQuantity(_id)}</span>
            <div className="rounded-full  h-8 flex items-center w-8 justify-center  shadow-sm  bg-slate-50">
              <button
                type="button"
                className="text-green-500 font-normal text-2xl justify-center items-center"
                onClick={e => {
                  addItems({ _id, nombre, categoria, descripcion, precio, addEmpanadas });
                  setQuantity(quantityDemanded + 1);
                }}
              >
                <Add01Icon color={"bg-green-500"} width={18} height={18} />

              </button>
            </div>
          </div>
        </div>
      )}

      {addExtras === "si" && (
        <div className="font-montserrat">
          {quantityDemandedDrinks < 1 ? (
            <div className="bg-green-500 w-auto p-2 rounded-lg">
              <p className="text-white text-center font-normal">¡ Se completo la cantidad requerida !</p>
            </div>
          ) : (
            <div className="bg-red-600 w-auto p-2 rounded-lg">
              <p className="text-white text-center font-normal">
                Selecciona {quantityDemandedDrinks} bebidas para completar la promo
              </p>
            </div>
          )}
          {listAvailableDrinks()?.map(({ _id, nombre }) => (
            <div key={_id}>
              <div className=" font-montserrat flex justify-between items-center my-5 p-1  ">
                <div className="w-1/2 text-zinc-800 font-medium text-base font-montserrat">
                  <h2>{nombre}</h2>
                </div>
                <div className=" flex items-center justify-center  w-auto  text-end gap-3 text-base">
                  <div
                    className={
                      quantityZeroDrinks(_id)
                        ? "rounded-full w-8 h-8 grid content-center  shadow  bg-slate-50"
                        : "invisible"
                    }
                  >
                    <button
                      type="button"
                      className="text-red-500 font-normal text-2xl flex justify-center items-center"
                      onClick={e => {
                        setQuantityDrinks(quantityDemandedDrinks + 1);
                        decrementItems({ _id, nombre, categoria: "bebidas", precio: 0 });
                      }}
                    >
                      <MinusSignIcon color={"bg-red-500"} width={18} height={18} />
                    </button>
                  </div>

                  <span className="font-normal text-xl  h-6">{drinksQuantity(_id) === 0 ? "" : drinksQuantity(_id)}</span>
                  <div
                    className={
                      quantityDemandedDrinks === 0
                        ? `invisible`
                        : "rounded-full w-8 h-8 grid content-center  shadow  bg-slate-50"
                    }
                  >
                    <button
                      type="button"
                      className="text-green-500 font-normal text-2xl flex justify-center items-center"
                      onClick={e => {
                        setQuantityDrinks(quantityDemandedDrinks - 1);
                        addItems({ _id, nombre, categoria: "bebidas", precio: 0 });
                      }}
                    >
                      <Add01Icon color={"bg-green-500"} width={18} height={18} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}

      {addEmpanadas === "si" && (
        (
          <div className="mt-4 font-montserrat">
            {
              <>
                {quantityDemanded < 1 ? (
                  <div className="bg-green-500 w-auto p-2 rounded-lg">
                    <p className="text-white text-center font-normal">¡ Se completo la cantidad requerida !</p>
                  </div>
                ) : (
                  <div className="bg-red-600 w-auto p-2 rounded-lg">
                    <p className="text-white text-center font-normal">
                      Selecciona {quantityDemanded} empanadas para completar la promo
                    </p>
                  </div>
                )}

                {products
                  ?.filter(item => item.categoria === "empanadas" && item.available === true)
                  ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map(({ _id, nombre, precioExtra }) => {
                    return (
                      <div key={_id}>
                        <div className="font-montserrat flex justify-between items-center my-5 p-1  ">
                          <div className="w-1/2 text-zinc-800 font-medium text-base font-montserrat">
                            <h2>{nombre}</h2>
                          </div>
                          <div className=" flex items-center justify-center  w-auto  text-end gap-3 text-base">
                            <div
                              className={
                                quantityZero(_id)
                                  ? "rounded-full w-8 h-8 grid content-center  shadow  bg-slate-50"
                                  : "invisible"
                              }
                            >
                              <button
                                type="button"
                                className="text-red-500 font-normal text-2xl flex justify-center items-center"
                                onClick={e => {
                                  setQuantity(quantityDemanded + 1);
                                  decrementItems({ _id, nombre, precioExtra });
                                }}
                              >
                                <MinusSignIcon color={"bg-red-500"} width={18} height={18} />
                              </button>
                            </div>

                            <span className="font-normal text-xl  h-6">{productQuantity(_id) === 0 ? "" : productQuantity(_id)}</span>
                            <div
                              className={
                                quantityDemanded < 1
                                  ? `invisible`
                                  : "rounded-full w-8 h-8 grid content-center  shadow  bg-slate-50"
                              }
                            >
                              <button
                                type="button"
                                className="text-green-500 font-normal text-2xl flex justify-center items-center"
                                onClick={e => {
                                  setQuantity(quantityDemanded - 1);
                                  addItems({ _id, nombre, precioExtra });
                                }}
                              >
                                <Add01Icon color={"bg-green-500"} width={18} height={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>

                    );
                  })}
              </>
            }
          </div>
        )
      )}



    </div>
  );
}
