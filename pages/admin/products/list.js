import Layout from "components/admin/layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaRegEdit } from "react-icons/fa";
import { setProductData } from "store/reducers/productSlice";
import { getProductsFront } from "services/fetchData";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

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
			const resultado = renderProductos?.filter(item =>
				item.nombre.toLowerCase().includes(minus.toLowerCase())
			);
			if (e.target.value === "") {
				setRenderProductos(products);
			} else {
				setRenderProductos(resultado);
			}
		}, 1000); // Establece el tiempo de espera deseado en milisegundos (500 ms en este ejemplo)

		return () => {
			clearTimeout(delayDebounceFn);
		};
	};
	const handleCheckboxChange = async (id, availableCurrent) => {
		console.log(!availableCurrent);
		const updatedProductos = renderProductos.map(producto => {
			if (producto._id === id) {
				return { ...producto, available: !producto.available };
			}
			return producto;
		});
		setRenderProductos(updatedProductos);

		try {
			const response = await axios.put(`/api/products/${id}`, {
				available: !availableCurrent,
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
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
			<div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid lg:grid-cols-3 gap-3">
				{renderProductos.map(
					({ _id, nombre, descripcion, imagen, available, categoria }) => {
						return (
							<div key={_id}>
								<div className="flex justify-between items-center gap-x-2 relative ">
									<Image
										className="rounded-md"
										src={imagen?.url || "/images/logocanavaro.png"}
										width={140}
										height={140}
										alt={nombre}
									/>
									<div className="relative w-full h-28 py-1 self-start">
										<h1 className="font-bold text-sm text-gray-800">{nombre}</h1>
										<p className="text-gray-400 text-xs">{descripcion}</p>
										<h4 className="text-gray-700 text-xs ">{categoria}</h4>
										<div className="absolute bottom-0">
											<label className="inline-flex items-center cursor-pointer">
												<input
													id={_id}
													type="checkbox"
													className="sr-only peer"
													checked={available}
													onChange={() => handleCheckboxChange(_id, available)}
												/>
												<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
											</label>
										</div>
									</div>
									<div className="flex absolute bottom-2 right-3 gap-3">
										<Link href={`/admin/products/${_id}`}>
											<a>
												<FaRegEdit size={25} className="text-gray-800" />
											</a>
										</Link>
									</div>
								</div>
							</div>
						);
					}
				)}
			</div>
			<hr />
		</Layout>
	);
}
