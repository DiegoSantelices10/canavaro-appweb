import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { createProduct } from "services/fetchData";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import ControllerInput from "components/ControllerInput";
import cloudinaryImage from "utils/cloudinaryImage";
import Layout from "components/Admin/Layout";
import useCategories from "Hooks/useCategories";
import Select from "components/Select";
import HeaderTitle from "components/HeaderTitle";
import useDrinks from "Hooks/useDrinks";
import MultiSelect from "components/MultiSelect";

const Create = () => {
  const [renderProducts, setRenderProductos] = useState("pizzas");
  const router = useRouter();

  const { categories } = useCategories();
  const { drinks } = useDrinks();


  const handleCategoryChange = value => {
    setRenderProductos(value);
  };

  return (
    <Layout>
      <Toaster />
      <section className="w-full space-y-8">
        <HeaderTitle title="Nuevo producto" isBack />

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
            extras: [],
            categoriaNueva: "",
            imagen: "",
            cantidadMaxima: "",
            formato: "",
            cantidadExtras: "",
            addEmpanadas: "no",
            addPizzas: "no",
            addExtras: "no",
            tamanio: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            if (values.categoriaNueva !== '') {
              values.categoria = values.categoriaNueva;
              values.categoriaNueva = '';
            }
            const filteredValues = Object.fromEntries(
              Object.entries(values).filter(([key, value]) => {
                if (typeof value === 'object' && value !== null) {
                  // Si es un objeto anidado, verificar los valores internos
                  return Object.values(value).some(v => v !== "");
                }
                return value !== "";
              })
            );

            await createProduct(filteredValues)
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
          }
          }
          enableReinitialize
        >
          {({ setFieldValue, values, handleChange }) => (
            <Form>
              <div className="grid gap-4 lg:flex lg:gap-8 items-end">
                <Select
                  label="Categoria"
                  data={categories}
                  handleChange={handleCategoryChange}
                  newOption
                />
                <ControllerInput
                  label="Categoria nueva"
                  name='categoriaNueva'
                  disabled={renderProducts !== 'categoria nueva'}
                />
              </div>
              <div
                className="md:border md:border-gray-200  md:p-4  md:rounded-lg mt-4"
              >
                <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:mt-4  justify-items-end gap-8 space-y-4 md:space-y-0">
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
                        <label className="block  text-xs  text-gray-900 font-montserrat font-semibold">
                          <span className="font-semibold">Precio extra</span>
                          <span className="text-gray-900 font-light text-xs ml-2">se le suma al precio actual de la unidad</span>
                          <Field
                            id="precioExtra"
                            name="precioExtra"
                            className="p-2 w-full h-10 font-normal  text-sm leading-tight text-gray-900  border-gray-200 border
											                  rounded-lg  focus:border-gray-300 focus:ring-0"
                          />
                        </label>
                      </div>
                      <div className=" w-full mx-auto">
                        <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">Formato</p>
                        <div
                          role="group"
                          aria-labelledby="my-radio-group"
                          className="w-full text-xs  text-gray-900 font-montserrat font-semibold flex justify-center items-center h-10 gap-10"
                        >
                          <label className="block  text-xs  text-gray-900 font-montserrat font-semibold">
                            <Field type="radio" name="formato" value="canastita" className="mx-5 focus:ring-0 focus:ring-white" />
                            Canastita
                          </label>
                          <label className="block  text-xs  text-gray-900 font-montserrat font-semibold">
                            <Field type="radio" name="formato" value="empanada" className="mx-5 focus:ring-0 focus:ring-white" />
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
                      <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">Cantidad</p>
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
                            <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">¿La promo cuenta con empanadas?</p>
                            <div
                              role="group"
                              aria-labelledby="my-radio-group"
                              className="p-2 w-full text-xs  text-gray-900 font-montserrat font-semibold flex justify-center items-center h-10 gap-10"
                            >
                              <label >
                                <Field type="radio" name="addEmpanadas" value="si" className="mx-3 focus:ring-0 focus:ring-white" />
                                Si
                              </label>
                              <label>
                                <Field type="radio" name="addEmpanadas" value="no" className="mx-3 focus:ring-0 focus:ring-white" />
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
                                  className=" p-2 w-full h-10  text-sm leading-tight text-gray-900  border-gray-200 border
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
                                <Field type="radio" name="addPizzas" value="si" className="mx-3 focus:ring-0 focus:ring-white" />
                                Si
                              </label>
                              <label>
                                <Field type="radio" name="addPizzas" value="no" className="mx-3 focus:ring-0 focus:ring-white" />
                                No
                              </label>
                            </div>
                          </div>
                          {values.addPizzas === "si" && (
                            <div className=" w-full mx-auto">
                              <label className="block  text-xs  text-gray-900 font-montserrat font-normal">
                                <span className="font-montserrat font-semibold">
                                  Ingresa el tamaño de la pizza
                                </span>
                                <Field
                                  id="tamanio"
                                  name="tamanio"
                                  value={values.tamanio}
                                  className=" p-2 w-full h-10  text-sm leading-tight text-gray-900  border-gray-200 border
													                    rounded-lg focus:border-gray-200"
                                />
                              </label>
                            </div>
                          )}
                        </div>

                        <div className="w-full mx-auto">
                          <div className=" w-full mx-auto">
                            <p className="block  text-xs  text-gray-900 font-montserrat font-semibold">¿La promo cuenta con Bebidas?</p>
                            <div
                              role="group"
                              aria-labelledby="my-radio-group"
                              className="p-2 w-full text-xs  text-gray-900 font-montserrat font-semibold flex justify-center items-center h-10 gap-10"
                            >
                              <label>
                                <Field type="radio" name="addExtras" value="si" className="mx-3 focus:ring-0 focus:ring-white" />
                                Si
                              </label>
                              <label>
                                <Field type="radio" name="addExtras" value="no" className="mx-3 focus:ring-0 focus:ring-white" />
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
                                data={drinks}
                                label="Selecciona las bebidas disponibles"
                              />
                            </div>
                          )}
                        </div>

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
                                  file:bg-red-600 file:text-white file:border-none file:p-2 file:px-3 file:rounded-lg
                                  file:font-normal"
                      />
                    </label>
                  </div>
                  <button
                    className="w-full md:w-44 h-10 col-start-2 rounded-lg mt-6 md:mt-0  text-sm 
                                border text-white bg-red-600 font-normal font-montserrat hover:bg-red-500"
                    type="submit"
                  >
                    Agregar Producto
                  </button>
                </div>
              </div>
            </Form>
          )
          }
        </Formik>
      </section>
    </Layout>
  );
}

export default Create;
