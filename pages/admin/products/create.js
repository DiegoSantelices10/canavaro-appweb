import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { createProduct } from "services/fetchData";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ControllerInput from "components/ControllerInput";
import cloudinaryImage from "utils/cloudinaryImage";
import Layout from "components/Admin/Layout";

export default function Create() {
  const [renderProducts, setRenderProductos] = useState("pizzas");
  const router = useRouter();



  const handleCategoryChange = event => {
    const cat = event.target.value;
    setRenderProductos(cat);
  };

  const categorias = ['pizzas', 'empanadas', 'promociones', 'porciones', 'bebidas', 'extras', 'soloEfectivo']

  return (
    <Layout>
      <section className="w-full flex justify-start items-start h-screen">
        <div className="w-full md:p-10">
          <h1 className="text-xl text-center md:text-4xl font-montserrat font-semibold text-zinc-800 my-4">
            ¡Producto nuevo!
          </h1>
          <p className="text-gray-400 font-normal text-xs font-montserrat">Seleccione una categoria</p>
          <div className="w-full lg:w-1/4 h-10 mb-5 outline-none  focus:outline-none focus:shadow-outline focus:ring-white focus:right-0-0">
            <select
              onChange={handleCategoryChange}
              className="h-10  font-montserrat focus:ring-0  border-gray-200 focus:border-gray-300  text-gray-400 text-sm rounded-lg  w-full p-2.5 "
            >
              {categorias.map(item => (
                <option key={item} value={item} className="text-sm font-montserrat font-medium">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <Formik
            initialValues={{
              nombre: "",
              descripcion: "",
              precio: "",
              precioPizza: {
                gigante: "",
                mediana: "",
                chica: "",
              },
              isCantidad: "",
              categoria: renderProducts,
              imagen: "",
              cantidadMaxima: "",
              addEmpanadas: "",
              formato: "",
              addPizzas: "",
              tamanio: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await createProduct(values)
                .then(res => {
                  if (res.message === "ok") {
                    toast.success('Creado con exito!')
                  }
                  router.push("list")
                  resetForm();
                })
                .catch(() => {
                  toast.error('Error al crear al producto.')
                });
            }}
            enableReinitialize
          >
            {({ setFieldValue, values, handleChange }) => (
              <Form
                className="border border-gray-200 p-4 rounded-lg"
              >
                <div className="md:grid  md:grid-cols-2 mt-4 justify-items-end gap-4 space-y-4 md:space-y-0">
                  <ControllerInput
                    label="Nombre del producto"
                    name="nombre"
                  />

                  <div className=" hidden w-full mx-auto">
                    <label className="block  text-sm  text-gray-400 font-montserrat font-normal">
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
                        <label className="block  text-xs  text-gray-400 font-montserrat font-normal">
                          Precio Extra <span className="text-gray-300 font-light text-xs">se le suma al precio actual de la unidad</span>
                          <Field
                            id="precioExtra"
                            name="precioExtra"
                            className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
											                  rounded-lg  focus:border-gray-300 focus:ring-0"
                          />
                        </label>
                      </div>
                      <div className=" w-full mx-auto">
                        <p className="block  text-xs  text-gray-400 font-montserrat font-normal">Formato</p>
                        <div
                          role="group"
                          aria-labelledby="my-radio-group"
                          className="w-full text-base  text-gray-400 font-montserrat font-medium flex justify-center items-center h-10 gap-10"
                        >
                          <label className="block  text-xs  text-gray-400 font-montserrat font-normal">
                            <Field type="radio" name="formato" value="canastita" className="mx-5" />
                            Canastita
                          </label>
                          <label className="block  text-xs  text-gray-400 font-montserrat font-normal">
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
                      <p className="block  text-xxs  text-gray-400 font-montserrat font-normal">Cantidad, si o no?</p>
                      <div
                        role="group"
                        aria-labelledby="my-radio-group"
                        className="w-full text-base  text-gray-400 font-montserrat font-medium flex justify-center items-center h-10 gap-10"
                      >
                        <label className="block  text-sm  text-gray-400 font-montserrat font-normal">
                          <Field type="radio" name="isCantidad" value="si" className="mx-5" />
                          Si
                        </label>
                        <label className="block  text-sm  text-gray-400 font-montserrat font-normal">
                          <Field type="radio" name="isCantidad" value="no" className="mx-5" />
                          No
                        </label>
                      </div>
                    </div>
                  )}

                  {(renderProducts === "promociones" || renderProducts === "soloEfectivo") && (
                    <>
                      <div className="w-full mx-auto">
                        <div className=" w-full mx-auto">
                          <p className="block  text-sm  text-gray-400 font-montserrat font-normal">¿La promo cuenta con empanadas?</p>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="p-2 w-full text-sm  text-gray-400 font-montserrat font-normal flex justify-center items-center h-10 gap-10"
                          >
                            <label >
                              <Field type="radio" name="addEmpanadas" value="si" className="mx-3" />
                              Si
                            </label>
                            <label>
                              <Field type="radio" name="addEmpanadas" value="no" className="mx-3" />
                              No
                            </label>
                          </div>
                        </div>
                        {values.addEmpanadas === "si" && (
                          <div className=" w-full mx-auto">
                            <label className="block  text-xs  text-gray-400 font-montserrat font-normal">
                              Ingresa la cantidad de empanadas
                              <Field
                                id="cantidadMaxima"
                                name="cantidadMaxima"
                                value={values.cantidadMaxima}
                                onChange={handleChange}
                                className=" p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
													                  rounded-lg focus:border-gray-200"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      <div className="w-full mx-auto">
                        <div className=" w-full mx-auto">
                          <p className="block  text-sm  text-gray-400 font-montserrat font-normal">¿La promo cuenta con Pizza?</p>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="p-2 w-full text-sm  text-gray-400 font-montserrat font-normal flex justify-center items-center h-10 gap-10"
                          >
                            <label>
                              <Field type="radio" name="addPizzas" value="si" className="mx-3" />
                              Si
                            </label>
                            <label>
                              <Field type="radio" name="addPizzas" value="no" className="mx-3" />
                              No
                            </label>
                          </div>
                        </div>
                        {values.addPizzas === "si" && (
                          <div className=" w-full mx-auto">
                            <label className="block  text-xs  text-gray-400 font-montserrat font-normal">
                              Ingresa el tamaño de la pizza
                              <Field
                                id="tamanio"
                                name="tamanio"
                                value={values.tamanio}
                                className=" p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
													  rounded-lg focus:border-gray-200"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <div className=" w-full mx-auto">
                    <label className="block  text-sm  text-slate-400 font-montserrat font-normal">
                      Cargar Imagen
                      <input
                        name="imagen"
                        type="file"
                        onChange={e => cloudinaryImage(e.target, setFieldValue)}
                        className="w-full h-10  mt-2  text-xs leading-tight text-gray-700 border-gray-200 
                  									 appearance-none focus:outline-none focus:shadow-outline
                                    file:bg-red-600 file:text-white file:border-none file:p-2 file:px-3 file:rounded-lg
                                    file:font-normal"
                      />
                    </label>
                  </div>


                  <button
                    className="w-44 h-12 col-start-2
                       						 rounded-lg  text-sm 
                       						 border text-white bg-red-600 font-normal font-montserrat hover:bg-red-500 translate-x-1"
                    type="submit"
                  >
                    Agregar Producto
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


