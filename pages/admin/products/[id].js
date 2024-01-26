/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import cloudinaryImage from "utils/cloudinaryImage";
import Layout from "components/admin/layout";
import { useRouter } from "next/router";
import { getProducts, updateProduct } from "services/fetchData";
import ModalMessage from "components/modalMessage";
import { IoChevronBack } from "react-icons/io5";

export default function Update({ data }) {
  const [renderProducts, setRenderProductos] = useState("empanadas");
  const [productRender, setProductRender] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({ title: "", description: "", status: true });
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
    if (categoria === "extras") {
      model = {
        nombre,
        categoria,
        precio,
      };
    }

    return model;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    return router.push("list");
  };

  const backNavigate = () => {
    router.back()
  }

  return (
    <Layout>
      {showModal && <ModalMessage showModal={showModal} handleClose={handleCloseModal} info={info} />}
      <section className="w-full flex justify-start items-start h-screen">

        <div className="w-full  p-2 mt-10">
          <div className="flex  justify-center relative items-center">
            <button onClick={backNavigate} className="absolute left-2 self-start items-start">
              <IoChevronBack className="text-gray-900" size={25} />
            </button>
            <h1 className="text-xl text-center md:text-3xl font-poppins font-semibold text-zinc-800">
              ¡Actualizar producto!
            </h1>
          </div>

          <p className="font-poppins text-lg font-light mt-5">Categoria: <span className="font-semibold">{data.categoria}</span></p>

          <Formik
            initialValues={{
              nombre: productRender?.nombre || "",
              descripcion: productRender?.descripcion || "",
              precio: productRender?.precio || "",
              precioPizza: {
                gigante: productRender?.precioPizza?.gigante || "",
                mediana: productRender?.precioPizza?.mediana || "",
                chica: productRender?.precioPizza?.chica || "",
              },
              categoria: renderProducts,
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
                      setInfo({
                        title: "Actualización exitosa",
                        description: "Se guardaron los datos correctamente!",
                        status: true,
                      });
                      setShowModal(true);
                    }
                    router.push("list");
                    resetForm();
                  })
                  .catch(() => {
                    setInfo({
                      title: "Error en la carga",
                      description: "No pudimos guardar los datos, intente nuevamente.",
                      status: false,
                    });
                    setShowModal(true);
                  });
              } else {
                const model = modelProducto(values);
                await updateProduct(data._id, model)
                  .then(res => {
                    if (res.success) {
                      setInfo({
                        title: "Actualización exitosa",
                        description: "Se guardaron los datos correctamente!",
                        status: true,
                      });
                      setShowModal(true);
                    }
                    router.push("list");
                    resetForm();
                  })
                  .catch(() => {
                    setInfo({
                      title: "Error en la carga",
                      description: "No pudimos guardar los datos, intente nuevamente.",
                      status: false,
                    });
                    setShowModal(true);
                  });
              }
            }}
            enableReinitialize
          >
            {({ setFieldValue, values, handleChange }) => (
              <Form
                className="border border-gray-300 p-4 rounded-md"
              >
                <div className="md:grid  md:grid-cols-2 mt-4 justify-items-end gap-4 space-y-2 lg:space-y-0 md:space-y-0">
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
                    <label className="block  text-sm  text-slate-400 font-poppins font-medium">
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
                      <label className="block text-sm  text-slate-400 font-poppins font-medium">
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
                      <label className="block  text-sm  text-slate-400 font-poppins font-medium">
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
                        <p className="block  text-sm  text-slate-400 font-poppins font-medium">Formato</p>
                        <div
                          role="group"
                          aria-labelledby="my-radio-group"
                          className="w-full text-base  text-slate-400 font-poppins font-medium flex justify-center items-center h-10 gap-10"
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
                        <label className="block  text-sm  text-slate-400 font-poppins font-medium">
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
                        <label className="block  text-sm  text-slate-400 font-poppins font-medium">
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
                        <label className="block  text-sm  text-slate-400 font-poppins font-medium">
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
                      <label className="block  text-sm  text-slate-400 font-poppins font-medium">
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
                          <p className="block  text-sm  text-slate-400 font-poppins font-medium">¿La promo cuenta con empanadas?</p>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="p-2 w-full text-base  text-slate-400 font-poppins font-medium flex justify-center items-center h-10 gap-10"
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
                            <label className="block  text-sm  text-slate-400 font-poppins font-medium">
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
                          <p className="block  text-sm  text-slate-400 font-poppins font-medium">¿La promo cuenta con Pizza?</p>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="p-2 w-full text-base  text-slate-400 font-poppins font-medium flex justify-center items-center h-10 gap-10"
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
                            <label className="block  text-sm  text-slate-400 font-poppins font-medium">
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
                    className="w-48 h-12  col-start-2
                       						 rounded-md  text-sm 
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
  const { req, res, query } = context;

  const id = query.id;
  const data = await productos.find(item => item._id === id);

  const token = req.headers.cookie?.includes("token") || req.cookies.token;
  if (!token) {
    res.setHeader("location", "/admin/auth/login"); // Redirigir al usuario a la página de inicio de sesión
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { props: { data } };
}
