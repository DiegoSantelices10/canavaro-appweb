import { useFormik } from "formik";
import { useRouter } from "next/router";
import Layout from "components/admin/layout";
export default function Promotions() {
	const router = useRouter();

	const { handleSubmit, handleChange, values } = useFormik({
		initialValues: {
			promotion: "",
			description: "",
			category: "",
			price: "",
		},
		onSubmit: async function (values) {},
	});
	console.log(values);

	return (
		<Layout>
			<div className="h-screen fixed w-full">
				<div className="w-11/12 h-auto text-center flex justify-center py-10 mx-auto">
					<div className="w-2/6 h-full grid gap-4 grid-cols-1">
						<h1 className="text-3xl font-poppins font-extrabold text-zinc-800 text-center pb-11">¿Que deseas hacer?</h1>
						<div className="w-full grid grid-cols-1 gap-4">
							<button
								className="text-white bg-gradient-to-r 
                                        from-cyan-500 to-indigo-500"
								mesage="Generar Codigo"
							/>
							<button
								className="text-white bg-gradient-to-r
                from-cyan-500 to-indigo-500"
								mesage="Editar Promociones"
							/>
						</div>
					</div>

					<form className="w-3/5 h-auto px-10" onSubmit={handleSubmit}>
						<h1 className=" text-3xl font-poppins font-extrabold text-zinc-800 pb-5">¡Ingresa una promo nueva!</h1>
						<div className="grid grid-cols-2 mt-4 justify-items-end gap-4">
							<div className=" w-full mx-auto">
								<label className="block text-sm  text-slate-400">Nombre de la promo</label>
								<input
									id="promo"
									type="text"
									onChange={handleChange}
									value={values.promotion}
									className="w-full h-12 px-3 py-2 text-sm leading-tight text-gray-700 border 
                              rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className=" w-full mx-auto">
								<label className="block  text-sm  text-slate-400">Descripcion</label>
								<input
									id="descripcion"
									type="text"
									onChange={handleChange}
									value={values.description}
									className="w-full h-12 px-3 py-2 text-sm leading-tight text-gray-700 border 
                              rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className=" w-full mx-auto">
								<label className="block  text-sm  text-slate-400">Categoria</label>
								<input
									id="categoria"
									type="text"
									onChange={handleChange}
									value={values.category}
									className="w-full h-12 px-3 py-2 text-sm leading-tight text-gray-700 border 
                              rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className=" w-full mx-auto">
								<label className="block  text-sm  text-slate-400">Precio</label>
								<input
									id="precio"
									type="text"
									onChange={handleChange}
									value={values.price}
									className="w-full h-12 px-3 py-2 text-sm leading-tight text-gray-700 border 
                              rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
								/>
							</div>

							<button
								className="w-60 h-12 col-start-2
                                    rounded-2xl  text-sm 
                                    border text-white bg-gradient-to-r 
                                    from-cyan-500 to-indigo-500 "
								onClick={() => router.push("./admin/home")}
								type="button"
							>
								Agregar Promocion
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}
