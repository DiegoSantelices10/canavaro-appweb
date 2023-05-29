import Layout from "components/admin/layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { setProductData } from "store/reducers/productSlice";
import { getProductsFront } from "services/fetchData";
import { useEffect, useState } from "react";

export default function Products() {
	const [renderProductos, setRenderProductos] = useState([]);
	const { products } = useSelector(state => state.product);
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const res = await getProductsFront();
			setRenderProductos(res);
			dispatch(setProductData(res));
		})();
	}, []);

	const handleChangeSearch = e => {
		const minus = e.target.value;
		const delayDebounceFn = setTimeout(() => {
			// Aquí puedes realizar la búsqueda en el listado con el valor de inputValue
			const resultado = renderProductos?.filter(item => item.nombre.toLowerCase().includes(minus.toLowerCase()));
			if (e.target.value === "") {
				setRenderProductos(products);
			} else {
				setRenderProductos(resultado);
			}
		}, 500); // Establece el tiempo de espera deseado en milisegundos (500 ms en este ejemplo)

		return () => {
			clearTimeout(delayDebounceFn);
		};
	};

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
							router.push("/admin/products/create");
						}}
					>
						Producto Nuevo
					</button>
				</div>
				<div className="flex w-full md:w-1/2 items-center gap-x-2 px-2">
					<div
						className="flex  justify-between items-center w-full h-12 px-3 py-2 text-sm leading-tight text-gray-700 border-0 
                         rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
					>
						<input
							id="query"
							name="query"
							type="text"
							placeholder="¿Que Desea Buscar?"
							onChange={handleChangeSearch}
							className="w-full border-0 bg-gray-50 focus:outline-none focus:ring-0"
						/>
						<FaSearch size={20} />
					</div>
				</div>
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
								{renderProductos?.map((producto, index) => {
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
