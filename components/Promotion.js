/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import useDrinks from "Hooks/useDrinks";
import Add01Icon from "public/images/add-01-stroke-rounded";
import MinusSignIcon from "public/images/minus-sign-stroke-rounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { addDrinksPromo, addPostresPromo, addProductPromo, clearDrinks, clearPostres, clearOrderPromo, decrementDrinksPromo, decrementPostresPromo, decrementProductPromo, setQuantityDemanded, setQuantityDemandedDrinks, setQuantityDemandedPostres } from "store/reducers/orderSlice";

export default function Promotion({
  cantMax,
  data,
  data: { _id, nombre, categoria, descripcion, precio, addEmpanadas, extras, cantidadExtras, addExtras, addPostres, cantidadPostres },
  setSelectCombo,
}) {
  const [select, setSelect] = useState("Combo 1");

  const dispatch = useDispatch();

  const { orderPromo, quantityDemanded, quantityDemandedDrinks, quantityDemandedPostres, bebidas, postres } = useSelector(state => state.order);
  const { products } = useSelector(state => state.product);
  const { drinks } = useDrinks();

  useEffect(() => {
    dispatch(setQuantityDemanded(0));
    dispatch(setQuantityDemandedDrinks(0));
    dispatch(setQuantityDemandedPostres(0));
    dispatch(setQuantityDemanded(cantMax || 0));
    dispatch(setQuantityDemandedDrinks(cantidadExtras || 0));
    dispatch(setQuantityDemandedPostres(Number(cantidadPostres) || 0));
    dispatch(clearOrderPromo())
    dispatch(clearDrinks());
    dispatch(clearPostres());
    if (nombre === 'Combo 4' || nombre === 'Combo 5') {
      const { _id, nombre, descripcion } =
        products.filter(item => item.categoria?.toLowerCase() === "combos" || item.categoria?.toLowerCase() === "promociones").find(item => item.nombre === select) || {};
      const res = { _id, nombre, descripcion };
      setSelectCombo(res);
    }
  }, []);

  const listAvailableDrinks = () => {
    const updatedExtras = extras.filter(extra => {
      if (extra.categoria?.toLowerCase() !== 'bebidas') return false;
      const matchingDrink = drinks.find(drink => drink._id === extra._id);
      return !(matchingDrink && matchingDrink.available === false);
    });
    return updatedExtras;
  };

  const updatedDesserts = extras.filter(extra => extra.categoria?.toLowerCase() === 'postres');

  const addItems = value => {
    const category = value.categoria?.toLowerCase() || '';
    if (category === 'bebidas') {
      dispatch(addDrinksPromo(value));
    } else if (category === 'postres') {
      dispatch(addPostresPromo(value));
    } else {
      dispatch(addProductPromo(value));
    }
  };

  const decrementItems = value => {
    const category = value.categoria?.toLowerCase() || '';
    if (category === 'bebidas') {
      dispatch(decrementDrinksPromo(value));
    } else if (category === 'postres') {
      dispatch(decrementPostresPromo(value));
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

  const setQuantityPostres = value => {
    dispatch(setQuantityDemandedPostres(value));
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
        products.filter(item => item.categoria?.toLowerCase() === "promociones" || item.categoria?.toLowerCase() === "combos").find(item => item.nombre === e.target.value) || {};
      const res = { _id, nombre, descripcion };
      setSelectCombo(res);
    }
  };

  const postresQuantity = _id => {
    const pre = postres?.find(item => item._id === _id);
    return pre?.cantidad ? pre.cantidad : 0;
  };

  const renderQuantityControls = (itemId, itemData, currentQty, isDecrementDisabled, isIncrementDisabled, onIncrement, onDecrement) => {
    return (
      <div className="flex items-center gap-3 bg-neutral-100 p-1 rounded-2xl">
        <AnimatePresence mode="wait">
          {currentQty > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3"
            >
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center bg-neutral-800 rounded-xl text-white shadow-sm active:scale-90 transition-transform disabled:opacity-50"
                onClick={onDecrement}
                disabled={isDecrementDisabled}
              >
                <MinusSignIcon width={16} height={16} color="white" />
              </button>
              <span className="font-extrabold text-neutral-800 text-sm w-4 text-center font-montserrat">
                {currentQty}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center bg-neutral-800 rounded-xl text-white shadow-md active:scale-95 transition-transform disabled:opacity-30 disabled:grayscale"
          onClick={onIncrement}
          disabled={isIncrementDisabled}
        >
          <Add01Icon width={18} height={18} color="white" />
        </button>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {(nombre === "Combo 4" || nombre === "Combo 5") && (
        <div className="space-y-3 mb-6">
          {["Combo 1", "Combo 2"].map(comboName => (
            <label key={comboName} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${select === comboName ? 'border-neutral-800 bg-neutral-50 shadow-sm' : 'border-neutral-100 bg-white hover:border-neutral-200'}`}>
              <input
                type="radio"
                value={comboName}
                name="combo"
                onChange={onChangeValue}
                checked={select === comboName}
                className="w-5 h-5 accent-neutral-900"
              />
              {products
                ?.filter(item => item.nombre === comboName)
                .map(producto => (
                  <div key={producto._id} className="flex-1">
                    <h3 className="text-sm font-bold text-neutral-800 font-montserrat">{producto.nombre}</h3>
                    <p className="text-neutral-400 text-[11px] font-montserrat font-medium">{producto.descripcion}</p>
                  </div>
                ))}
            </label>
          ))}
        </div>
      )}

      {(addEmpanadas === "no" && addExtras === "no") && (
        <div className="flex justify-between items-center py-4 border-b border-neutral-100 last:border-0">
          <div className="font-montserrat text-neutral-800 text-lg font-bold">
            <h2>{nombre}</h2>
          </div>
          {renderQuantityControls(
            _id,
            { _id, nombre, categoria, descripcion, precio, addEmpanadas },
            productQuantity(_id),
            false,
            false,
            () => {
              addItems({ _id, nombre, categoria, descripcion, precio, addEmpanadas });
              setQuantity(quantityDemanded + 1);
            },
            () => {
              decrementItems({ _id, nombre, categoria, descripcion, precio, addEmpanadas });
              setQuantity(quantityDemanded - 1);
            }
          )}
        </div>
      )}

      {(addExtras === "si" || addPostres === "si" || addEmpanadas === "si") && (
        <div className="space-y-6">
          {addExtras === "si" && (
            <div className="font-montserrat">
              <div className={`mb-6 p-2 rounded-2xl w-full border text-center transition-all ${quantityDemandedDrinks < 1 ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-neutral-300'}`}>
                <p className="text-sm font-montserrat text-neutral-500">
                  {quantityDemandedDrinks < 1 ? (
                    <span className="text-emerald-600 font-bold">¡Bebidas completadas!</span>
                  ) : (
                    <>Seleccioná <span className="text-base">{quantityDemandedDrinks}</span> bebidas más</>
                  )}
                </p>
              </div>
              <div className="divide-y divide-neutral-100">
                {listAvailableDrinks()?.map((drink) => (
                  <div key={drink._id} className="flex justify-between items-center py-4 first:pt-0">
                    <h3 className="text-sm font-bold text-neutral-800 font-montserrat">{drink.nombre}</h3>
                    {renderQuantityControls(
                      drink._id,
                      drink,
                      drinksQuantity(drink._id),
                      false,
                      quantityDemandedDrinks === 0,
                      () => {
                        setQuantityDrinks(quantityDemandedDrinks - 1);
                        addItems({ ...drink, categoria: "bebidas", precio: 0 });
                      },
                      () => {
                        setQuantityDrinks(quantityDemandedDrinks + 1);
                        decrementItems({ ...drink, categoria: "bebidas", precio: 0 });
                      }
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {addPostres === "si" && (
            <div className="font-montserrat">
              <div className={`mb-6 p-2 rounded-2xl w-full border text-center transition-all ${quantityDemandedPostres < 1 ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-neutral-300'}`}>
                <p className="text-sm font-montserrat text-neutral-500">
                  {quantityDemandedPostres < 1 ? (
                    <span className="text-emerald-600 font-bold">¡Postres completados!</span>
                  ) : (
                    <>Seleccioná <span className=" text-base">{quantityDemandedPostres}</span> postres más</>
                  )}
                </p>
              </div>
              <div className="divide-y divide-neutral-100">
                {updatedDesserts?.map((dessert) => (
                  <div key={dessert._id} className="flex justify-between items-center py-4 first:pt-0">
                    <h3 className="text-sm font-bold text-neutral-800 font-montserrat">{dessert.nombre}</h3>
                    {renderQuantityControls(
                      dessert._id,
                      dessert,
                      postresQuantity(dessert._id),
                      false,
                      quantityDemandedPostres === 0,
                      () => {
                        setQuantityPostres(quantityDemandedPostres - 1);
                        addItems({ ...dessert, categoria: "Postres", precio: 0 });
                      },
                      () => {
                        setQuantityPostres(quantityDemandedPostres + 1);
                        decrementItems({ ...dessert, categoria: "Postres", precio: 0 });
                      }
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {addEmpanadas === "si" && (
            <div className="font-montserrat">
              <div className={`mb-6 p-2 rounded-2xl w-full border text-center transition-all ${quantityDemanded < 1 ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-neutral-300'}`}>
                <p className="text-sm font-montserrat text-neutral-500">
                  {quantityDemanded < 1 ? (
                    <span className="text-emerald-600 font-bold">¡Empanadas completadas!</span>
                  ) : (
                    <>Seleccioná <span className="text-base">{quantityDemanded}</span> empanadas más</>
                  )}
                </p>
              </div>
              <div className="divide-y divide-neutral-100">
                {products
                  ?.filter(item => item.categoria?.toLowerCase() === "empanadas" && item.available === true)
                  ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((empanada) => (
                    <div key={empanada._id} className="flex justify-between items-center py-4 first:pt-0">
                      <div>
                        <h3 className="text-sm font-bold text-neutral-800 font-montserrat">{empanada.nombre}</h3>
                        {empanada.precioExtra > 0 && <p className="text-[10px] font-bold text-red-500 uppercase mt-0.5">+ ${empanada.precioExtra} extra</p>}
                      </div>
                      {renderQuantityControls(
                        empanada._id,
                        empanada,
                        productQuantity(empanada._id),
                        false,
                        quantityDemanded < 1,
                        () => {
                          setQuantity(quantityDemanded - 1);
                          addItems({ ...empanada, categoria: "empanadas" });
                        },
                        () => {
                          setQuantity(quantityDemanded + 1);
                          decrementItems({ ...empanada, categoria: "empanadas" });
                        }
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
