/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import cloudinaryImage from "utils/cloudinaryImage";
import Layout from "components/admin/layout";
import { createProduct } from "services/fetchData";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
export default function Create() {
	const [renderProducts, setRenderProductos] = useState("empanadas");
	const router = useRouter();
	return (
		<Layout>
			<section className="w-full bg-white">
				<div className="w-full lg:w-3/5 p-2 md:p-10">
					<h1 className="text-xl text-center md:text-3xl font-poppins font-extrabold text-zinc-800 my-4">
						¡Ingresa un producto nuevo!
					</h1>
					<div className="flex overflow-x-scroll flexp justify-between space-x-2 w-full p-2 my-2">
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
										? "w-52 rounded-3xl font-semibold text-gray-400"
										: "w-52 p-1 font-semibold bg-red-500  text-white rounded-3xl"
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
										? "w-32 rounded-3xl font-semibold text-gray-400"
										: "w-32 p-1 font-semibold bg-red-500 text-white rounded-3xl"
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
										? "w-32 rounded-3xl font-semibold text-gray-400"
										: "w-32 font-semibold p-1 bg-red-500 text-white rounded-3xl"
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
										? "w-32 rounded-3xl font-semibold text-gray-400"
										: "w-32 font-semibold  p-1 text-white rounded-3xl bg-red-500"
								}
							>
								Bebidas
							</button>
						</div>
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
									console.log(res);
									if (res.message === "ok") {
										Swal.fire({
											icon: "success",

											title: "Creacion Exitosa!",
											confirmButtonColor: "#3085d6",
										});
									}
									resetForm();
									return router.push("list");
								})
								.catch(error => {
									if (error) {
										Swal.fire({
											icon: "error",
											title: "Oops...",
											text: "Something went wrong!",
										});
									}
								});
						}}
						enableReinitialize
					>
						{({ setFieldValue, values, handleChange }) => (
							<Form>
								<div className="md:grid  md:grid-cols-2 mt-4 justify-items-end gap-4 ">
									<div className="w-full mx-auto">
										<label className="block  text-sm  text-slate-400">
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
										<label className="block  text-sm  text-slate-400">
											Categoria
											<Field
												id="categoria"
												name="categoria"
												className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
											/>
										</label>
									</div>

									<div className=" w-full mx-auto ">
										<label className="block text-sm  text-slate-400">
											Descripcion
											<Field
												id="descripcion"
												name="descripcion"
												className="p-2 w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
											/>
										</label>
									</div>

									{renderProducts !== "pizzas" && (
										<div className=" w-full mx-auto">
											<label className="block  text-sm  text-slate-400">
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
												<p className="block  text-sm  text-slate-400">Formato</p>
												<div
													role="group"
													aria-labelledby="my-radio-group"
													className="w-full text-base  text-slate-400 flex justify-center items-center h-10 gap-10"
												>
													<label>
														<Field
															type="radio"
															name="formato"
															value="canastita"
															className="mx-5"
														/>
														Canastita
													</label>
													<label>
														<Field
															type="radio"
															name="formato"
															value="empanada"
															className="mx-5"
														/>
														Empanada
													</label>
												</div>
											</div>
										</>
									)}
									{renderProducts === "pizzas" && (
										<>
											<div className=" w-full mx-auto">
												<label className="block  text-sm  text-slate-400">
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
												<label className="block  text-sm  text-slate-400">
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
												<label className="block  text-sm  text-slate-400">
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

									<div className=" w-full mx-auto">
										<label className="block  text-sm  text-slate-400">
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
									{renderProducts === "promociones" && (
										<>
											<div className="w-full mx-auto">
												<div className=" w-full mx-auto">
													<p className="block  text-sm  text-slate-400">
														¿La promo cuenta con empanadas?
													</p>
													<div
														role="group"
														aria-labelledby="my-radio-group"
														className="p-2 w-full text-base  text-slate-400 flex justify-center items-center h-10 gap-10"
													>
														<label>
															<Field
																type="radio"
																name="addEmpanadas"
																value="si"
																className="mx-5"
															/>
															Si
														</label>
														<label>
															<Field
																type="radio"
																name="addEmpanadas"
																value="no"
																className="mx-5"
															/>
															No
														</label>
													</div>
												</div>
												{values.addEmpanadas === "si" && (
													<div className=" w-full mx-auto">
														<label className="block  text-sm  text-slate-400">
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
													<p className="block  text-sm  text-slate-400">
														¿La promo cuenta con Pizza?
													</p>
													<div
														role="group"
														aria-labelledby="my-radio-group"
														className="p-2 w-full text-base  text-slate-400 flex justify-center items-center h-10 gap-10"
													>
														<label>
															<Field
																type="radio"
																name="addPizzas"
																value="si"
																className="mx-5"
															/>
															Si
														</label>
														<label>
															<Field
																type="radio"
																name="addPizzas"
																value="no"
																className="mx-5"
															/>
															No
														</label>
													</div>
												</div>
												{values.addPizzas === "si" && (
													<div className=" w-full mx-auto">
														<label className="block  text-sm  text-slate-400">
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
										className="w-48 h-12 my-4 col-start-2
                       						 rounded-md  text-sm 
                       						 border text-white bg-red-500 font-semibold font-nunito"
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
