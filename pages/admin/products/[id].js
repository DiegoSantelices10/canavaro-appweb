/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import cloudinaryImage from "utils/cloudinaryImage";
import toast from "react-hot-toast";

import { useRouter } from "next/router";
import { getProducts, updateProduct } from "services/fetchData";
import Layout from "components/Admin/Layout";
import HeaderTitle from "components/HeaderTitle";
import ControllerInput from "components/ControllerInput";
import MultiSelect from "components/MultiSelect";
import useDrinks from "Hooks/useDrinks";


const Update = ({ data }) => {
  const [renderProducts, setRenderProductos] = useState("empanadas");
  const [productRender, setProductRender] = useState({});
  const router = useRouter();
  const { drinks } = useDrinks();


  useEffect(() => {
    setProductRender(data);
    setRenderProductos(data?.categoria);
  }, []);

  return (
    <Layout>
      <HeaderTitle title="Editar Producto" isBack />
      <section className="w-full flex justify-start items-start h-screen">
        <div className="w-full space-y-4 pt-4">
          <p className="pl-2 font-montserrat text-base font-medium">Categoria: <span className="font-normal text-gray-500">{data.categoria}</span></p>
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
            }}
            onSubmit={async (values, { resetForm }) => {
              const filteredValues = Object.fromEntries(
                Object.entries(values).filter(([key, value]) => {
                  if (typeof value === 'object' && value !== null) {
                    // Si es un objeto anidado, verificar los valores internos
                    return Object.values(value).some(v => v !== "");
                  }
                  return value !== "";
                })
              );
              if (values.imagen.public_id) {
                const model = { ...filteredValues, imagen: "" };
                await updateProduct(data._id, model)
                  .then(res => {
                    if (res.success) {
                      toast.success('Producto actualizado!')
                    }
                    router.push("list");
                    resetForm();
                  })
                  .catch(() => {
                    toast.error('Hubo error al cargar los datos!')
                  });
              } else {

                await updateProduct(data._id, filteredValues)
                  .then(res => {
                    if (res.success) {
                      toast.success('Producto actualizado!')
                    }
                    router.push("list");
                    resetForm();
                  })
                  .catch(() => {
                    toast.error('Hubo error al cargar los datos!')
                  });
              }
            }}
            enableReinitialize
          >
            {({ setFieldValue, values, handleChange }) => (
              <Form
                className="md:border md:border-gray-200 md:p-4  md:rounded-lg"
              >
                <div className="md:grid  md:grid-cols-2 lg:grid-cols-3 mt-4  gap-8 space-y-4 md:space-y-0">
                  <ControllerInput
                    label="Nombre del producto"
                    name="nombre"
                  />

                  <div className="hidden w-full mx-auto">
                    <label className="block text-sm text-gray-700 font-montserrat font-normal">
                      Categoria
                      <Field
                        id="categoria"
                        name="categoria"
                        className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-lg    focus:border-gray-200"
                      />
                    </label>
                  </div>
                  {renderProducts !== 'extras' && (
                    <ControllerInput
                      label="Descripción"
                      name="descripcion"
                    />

                  )}

                  {renderProducts !== "pizzas" && (
                    <ControllerInput
                      label="Precio"
                      name="precio"
                    />
                  )}

                  {renderProducts === "empanadas" && (
                    <>
                      <div className=" w-full mx-auto">
                        <label className="block  text-xs  text-gray-900 font-montserrat font-normal">
                          <span className="font-semibold">Precio Extra</span>
                          <span className="ml-2 text-gray-900 font-normal text-xs">se le suma al precio actual de la unidad</span>
                          <Field
                            id="precioExtra"
                            name="precioExtra"
                            className="p-2 w-full h-10  text-sm leading-tight text-gray-900  border-gray-200 border
											                  rounded-lg  focus:border-gray-300 focus:ring-0"
                          />
                        </label>
                      </div>
                      <div className=" w-full mx-auto">
                        <p className="block text-xs text-gray-900 font-montserrat font-semibold">Formato</p>
                        <div
                          role="group"
                          aria-labelledby="my-radio-group"
                          className="w-full text-xs  text-gray-900 font-montserrat font-semibold flex justify-center items-center h-10 gap-10"
                        >
                          <label className="block  text-xs  text-gray-900 font-montserrat">
                            <Field type="radio" name="formato" value="canastita" className="mx-5" />
                            Canastita
                          </label>
                          <label className="block  text-xs  text-gray-900 font-montserrat ">
                            <Field type="radio" name="formato" value="empanada" className="mx-5" />
                            Empanada
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {renderProducts === "pizzas" && (
                    <>
                      <ControllerInput
                        label="Precio gigante"
                        name='precioPizza.gigante'
                      />
                      <ControllerInput
                        label="Precio mediana"
                        name='precioPizza.mediana'
                      />
                      <ControllerInput
                        label="Precio chica"
                        name='precioPizza.chica'
                      />
                    </>
                  )}

                  {renderProducts === "extras" && (
                    <div className=" w-full mx-auto">
                      <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">Cantidad, si o no?</p>
                      <div
                        role="group"
                        aria-labelledby="my-radio-group"
                        className="w-full text-base  text-gray-900 font-montserrat font-semibold flex justify-center items-center h-10 gap-10"
                      >
                        <label className="block  text-sm  text-gray-900 font-montserrat font-semibold">
                          <Field type="radio" name="isCantidad" value="si" className="mx-5" />
                          Si
                        </label>
                        <label className="block  text-sm  text-gray-900 font-montserrat font-semibold">
                          <Field type="radio" name="isCantidad" value="no" className="mx-5" />
                          No
                        </label>
                      </div>
                    </div>
                  )}

                  {
                    renderProducts !== "bebidas" &&
                    renderProducts !== "empanadas" &&
                    renderProducts !== "pizzas" &&
                    renderProducts !== "extras" &&
                    renderProducts !== "porciones"
                    && (
                      <>
                        <div className="w-full mx-auto">
                          <div className=" w-full mx-auto">
                            <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">¿La promo cuenta con Bebidas?</p>
                            <div
                              role="group"
                              aria-labelledby="my-radio-group"
                              className="p-2 w-full text-xs  text-gray-900 font-montserrat font-semibold flex justify-center items-center h-10 gap-10"
                            >
                              <label>
                                <Field type="radio" name="addExtras" value="si" className="mx-3 focus:ring-0 focus:ring-white checked:text-red-500 hover:text-red-500  focus:text-red-500 " />
                                Si
                              </label>
                              <label>
                                <Field type="radio" name="addExtras" value="no" className="mx-3 focus:ring-0 focus:ring-white checked:text-red-500 hover:text-red-500  focus:text-red-500 " />
                                No
                              </label>
                            </div>
                          </div>
                          {values.addExtras === "si" && (
                            <div className=" w-full mx-auto space-y-4">
                              <ControllerInput
                                name='cantidadExtras'
                                type='number'
                                label='Ingresa la cantidad de bebidas'
                              />
                              <MultiSelect
                                values={values}
                                data={drinks}
                                label="Selecciona las bebidas disponibles"
                              />
                            </div>
                          )}
                        </div>

                        <div className="w-full mx-auto">
                          <div className=" w-full mx-auto">
                            <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">¿La promo cuenta con empanadas?</p>
                            <div
                              role="group"
                              aria-labelledby="my-radio-group"
                              className="p-2 w-full text-xs  text-gray-900 font-montserrat font-semibold flex justify-center items-center h-10 gap-10"
                            >
                              <label >
                                <Field type="radio" name="addEmpanadas" value="si" className="mx-3 focus:ring-0 focus:ring-white checked:text-red-500 hover:text-red-500  focus:text-red-500" />
                                Si
                              </label>
                              <label>
                                <Field type="radio" name="addEmpanadas" value="no" className="mx-3 focus:ring-0 focus:ring-white checked:text-red-500 hover:text-red-500  focus:text-red-500" />
                                No
                              </label>
                            </div>
                          </div>
                          {values.addEmpanadas === "si" && (
                            <div className=" w-full mx-auto">
                              <label className="block  text-xs  text-gray-900 font-montserrat font-semibold">
                                Ingresa la cantidad de empanadas
                                <Field
                                  id="cantidadMaxima"
                                  name="cantidadMaxima"
                                  value={values.cantidadMaxima}
                                  onChange={handleChange}
                                  className=" p-2 w-full h-10 focus:ring-0 focus:ring-white font-normal  text-sm leading-tight text-gray-900  border-gray-200 border
													                  rounded-lg focus:border-gray-200"
                                />
                              </label>
                            </div>
                          )}
                        </div>

                        <div className="w-full mx-auto">
                          <div className=" w-full mx-auto">
                            <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">¿La promo cuenta con Pizza?</p>
                            <div
                              role="group"
                              aria-labelledby="my-radio-group"
                              className="p-2 w-full text-xs  text-gray-900 font-montserrat font-semibold flex justify-center items-center h-10 gap-10"
                            >
                              <label>
                                <Field type="radio" name="addPizzas" value="si" className="mx-3 focus:ring-0 focus:ring-white checked:text-red-500 hover:text-red-500  focus:text-red-500" />
                                Si
                              </label>
                              <label>
                                <Field type="radio" name="addPizzas" value="no" className="mx-3 focus:ring-0 focus:ring-white checked:text-red-500 hover:text-red-500  focus:text-red-500" />
                                No
                              </label>
                            </div>
                          </div>
                          {values.addPizzas === "si" && (
                            <div className=" w-full mx-auto">
                              <label className="block  text-xs  text-gray-900 font-montserrat font-semibold">
                                Ingresa el tamaño de la pizza
                                <Field
                                  id="tamanio"
                                  name="tamanio"
                                  value={values.tamanio}
                                  className=" p-2 w-full h-10 font-normal focus:ring-0 focus:ring-white  text-sm leading-tight text-gray-900  border-gray-200 border
													                    rounded-lg focus:border-gray-200"
                                />
                              </label>
                            </div>
                          )}
                        </div>
                        {renderProducts !== "promociones" && (
                          <div className="w-full mx-auto">
                            <div className=" w-full mx-auto">
                              <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">¿Promo destacable?</p>
                              <div className=" flex justify-center items-center">
                                <label className="inline-flex items-center cursor-pointer">
                                  <Field
                                    name="destacable"
                                    type="checkbox"
                                    className="sr-only peer" />
                                  <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-200 
                                                  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                                                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:start-[3px] 
                                                  after:bg-white  after:border focus:outline-none focus:right-0 after:rounded-full 
                                                  after:h-3.5 after:w-3.5 after:transition-all  peer-checked:bg-red-500"></div>
                                </label>
                              </div>
                            </div>

                          </div>
                        )}

                      </>
                    )}
                </div>

                <div className="w-full block md:flex justify-between items-end mt-3 pb-5 md:pb-0">
                  <div className=" w-auto">
                    <label className="block  text-xs  text-gray-900 font-montserrat font-semibold">
                      Cargar Imagen
                      <input
                        name="imagen"
                        type="file"
                        onChange={e => cloudinaryImage(e.target, setFieldValue)}
                        className="w-full h-10 file:h-10  text-xs leading-tight text-gray-900 border-gray-200 
                  									 appearance-none focus:outline-none focus:shadow-outline
                                    file:bg-red-600 file:text-white file:border-none file:p-1 file:px-3 file:rounded-lg
                                    file:font-normal"
                      />
                    </label>
                  </div>
                  <button
                    className="w-full md:w-44 h-10 col-start-2 rounded-lg mt-6 md:mt-0  text-sm 
                                border text-white bg-red-600 font-normal font-montserrat hover:bg-red-500"
                    type="submit"
                  >
                    Actualizar Producto
                  </button>

                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
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