import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import cloudinaryImage from "utils/cloudinaryImage";
import Layout from "components/admin/layout";
import { createProduct } from "services/fetchData";
import { useRouter } from "next/router";
import ModalMessage from "components/modalMessage";

export default function Create() {
  const [renderProducts, setRenderProductos] = useState("pizzas");
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({ title: "", description: "", status: true });
  const router = useRouter();

  const handleCloseModal = () => {
    setShowModal(false);
    return router.push("list");
  };

  const handleCategoryChange = event => {
    const cat = event.target.value;
    setRenderProductos(cat);
  };

  const categorias = ['pizzas', 'empanadas', 'promociones', 'bebidas', 'extras']

  return (
    <Layout>
      {showModal && <ModalMessage showModal={showModal} handleClose={handleCloseModal} info={info} />}

      <section className="w-full flex justify-start items-start h-screen">
        <div className="w-full  p-2 md:p-10">
          <h1 className="text-xl text-center md:text-4xl font-poppins font-semibold text-zinc-800 my-4">
            ¡Producto nuevo!
          </h1>
          <p>Seleccione una categoria</p>
          <div className="w-full lg:w-1/4 h-10 mb-5 outline-none  focus:outline-none focus:shadow-outline focus:ring-white focus:right-0-0">
            <select
              onChange={handleCategoryChange}
              className="h-10  font-poppins focus:ring-0 border-gray-300 focus:ring-gray-200  text-gray-400 text-sm rounded-lg  block w-full p-2.5 "
            >
              {categorias.map(item => (
                <option key={item} value={item} className="text-sm font-poppins font-medium">
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="flex overflow-x-scroll font-poppins flexp justify-start items-start space-x-1 w-full p-2 my-2">
            <style jsx>
              {`
                .flexp::-webkit-scrollbar-thumb {
                  background: #ffffff;
                  border-radius: 20px;
                }

                .flexp::-webkit-scrollbar {
                  height: 0px;
                }
              `}
            </style>
            <div>
              <button
                onClick={() => setRenderProductos("empanadas")}
                className={
                  renderProducts !== "empanadas"
                    ? "w-52  font-medium text-gray-400"
                    : "w-52 font-medium border-b-red-600 border-b "
                }
              >
                Canastitas & Empanadas
              </button>
            </div>
            <div>
              <button
                onClick={() => setRenderProductos("pizzas")}
                className={
                  renderProducts !== "pizzas"
                    ? "w-48  font-semibold text-gray-400"
                    : "w-48  font-semibold border-b-red-600 border-b  "
                }
              >
                Pizzas
              </button>
            </div>

            <div>
              <button
                onClick={() => setRenderProductos("promociones")}
                className={
                  renderProducts !== "promociones"
                    ? "w-48  font-semibold text-gray-400"
                    : "w-48 font-semibold border-b-red-600 border-b   "
                }
              >
                Promociones
              </button>
            </div>
            <div>
              <button
                onClick={() => setRenderProductos("bebidas")}
                className={
                  renderProducts !== "bebidas"
                    ? "w-48  font-semibold text-gray-400"
                    : "w-48 font-semibold border-b-red-600 border-b  "
                }
              >
                Bebidas
              </button>
            </div>
          </div> */}
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
                    setInfo({
                      title: "Creación exitosa",
                      description: "Se guardaron los datos correctamente!",
                      status: 'success',
                    });
                    setShowModal(true);
                  }
                  resetForm();
                })
                .catch(() => {
                  setInfo({
                    title: "Error en la carga",
                    description: "No pudimos guardar los datos, intente nuevamente.",
                    status: 'error',
                  });
                  setShowModal(true);
                });
            }}
            enableReinitialize
          >
            {({ setFieldValue, values, handleChange }) => (
              <Form
                className="border border-gray-300 p-4 rounded-md"
              >
                <div className="md:grid  md:grid-cols-2 mt-4 justify-items-end gap-4 space-y-4 md:space-y-0">
                  <div className="w-full mx-auto">
                    <label className="block  text-sm  text-gray-400 font-poppins font-medium">
                      Nombre del producto
                      <Field
                        id="nombre"
                        name="nombre"
                        className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
                      />
                    </label>
                  </div>

                  <div className=" hidden w-full mx-auto">
                    <label className="block  text-sm  text-gray-400 font-poppins font-medium">
                      Categoria
                      <Field
                        id="categoria"
                        name="categoria"
                        className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
                      />
                    </label>
                  </div>
                  {renderProducts !== 'extras' && (
                    <div className=" w-full mx-auto ">
                      <label className="block text-sm  text-gray-400 font-poppins font-medium">
                        Descripcion
                        <Field
                          id="descripcion"
                          name="descripcion"
                          className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
                        />
                      </label>
                    </div>

                  )}

                  {renderProducts !== "pizzas" && (
                    <div className=" w-full mx-auto">
                      <label className="block  text-sm  text-gray-400 font-poppins font-medium">
                        Precio
                        <Field
                          id="precio"
                          name="precio"
                          className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
											  rounded-md shadow   focus:border-gray-200"
                        />
                      </label>
                    </div>
                  )}

                  {renderProducts === "empanadas" && (
                    <>
                      <div className=" w-full mx-auto">
                        <p className="block  text-sm  text-gray-400 font-poppins font-medium">Formato</p>
                        <div
                          role="group"
                          aria-labelledby="my-radio-group"
                          className="w-full text-base  text-gray-400 font-poppins font-medium flex justify-center items-center h-10 gap-10"
                        >
                          <label>
                            <Field type="radio" name="formato" value="canastita" className="mx-5" />
                            Canastita
                          </label>
                          <label>
                            <Field type="radio" name="formato" value="empanada" className="mx-5" />
                            Empanada
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  {renderProducts === "pizzas" && (
                    <>
                      <div className=" w-full mx-auto">
                        <label className="block  text-sm  text-gray-400 font-poppins font-medium">
                          Precio gigante
                          <Field
                            id="precioPizza.gigante"
                            name="precioPizza.gigante"
                            className=" p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
											  rounded-md shadow   focus:border-gray-200"
                          />
                        </label>
                      </div>
                      <div className=" w-full mx-auto">
                        <label className="block  text-sm  text-gray-400 font-poppins font-medium">
                          Precio mediana
                          <Field
                            id="precioPizza.mediana"
                            name="precioPizza.mediana"
                            className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
                          />
                        </label>
                      </div>
                      <div className=" w-full mx-auto">
                        <label className="block  text-sm  text-gray-400 font-poppins font-medium">
                          Precio chica
                          <Field
                            id="precioPizza.chica"
                            name="precioPizza.chica"
                            className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
                          />
                        </label>
                      </div>
                    </>
                  )}
                  {renderProducts !== 'extras' && (
                    <div className=" w-full mx-auto">
                      <label className="block  text-sm  text-gray-400 font-poppins font-medium">
                        Cargar Imagen
                        <input
                          name="imagen"
                          type="file"
                          onChange={e => cloudinaryImage(e.target, setFieldValue)}
                          className="w-full h-10 px-3 py-2 text-sm leading-tight text-gray-700 border-gray-200 
                  									rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
                        />
                      </label>
                    </div>
                  )}
                  {renderProducts === "promociones" && (
                    <>
                      <div className="w-full mx-auto">
                        <div className=" w-full mx-auto">
                          <p className="block  text-sm  text-gray-400 font-poppins font-medium">¿La promo cuenta con empanadas?</p>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="p-2 w-full text-base  text-gray-400 font-poppins font-medium flex justify-center items-center h-10 gap-10"
                          >
                            <label>
                              <Field type="radio" name="addEmpanadas" value="si" className="mx-5" />
                              Si
                            </label>
                            <label>
                              <Field type="radio" name="addEmpanadas" value="no" className="mx-5" />
                              No
                            </label>
                          </div>
                        </div>
                        {values.addEmpanadas === "si" && (
                          <div className=" w-full mx-auto">
                            <label className="block  text-sm  text-gray-400 font-poppins font-medium">
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
                          <p className="block  text-sm  text-gray-400 font-poppins font-medium">¿La promo cuenta con Pizza?</p>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="p-2 w-full text-base  text-gray-400 font-poppins font-medium flex justify-center items-center h-10 gap-10"
                          >
                            <label>
                              <Field type="radio" name="addPizzas" value="si" className="mx-5" />
                              Si
                            </label>
                            <label>
                              <Field type="radio" name="addPizzas" value="no" className="mx-5" />
                              No
                            </label>
                          </div>
                        </div>
                        {values.addPizzas === "si" && (
                          <div className=" w-full mx-auto">
                            <label className="block  text-sm  text-gray-400 font-poppins font-medium">
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
                    className="w-44 h-12 col-start-2
                       						 rounded-md  text-sm 
                       						 border text-white bg-red-600 font-normal font-poppins hover:bg-red-500 translate-x-1"
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

export async function getServerSideProps(context) {
  const { req, res } = context;

  const token = req.headers.cookie?.includes("token") || req.cookies.token;
  if (!token) {
    res.setHeader("location", "/admin/auth/login"); // Redirigir al usuario a la página de inicio de sesión
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { props: {} };
}
