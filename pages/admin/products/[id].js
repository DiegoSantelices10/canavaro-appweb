/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import cloudinaryImage from "utils/cloudinaryImage";
import Layout from "components/admin/layout";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/router";
import { getProducts, updateProduct } from "services/fetchData";
import { IoChevronBack } from "react-icons/io5";

export default function Update({ data }) {
  const [renderProducts, setRenderProductos] = useState("empanadas");
  const [productRender, setProductRender] = useState({});
  const router = useRouter();

  useEffect(() => {
    setProductRender(data);
    setRenderProductos(data?.categoria);
  }, []);

  const modelProducto = value => {
    const {
      nombre,
      descripcion,
      categoria,
      imagen,
      cantidadMaxima,
      precio,
      isCantidad,
      precioExtra,
      precioPizza,
      addEmpanadas,
      addPizzas,
      tamanio,
      formato,
    } = value;
    let model;
    if (value.categoria === "promociones") {
      model = {
        nombre,
        descripcion,
        categoria,
        imagen,
        cantidadMaxima,
        precio,
        addEmpanadas,
        addPizzas,
        tamanio,
      };
    }
    if (categoria === "pizzas") {
      model = {
        nombre,
        descripcion,
        categoria,
        imagen,
        precioPizza,
      };
    }
    if (categoria === "empanadas") {
      model = {
        nombre,
        descripcion,
        categoria,
        precioExtra,
        imagen,
        precio,
        formato,
      };
    }
    if (categoria === "bebidas") {
      model = {
        nombre,
        descripcion,
        categoria,
        imagen,
        precio,
      };
    }

    if (categoria === "porciones") {
      model = {
        nombre,
        descripcion,
        categoria,
        imagen,
        precio,
      };
    }

    if (categoria === "extras") {
      model = {
        nombre,
        categoria,
        isCantidad,
        imagen,
        precio,
      };
    }

    return model;
  };

  const backNavigate = () => {
    router.back()
  }

  return (
    <Layout>
      <section className="w-full flex justify-start items-start h-screen">
        <Toaster />

        <div className="w-full  p-2 mt-10">
          <div className="flex  justify-center relative items-center">
            <button onClick={backNavigate} className="absolute left-2 self-start items-start">
              <IoChevronBack className="text-gray-900" size={25} />
            </button>
            <h1 className="text-xl text-center md:text-3xl font-poppins font-semibold text-zinc-800">
              ¡Actualizar producto!
            </h1>
          </div>

          <p className="font-poppins text-base font-medium mt-5 mb-2">Categoria: <span className="font-normal text-gray-500">{data.categoria}</span></p>

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
              isCantidad: productRender?.isCantidad || "",
              imagen: productRender?.imagen || "",
              cantidadMaxima: productRender?.cantidadMaxima || "",
              addEmpanadas: productRender?.addEmpanadas || "",
              formato: productRender?.formato || "",
              addPizzas: productRender?.addPizzas || "",
              tamanio: productRender?.tamanio || "",
            }}
            onSubmit={async (values, { resetForm }) => {
              if (values.imagen.public_id) {
                const model = modelProducto({ ...values, imagen: "" });
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
                const model = modelProducto(values);
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
              }
            }}
            enableReinitialize
          >
            {({ setFieldValue, values, handleChange }) => (
              <Form
                className="border border-gray-200 p-4  rounded-xl"
              >
                <div className="md:grid  md:grid-cols-2  justify-items-end gap-4 space-y-2 lg:space-y-0 md:space-y-0">
                  <div className="w-full mx-auto">
                    <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                      Nombre del producto
                      <Field
                        id="nombre"
                        name="nombre"
                        className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-xl  focus:border-gray-200"
                      />
                    </label>
                  </div>

                  <div className=" hidden w-full mx-auto">
                    <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                      Categoria
                      <Field
                        id="categoria"
                        name="categoria"
                        className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-xl   focus:border-gray-200"
                      />
                    </label>
                  </div>
                  {renderProducts !== 'extras' && (
                    <div className=" w-full mx-auto ">
                      <label className="block text-sm  text-slate-400 font-poppins font-normal">
                        Descripcion
                        <Field
                          id="descripcion"
                          name="descripcion"
                          className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-xl   focus:border-gray-200"
                        />
                      </label>
                    </div>
                  )}

                  {renderProducts !== "pizzas" && (
                    <div className=" w-full mx-auto">
                      <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                        Precio
                        <Field
                          id="precio"
                          name="precio"
                          className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
											  rounded-xl   focus:border-gray-200"
                        />
                      </label>
                    </div>
                  )}

                  {renderProducts === "empanadas" && (
                    <>
                      <div className=" w-full mx-auto">
                        <p className="block  text-sm  text-slate-400 font-poppins font-normal">Formato</p>
                        <div
                          role="group"
                          aria-labelledby="my-radio-group"
                          className="w-full text-base  text-slate-400 font-poppins font-normal flex justify-center items-center h-10 gap-10"
                        >
                          <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                            <Field type="radio" name="formato" value="canastita" className="mx-5" />
                            Canastita
                          </label>
                          <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                            <Field type="radio" name="formato" value="empanada" className="mx-5" />
                            Empanada
                          </label>
                        </div>
                      </div>
                      <div className=" w-full mx-auto">
                        <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                          Precio Extra <span className="text-gray-400 font-light text-xs">se le suma al precio actual de la unidad</span>
                          <Field
                            id="precioExtra"
                            name="precioExtra"
                            className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
											                  rounded-xl  focus:border-gray-200"
                          />
                        </label>
                      </div>
                    </>
                  )}
                  {renderProducts === "pizzas" && (
                    <>
                      <div className=" w-full mx-auto">
                        <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                          Precio gigante
                          <Field
                            id="precioPizza.gigante"
                            name="precioPizza.gigante"
                            className=" p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
											  rounded-xl focus:border-gray-200"
                          />
                        </label>
                      </div>
                      <div className=" w-full mx-auto">
                        <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                          Precio mediana
                          <Field
                            id="precioPizza.mediana"
                            name="precioPizza.mediana"
                            className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-xl focus:border-gray-200"
                          />
                        </label>
                      </div>
                      <div className=" w-full mx-auto">
                        <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                          Precio chica
                          <Field
                            id="precioPizza.chica"
                            name="precioPizza.chica"
                            className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-xl focus:border-gray-200"
                          />
                        </label>
                      </div>
                    </>
                  )}
                  {renderProducts === "extras" && (
                    <div className=" w-full mx-auto">
                      <p className="block  text-sm  text-gray-400 font-poppins font-normal">Cantidad, si o no?</p>
                      <div
                        role="group"
                        aria-labelledby="my-radio-group"
                        className="w-full text-base  text-gray-400 font-poppins font-medium flex justify-center items-center h-10 gap-10"
                      >
                        <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                          <Field type="radio" name="isCantidad" value="si" className="mx-5" checked={values.isCantidad === 'si'} />
                          Si
                        </label>
                        <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                          <Field type="radio" name="isCantidad" value="no" className="mx-5" checked={values.isCantidad === 'no'} />
                          No
                        </label>
                      </div>
                    </div>
                  )}

                  <div className=" w-full mx-auto">
                    <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                      Cargar Imagen
                      <input
                        name="imagen"
                        type="file"
                        onChange={e => cloudinaryImage(e.target, setFieldValue)}
                        className="w-full h-10  mt-2  text-xs leading-tight text-gray-700 border-gray-200 
                  									 appearance-none focus:outline-none focus:shadow-outline
                                    file:bg-red-600 file:text-white file:border-none file:p-2 file:px-3 file:rounded-lg
                                    file:font-normal
                                    "
                      />
                    </label>
                  </div>
                  {renderProducts === "promociones" && (
                    <>
                      <div className="w-full mx-auto">
                        <div className=" w-full mx-auto">
                          <p className="block  text-sm  text-slate-400 font-poppins font-normal">¿La promo cuenta con empanadas?</p>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="p-2 w-full text-base  text-slate-400 font-poppins font-normal flex justify-center items-center h-10 gap-10"
                          >
                            <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                              <Field type="radio" name="addEmpanadas" value="si" className="mx-5" />
                              Si
                            </label>
                            <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                              <Field type="radio" name="addEmpanadas" value="no" className="mx-5" />
                              No
                            </label>
                          </div>
                        </div>
                        {values.addEmpanadas === "si" && (
                          <div className=" w-full mx-auto">
                            <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                              Ingresa la cantidad de empanadas
                              <Field
                                id="cantidadMaxima"
                                name="cantidadMaxima"
                                value={values.cantidadMaxima}
                                onChange={handleChange}
                                className=" p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
													                  rounded-md shadow   focus:border-gray-200"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      <div className="w-full mx-auto">
                        <div className=" w-full mx-auto">
                          <p className="block  text-sm  text-slate-400 font-poppins font-normal">¿La promo cuenta con Pizza?</p>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="p-2 w-full text-base  text-slate-400 font-poppins font-medium flex justify-center items-center h-10 gap-10"
                          >
                            <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                              <Field type="radio" name="addPizzas" value="si" className="mx-5" />
                              Si
                            </label>
                            <label className="block  text-sm  text-gray-400 font-poppins font-normal">
                              <Field type="radio" name="addPizzas" value="no" className="mx-5" />
                              No
                            </label>
                          </div>
                        </div>
                        {values.addPizzas === "si" && (
                          <div className=" w-full mx-auto">
                            <label className="block  text-sm  text-slate-400 font-poppins font-normal">
                              Ingresa el tamaño de la pizza
                              <Field
                                id="tamanio"
                                name="tamanio"
                                value={values.tamanio}
                                className=" p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
													  rounded-md shadow   focus:border-gray-200"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <button
                    className="w-48 h-12  col-start-2 rounded-xl  text-sm 
                       				border text-white bg-red-600 hover:bg-red-500 font-normal font-poppins"
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
