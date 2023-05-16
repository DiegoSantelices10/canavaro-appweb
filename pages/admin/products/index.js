import Layout from "components/admin/layout";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {FaSearch} from "react-icons/fa"

export default function Products() {
	const router = useRouter();

	const {products} = useSelector(state => state.product)
	const { handleSubmit, handleChange, values } = useFormik({
		initialValues: {
			query: "",
		},
		onSubmit: async function (values) {},
	});


	console.log(products);

	return (
		<Layout>
			<div className=" md:flex w-full lg:w-11/12 mx-auto items-center gap-x-4 justify-between py-4 h-auto">
				<div className="flex w-full my-2 md:my-0 md:w-1/2 items-center justify-between px-2">
					<h1
						className="text-md lg:text-xl font-poppins font-extrabold text-center
                       text-zinc-800 w-full "
					>
						¡Ingresa un producto nuevo!
					</h1>

					<button
						className="w-64 h-12 col-start-2
                             rounded-md  text-sm 
                             border text-white bg-gradient-to-r 
                           from-cyan-500 to-indigo-500 "
						type="button"
						onClick={() => {
							router.push("/admin/products/create");
						}}
					>
						Producto Nuevo
					</button>
				</div>
				<form onSubmit={handleSubmit} className="flex w-full md:w-1/2 items-center gap-x-2 px-2">
					<div className="flex  justify-between items-center w-full h-12 px-3 py-2 text-sm leading-tight text-gray-700 border-0 
                         rounded-md shadow appearance-none focus:outline-none focus:shadow-outline">
						<input
							id="query"
							name="query"
							type="text"
							placeholder="¿Que Desea Buscar?"
							onChange={handleChange}
							value={values.query}
							className="w-full border-0 bg-gray-50 focus:outline-none focus:ring-0"
						/>
						<FaSearch size={20}/>
					</div>
				
				</form>
				
			</div>
			<div className="w-full lg:w-11/12 mx-auto h-auto">
						<div className="w-full mx-auto">
							<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
								<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
									<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											
											<th scope="col" className="px-6 py-3">
												Nombre
											</th>
											<th scope="col" className="px-6 py-3">
												Descripcion
											</th>
											<th scope="col" className="px-6 py-3">
												Categoria
											</th>
											<th scope="col" className="px-6 py-3">
												Precio
											</th>
											<th scope="col" className="px-6 py-3">
												<span className="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody>
										{products.map(producto => {
											return (
											<tr key={producto.id} 
												className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
												     		hover:bg-gray-50 dark:hover:bg-gray-600">
											<th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
												{producto.nombre}
											</th>
											<td className="px-6 py-4">{producto.descripcion}</td>
											<td className="px-6 py-4">{producto.categoria}</td>
											<td className="px-6 py-4">{producto.categoria !== "pizzas" && "$" + producto.precio}</td>
											<td className="px-6 py-4 text-right">
												<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
													Edit
												</a>
											</td>
										</tr>
										)})}
										
										
									</tbody>
								</table>
							</div>
						</div>
					</div>
		</Layout>
	);
}
