/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductPromo, clearOrderPromo, decrementProductPromo, setQuantityDemanded } from "store/reducers/orderSlice";

export default function Promotion({
  cantMax,

  data: { _id, nombre, categoria, descripcion, precio, addEmpanadas },
  setSelectCombo,
}) {
  const [select, setSelect] = useState("Combo 1");

  const dispatch = useDispatch();

  const { orderPromo, quantityDemanded } = useSelector(state => state.order);
  const { products } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(setQuantityDemanded(cantMax));
    dispatch(clearOrderPromo())
    if (nombre === 'Combo 4' || nombre === 'Combo 5') {
      const { _id, nombre, descripcion } =
        products.filter(item => item.categoria === "promociones").find(item => item.nombre === select) || {};
      const res = { _id, nombre, descripcion };
      setSelectCombo(res);
    }
  }, []);

  const addItems = value => {
    dispatch(addProductPromo(value));
  };

  const decrementItems = value => {
    dispatch(decrementProductPromo(value));
  };

  const setQuantity = value => {
    dispatch(setQuantityDemanded(value));
  };

  const productQuantity = _id => {
    const pre = orderPromo?.find(item => item._id === _id);
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
                    <h3 className="text-base text-neutral-800 font-poppins">{producto.nombre}</h3>
                    <h4 className="text-gray-400 text-xs font-poppins font-normal">{producto.descripcion}</h4>
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
                    <h3 className="text-base text-neutral-800 font-poppins">{producto.nombre}</h3>
                    <h4 className="text-gray-400 text-xs font-poppins font-normal">{producto.descripcion}</h4>
                  </div>
                );
              })}
          </div>
        </>
      )}

      {addEmpanadas === "no" ? (
        <div className="flex justify-between items-center ">
          <div className="font-poppins text-neutral-800 text-lg font-medium">
            <h2>{nombre}</h2>
          </div>
          <div className=" flex items-center justify-center  w-auto  text-end gap-3 text-base">
            <div
              className={
                orderPromo.length >= 1
                  ? "rounded-full  w-7 h-7 flex items-center justify-center  shadow  bg-slate-50"
                  : "invisible"
              }
            >
              <button
                type="button"
                className="text-red-500 font-normal text-2xl "
                onClick={e => {
                  decrementItems({ _id, nombre, categoria, descripcion, precio, addEmpanadas });
                  setQuantity(quantityDemanded + 1);
                }}
              >
                -
              </button>
            </div>
            <span className="font-normal text-xl  h-6">{productQuantity(_id) === 0 ? "" : productQuantity(_id)}</span>
            <div className="rounded-full  h-8 flex items-center w-8 justify-center  shadow  bg-slate-50">
              <button
                type="button"
                className="text-green-500 font-normal text-2xl"
                onClick={e => {
                  addItems({ _id, nombre, categoria, descripcion, precio, addEmpanadas });
                  setQuantity(quantityDemanded - 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 font-poppins">
          {
            <>
              {quantityDemanded < 1 ? (
                <div className="bg-green-500 w-auto p-2 rounded-md">
                  <p className="text-white text-center">¡ Se completo la cantidad requerida !</p>
                </div>
              ) : (
                <div className="bg-red-600 w-auto p-2 rounded-md">
                  <p className="text-white text-center">
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
                      <div className=" font-poppins flex justify-between items-center my-6 p-1  ">
                        <div className="w-1/2 text-zinc-800 font-medium text-base font-poppins">
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
                              className="text-red-500 font-normal text-2xl"
                              onClick={e => {
                                setQuantity(quantityDemanded + 1);
                                decrementItems({ _id, nombre, precioExtra });
                              }}
                            >
                              -
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
                              className="text-green-500 font-normal text-2xl"
                              onClick={e => {
                                setQuantity(quantityDemanded - 1);
                                addItems({ _id, nombre, precioExtra });
                              }}
                            >
                              +
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
      )}
    </div>
  );
}
