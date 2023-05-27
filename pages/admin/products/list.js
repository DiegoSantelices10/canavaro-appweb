import Layout from "components/admin/layout";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";
import { setProductData } from "store/reducers/productSlice";

export default function Products() {
	const router = useRouter();
	const { products } = useSelector(state => state.product);
	const dispatch = useDispatch();
	useEffect(() => {
		if (products.length < 1) {
			console.log("entro");
			dispatch(setProductData(JSON.parse(localStorage.getItem("productos"))));
		}
	});

	const { handleSubmit, handleChange, values } = useFormik({
		initialValues: {
			query: "",
		},
		onSubmit: async function (values) {},
	});

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
						className="w-64 h-12 col-start-2 font-nunito font-semibold
                             rounded-md  text-sm 
                             border text-white bg-red-500 "
						type="button"
						onClick={() => {
							router.push("/admin/products/0");
						}}
					>
						Producto Nuevo
					</button>
				</div>
				<form onSubmit={handleSubmit} className="flex w-full md:w-1/2 items-center gap-x-2 px-2">
					<div
						className="flex  justify-between items-center w-full h-12 px-3 py-2 text-sm leading-tight text-gray-700 border-0 
                         rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
					>
						<input
							id="query"
							name="query"
							type="text"
							placeholder="¿Que Desea Buscar?"
							onChange={handleChange}
							value={values.query}
							className="w-full border-0 bg-gray-50 focus:outline-none focus:ring-0"
						/>
						<FaSearch size={20} />
					</div>
				</form>
			</div>
			<div className="w-full lg:w-11/12 mx-auto h-auto">
				<div className="w-full mx-auto">
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="">
								<tr>
									<th scope="col" className="px-6 py-3">
										Nombre
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
							<tbody className="text-gray-800 font-nunito">
								{products.map((producto, index) => {
									return (
										<tr key={producto._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
											<th scope="row" className="px-6 py-4   ">
												{producto.nombre}
											</th>
											<td className="px-6 py-4 font-bold">{producto.categoria}</td>
											<td className="px-6 py-4">{producto.categoria !== "pizzas" && "$" + producto.precio}</td>
											<td className="px-6 py-4 text-right">
												<Link href={`/admin/products/${producto._id}`}>
													<a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
														<FaRegEdit size={25} className="text-gray-800" />
													</a>
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
}
