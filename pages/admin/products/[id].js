/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import cloudinaryImage from "utils/cloudinaryImage";
import toast from "react-hot-toast";

import { useRouter } from "next/router";
import { getProducts, updateProduct } from "services/fetchData";
import Layout from "components/Admin/Layout";
import ControllerInput from "components/ControllerInput";
import MultiSelect from "components/MultiSelect";
import useDrinks from "Hooks/useDrinks";
import useDessert from "Hooks/useDessert";
import HeaderTitle from "components/HeaderTitle";


const Update = ({ data }) => {
  const [renderProducts, setRenderProductos] = useState("empanadas");
  const [productRender, setProductRender] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { drinks } = useDrinks();
  const { dessert } = useDessert();


  useEffect(() => {
    setProductRender(data);
    setRenderProductos(data?.categoria);
  }, []);

  return (
    <Layout>
      <div className="mb-10 lg:mb-14">
        <HeaderTitle title="Editar Producto" isBack />
        <p className="text-slate-500 mt-2 font-medium">Estás editando: <span className="font-bold text-slate-900">{data?.nombre}</span></p>
      </div>

      <Formik
        initialValues={{
          nombre: productRender?.nombre || "",
          descripcion: productRender?.descripcion || "",
          precio: productRender?.precio || "",
          precioExtra: productRender?.precioExtra || "",
          precioPizza: {
            gigante: productRender?.precioPizza?.gigante || "",
            mediana: productRender?.precioPizza?.mediana || "",
            chica: productRender?.precioPizza?.chica || "",
          },
          categoria: renderProducts,
          extras: productRender?.extras || [],
          addExtras: productRender?.addExtras || "no",
          cantidadExtras: productRender?.cantidadExtras || "",
          isCantidad: productRender?.isCantidad || "",
          destacable: productRender?.destacable || false,
          imagen: productRender?.imagen || "",
          cantidadMaxima: productRender?.cantidadMaxima || "",
          addEmpanadas: productRender?.addEmpanadas || "no",
          formato: productRender?.formato || "",
          addPizzas: productRender?.addPizzas || "no",
          tamanio: productRender?.tamanio || "",
          addPostres: productRender?.addPostres || "no",
          cantidadPostres: productRender?.cantidadPostres || "",
          postres: productRender?.postres || [],
        }}
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          const filteredValues = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return Object.values(value).some(v => v !== "");
              }
              return value !== "";
            })
          );

          try {
            if (values.imagen.public_id) {
              const model = { ...filteredValues, imagen: "" };
              const res = await updateProduct(data._id, model);
              if (res.success) toast.success('¡Producto actualizado!');
            } else {
              const res = await updateProduct(data._id, filteredValues);
              if (res.success) toast.success('¡Producto actualizado!');
            }
            router.push("list");
            resetForm();
          } catch (error) {
            toast.error('Hubo un error al actualizar el producto');
          } finally {
            setIsLoading(false);
          }
        }}
        enableReinitialize
      >
        {({ setFieldValue, values, handleChange }) => (
          <Form className="space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ControllerInput label="Nombre del Producto" name="nombre" />

                {renderProducts !== 'extras' && (
                  <ControllerInput label="Descripción" name="descripcion" />
                )}

                {renderProducts !== "pizzas" && (
                  <ControllerInput label="Precio" name="precio" type="number" />
                )}

                {renderProducts === "pizzas" && (
                  <>
                    <ControllerInput label="Precio Gigante" name='precioPizza.gigante' type="number" />
                    <ControllerInput label="Precio Mediana" name='precioPizza.mediana' type="number" />
                    <ControllerInput label="Precio Chica" name='precioPizza.chica' type="number" />
                  </>
                )}

                {renderProducts === "empanadas" && (
                  <div className="space-y-2 lg:col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Formato de Empanada</p>
                    <div className="flex gap-4 bg-slate-50 p-1.5 rounded-2xl w-fit">
                      {[
                        { value: 'canastita', label: 'Canastita' },
                        { value: 'empanada', label: 'Empanada' }
                      ].map(opt => (
                        <label key={opt.value} className={`
                          flex items-center gap-2 px-6 py-2 rounded-xl cursor-pointer transition-all
                          ${values.formato === opt.value ? "bg-white text-red-600 shadow-sm font-bold" : "text-slate-400 hover:text-slate-600"}
                        `}>
                          <Field type="radio" name="formato" value={opt.value} className="hidden" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {renderProducts === "extras" && (
                  <div className="space-y-2 lg:col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">¿Requiere Cantidad?</p>
                    <div className="flex gap-4 bg-slate-50 p-1.5 rounded-2xl w-fit">
                      {[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' }
                      ].map(opt => (
                        <label key={opt.value} className={`
                          flex items-center gap-2 px-6 py-2 rounded-xl cursor-pointer transition-all
                          ${values.isCantidad === opt.value ? "bg-white text-red-600 shadow-sm font-bold" : "text-slate-400 hover:text-slate-600"}
                        `}>
                          <Field type="radio" name="isCantidad" value={opt.value} className="hidden" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Media & Options */}
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Multimedia y Visibilidad</h3>
                <div className="space-y-6">
                  <div className="relative group">
                    <input
                      name="imagen"
                      type="file"
                      onChange={e => cloudinaryImage(e.target, setFieldValue)}
                      className="hidden"
                      id="file-update-input"
                    />
                    <label
                      htmlFor="file-update-input"
                      className="flex flex-col items-center justify-center w-full py-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] cursor-pointer group-hover:bg-slate-100 group-hover:border-slate-300 transition-all font-medium overflow-hidden"
                    >
                      <div className="relative w-32 h-32 mb-4">
                        <img
                          src={values.imagen?.url ? values.imagen.url : (typeof values.imagen === 'string' && values.imagen !== '' ? values.imagen : "/images/producto-sin-imagen.png")}
                          onError={(e) => { e.target.src = "/images/producto-sin-imagen.png" }}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-500 font-montserrat tracking-tight">Cambiar Imagen</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">Producto Destacado</span>
                      <span className="text-xs text-slate-400">Aparecerá en la sección principal</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <Field name="destacable" type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-checked:bg-red-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-sm"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Config */}
              {renderProducts !== "bebidas" &&
                renderProducts !== "empanadas" &&
                renderProducts !== "pizzas" &&
                renderProducts !== "extras" &&
                renderProducts !== "porciones" &&
                renderProducts !== "postres" &&
                renderProducts !== 'Postres' && (
                  <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-slate-900/10 text-white">
                    <h3 className="text-lg font-bold mb-6">Configuración de Promociones</h3>
                    <div className="space-y-6">
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        Si este producto es una promoción, configura aquí sus componentes adicionales.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: 'addExtras', label: 'Bebidas', data: drinks, countKey: 'cantidadExtras', countLabel: 'Cant. Bebidas', name: 'extras' },
                          { id: 'addEmpanadas', label: 'Empanadas', data: null, countKey: 'cantidadMaxima', countLabel: 'Cant. Empanadas' },
                          { id: 'addPizzas', label: 'Pizzas', data: null, countKey: 'tamanio', countLabel: 'Tamaño Pizza' },
                          { id: 'addPostres', label: 'Postres', data: dessert, countKey: 'cantidadPostres', countLabel: 'Cant. Postres', name: 'extras' }
                        ].map(opt => (
                          <div key={opt.id} className="p-6 bg-slate-800/50 rounded-[2rem] border border-slate-700/30 space-y-5 transition-all hover:bg-slate-800 hover:border-slate-600/50">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">{opt.label}</span>
                              <div className="flex gap-2 bg-slate-900/50 p-1 rounded-xl">
                                <label className={`px-4 py-1.5 text-[10px] rounded-lg cursor-pointer transition-all font-black uppercase tracking-widest ${values[opt.id] === 'si' ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "text-slate-500 hover:text-slate-300"}`}>
                                  <Field type="radio" name={opt.id} value="si" className="hidden" /> SÍ
                                </label>
                                <label className={`px-4 py-1.5 text-[10px] rounded-lg cursor-pointer transition-all font-black uppercase tracking-widest ${values[opt.id] === 'no' ? "bg-slate-700/50 text-slate-400" : "text-slate-500 hover:text-slate-300"}`}>
                                  <Field type="radio" name={opt.id} value="no" className="hidden" /> NO
                                </label>
                              </div>
                            </div>

                            {values[opt.id] === 'si' && (
                              <div className="space-y-4 pt-4 border-t border-slate-700/50 animate-in fade-in slide-in-from-top-2 duration-500">
                                <div className="space-y-2">
                                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1">{opt.countLabel}</label>
                                  <Field
                                    name={opt.countKey}
                                    className="w-full bg-slate-900/50 border-2 border-transparent focus:border-red-500/10 rounded-2xl py-3 px-4 text-sm font-bold text-white focus:ring-4 focus:ring-red-500/5 transition-all outline-none shadow-sm"
                                    placeholder="..."
                                  />
                                </div>
                                {opt.data && (
                                  <div className="pt-2">
                                    <MultiSelect
                                      values={values}
                                      data={opt.data}
                                      label={`Seleccionar ${opt.label}`}
                                      name={opt.name}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <div className="flex justify-end pt-6">
              <button
                disabled={isLoading}
                className="w-full md:w-64 py-5 rounded-[2rem] bg-slate-900 text-white font-black text-[11px] tracking-[0.15em] hover:bg-red-600 transition-all active:scale-95 shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 uppercase"
                type="submit"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                )}
                <span>Guardar Cambios</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const productos = await getProducts();
  const { query } = context;

  const id = query.id;
  const data = await productos.find(item => item._id === id);

  return { props: { data } };
}

export default Update;