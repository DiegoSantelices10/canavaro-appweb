import Image from "next/image";
import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearOrderPromo } from "store/reducers/orderSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function index() {
	const { products } = useSelector(state => state.product);

	const { pizzas } = products;
	const dispatch = useDispatch();
	const router = useRouter();

	const returnHome = () => {
		Swal.fire({
			title: "Estas seguro que deseas salir?",
			showDenyButton: true,
			confirmButtonText: "Descartar",
		}).then(result => {
			if (result.isConfirmed) {
				dispatch(clearOrderPromo());
				router.push("/home");
			}
		});
	};
	return (
		<div className=" min-h-screen  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5">
			<div className="relative overflow-hidden h-52 lg:h-60  mx-auto  ">
				<Image
					src={"/images/descarga.jpeg"}
					layout="responsive"
					width={80}
					height={40}
					objectFit="cover"
					objectPosition="center"
					alt={"img"}
				/>
				<button onClick={returnHome}>
					<FiChevronsLeft className="absolute text-slate-800 bg-slate-50 rounded-full p-1 top-4 left-4" size={30} />
				</button>
			</div>

			<div className="w-full h-auto">
				<div className="flex flex-col  w-full">
					<div className="w-full bg-white p-3">
						<h1 className="font-bold text-lg text-gray-800">Arma tu pizza</h1>
						<p className=" font-normal text-sm  text-gray-400">Elegi los gustos que quieras</p>
						<p className=" font-normal  text-sm text-gray-400">$ ..? Segun los gustos que decidas</p>
					</div>
					<hr className="pb-3" />
					<div className="text-sm font-semibold text-left bg-white p-3 my-1">
						<div className="flex gap-y-2 py-2 justify-between items-center">
							{products.pizzas?.map(({ id, nombre }) => {
								return (
									<div key={id} className="flex justify-between py-2  my-2 ">
										<div className="w-1/2 font-medium">
											<h2>{nombre}</h2>
										</div>
										<div className="w-auto   px-3 text-end space-x-4 text-base">
											<button
												type="button"
												className="text-red-500 down"
												// onClick={e => {
												// 	setQuantity(quantityDemanded + 1);
												// 	decrementItems({ id, nombre });
												// }}
											>
												-
											</button>
											<span className="font-normal">1/4</span>
											<button
												type="button"
												// className={quantityDemanded < 1 ? `invisible` : `text-green-500`}
												// onClick={e => {
												// 	setQuantity(quantityDemanded - 1);
												// 	addItems({ id, nombre });
												// }}
											>
												+
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="font-normal text-left text-sm pb-24 pt-5 bg-white p-3 max-h-full">
					<h1 className="pb-1">Comentarios</h1>
					<input type="text" className="border border-gray-300 rounded-md w-full p-2" />
				</div>
			</div>

			<div className="bg-white w-full fixed bottom-0 p-4 border-t-2 border-gray-200  sm:w-4/5 md:w-3/5 lg:w-2/5">
				<button
					className="flex justify-center gap-3 text-center rounded-md w-full p-4 bg-red-600 hover:bg-red-500 hover:-translate-y-1 
						transition-all duration-500 text-white text-base font-semibold "
					// onClick={() => {
					// 	addCartPromo(orderPromo);
					// }}
				>
					Agregar al Carrito
					<FiShoppingCart size={23} />{" "}
				</button>
			</div>
		</div>
	);
}
