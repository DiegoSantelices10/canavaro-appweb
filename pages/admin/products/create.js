import React, { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import cloudinaryImage from "utils/cloudinaryImage";
import Layout from "components/admin/layout";
export default function Create() {
	const [renderProducts, setRenderProductos] = useState("empanadas");

	return (
		<Layout>
			<div className="w-full lg:w-3/5 h-auto p-10 ">
				<h1 className=" text-3xl font-poppins font-extrabold text-zinc-800 my-4">¡Ingresa un producto nuevo!</h1>
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
									: "w-52 font-bold bg-gradient-to-r p-1 from-cyan-500 to-indigo-500 text-white rounded-3xl"
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
									: "w-32 font-bold bg-gradient-to-r p-1 from-cyan-500 to-indigo-500 text-white rounded-3xl"
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
									: "w-32 font-bold bg-gradient-to-r p-1 from-cyan-500 to-indigo-500 text-white rounded-3xl"
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
									: "w-32 font-bold bg-gradient-to-r p-1 from-cyan-500 to-indigo-500 text-white rounded-3xl"
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
						precio:
							renderProducts === "pizzas"
								? {
										gigante: "",
										mediana: "",
										chica: "",
								  }
								: "",
						categoria: "",
						imagen: "",
						cantidadMaxima: "",
						addEmpanadas: "",
					}}
					onSubmit={(values, { resetForm }) => {
						axios.post("http://localhost:3000/api/products", values).then(res => {
							console.log(res);
						});

						resetForm();
					}}
				>
					{({ values, errors, handleChange, handleBlur, touched, setFieldValue }) => (
						<Form>
							<div className="md:grid  md:grid-cols-2 mt-4 justify-items-end gap-4">
								<div className="w-full mx-auto">
									<label className="block  text-sm  text-slate-400">Nombre del producto</label>
									<input
										id="nombre"
										name="nombre"
										type="text"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.nombre}
										className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
									/>
								</div>

								<div className=" w-full mx-auto">
									<label className="block  text-sm  text-slate-400">Categoria</label>
									<input
										id="categoria"
										name="categoria"
										type="text"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.categoria}
										className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
									/>
								</div>

								<div className=" w-full mx-auto md:col-start-1 md:col-end-3">
									<label className="block text-sm  text-slate-400">Descripcion</label>
									<input
										id="descripcion"
										name="descripcion"
										type="text"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.descripcion}
										className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
									/>
								</div>

								{renderProducts === "promociones" && (
									<>
										<div className=" w-full mx-auto">
											<label className="block  text-sm  text-slate-400">¿Con empanadas? Si / No</label>
											<input
												id="addEmpanadas"
												name="addEmpanadas"
												type="text"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.addEmpanadas}
												className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
														  rounded-md shadow   focus:border-gray-200"
											/>
										</div>
										<div className=" w-full mx-auto">
											<label className="block  text-sm  text-slate-400">
												Si es si, ingresa la cantidad de empanadas
											</label>
											<input
												id="cantidadMaxima"
												name="cantidadMaxima"
												type="text"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.cantidadMaxima}
												className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
														  rounded-md shadow   focus:border-gray-200"
											/>
										</div>
									</>
								)}
								{renderProducts !== "pizzas" ? (
									<>
										<div className=" w-full mx-auto">
											<label className="block  text-sm  text-slate-400">Precio</label>
											<input
												id="precio"
												name="precio"
												type="text"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.precio}
												className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
											/>
										</div>
									</>
								) : (
									<>
										<div className=" w-full mx-auto">
											<label className="block  text-sm  text-slate-400">Precio gigante</label>
											<input
												id="precio.gigante"
												name="precio.gigante"
												type="text"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.precio.gigante}
												className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
											  rounded-md shadow   focus:border-gray-200"
											/>
										</div>
										<div className=" w-full mx-auto">
											<label className="block  text-sm  text-slate-400">Precio mediana</label>
											<input
												id="precio.mediana"
												name="precio.mediana"
												type="text"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.precio.mediana}
												className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
											/>
										</div>
										<div className=" w-full mx-auto">
											<label className="block  text-sm  text-slate-400">Precio chica</label>
											<input
												id="precio.chica"
												name="precio.chica"
												type="text"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.precio.chica}
												className="w-full h-10  text-sm leading-tight text-gray-700  border-gray-200 border
                  									rounded-md shadow   focus:border-gray-200"
											/>
										</div>
									</>
								)}
								<div className=" w-full mx-auto">
									<label className="block  text-sm  text-slate-400">Cargar Imagen</label>
									<input
										name="imagen"
										type="file"
										onChange={e => cloudinaryImage(e.target, setFieldValue)}
										className="w-full h-10 px-3 py-2 text-sm leading-tight text-gray-700 border-gray-200 
                  									rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
									/>
								</div>

								<button
									className="w-48 h-12 my-4 col-start-2
                       						 rounded-md  text-sm 
                       						 border text-white bg-gradient-to-r 
                       						 from-cyan-500 to-indigo-500 "
									type="submit"
								>
									Agregar Producto
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</Layout>
	);
}
