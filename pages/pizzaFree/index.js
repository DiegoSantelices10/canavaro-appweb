import Image from "next/image";
import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
	clearOrderPromo,
	setQuantityDemanded,
	addProductPromo,
	decrementProductPromo,
} from "store/reducers/orderSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
	const [select, setSelect] = useState("gigante");
	const [radioSelect, setRadioSelect] = useState([]);
	const { products } = useSelector(state => state.product);
	// const { quantityDemanded } = useSelector(state => state.order);

	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		console.log(radioSelect);
	}, [radioSelect]);

	const onChangeValue = e => {
		const value = e.target.value;
		setSelect(value);
	};

	const handleChangeRadioButton = (item, index, value) => {
		console.log("entro");
		const res = radioSelect.find(product => product.id === item.id);
		if (res) {
			res.fraccion = value;
			const updatedArray = radioSelect.map(obj => (obj.id === item.id ? res : obj));
			setRadioSelect([...updatedArray]);
		} else {
			setRadioSelect([...radioSelect, { "fraccion": value, ...item }]);
		}
	};

	const clearFraction = id => {
		const res = radioSelect.filter(pro => pro.id !== id);
		setRadioSelect([...res]);
	};
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

	const buttonClear = id => {
		const res = radioSelect.find(pro => pro.id === id);

		if (res) {
			return (
				<button onClick={() => clearFraction(id)} className="text-gray-400 text-xs font-semibold">
					Deshacer
				</button>
			);
		}
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
					</div>
					<hr className="pb-3" />
					<div className="flex w-full justify-around">
						<div className="grid content-center">
							<input
								id="chica"
								type="radio"
								value="chica"
								name="chica"
								onChange={onChangeValue}
								checked={select === "chica"}
							/>
							<div>
								<h3>Chica</h3>
							</div>
						</div>
						<div className="grid content-center">
							<input
								id="mediana"
								type="radio"
								value="mediana"
								name="mediana"
								onChange={onChangeValue}
								checked={select === "mediana"}
							/>
							<div>
								<h3>Mediana</h3>
							</div>
						</div>
						<div className="grid content-center">
							<input
								id="gigante"
								type="radio"
								value="gigante"
								name="gigante"
								onChange={onChangeValue}
								checked={select === "gigante"}
							/>
							<div>
								<h3>Gigante</h3>
							</div>
						</div>
					</div>
					<div className="text-center font-poppins py-2 text-gray-400 text-sm">
						<p>puedes elegir hasta {select === "gigante" ? "4" : "2"} gustos</p>
					</div>

					<div className="text-sm font-semibold text-left bg-white p-3 my-1">
						{products.pizzas?.map((item, index) => (
							<div key={item.id} className="flex justify-between items-center py-2  my-2 ">
								<h2>{item.nombre}</h2>
								<div className="w-auto   px-3 text-end space-x-4 text-base">
									<div className="flex w-full justify-around items-center gap-5">
										{buttonClear(item.id)}
										<div className="flex items-center gap-x-1">
											<h3 className="text-gray-400 text-sm">1/4</h3>
											<input
												type="radio"
												value="cuarto"
												name={`opcion-${index}`}
												checked={radioSelect.forEach(item => item?.fraccion === "cuarto")}
												onChange={() => handleChangeRadioButton(item, index, "cuarto")}
											/>
										</div>
										<div className="flex items-center gap-x-1">
											<h3 className="text-gray-400 text-sm">1/2</h3>
											<input
												type="radio"
												value="mediana"
												name={`opcion-${index}`}
												checked={radioSelect.forEach(item => item?.fraccion === "mediana")}
												onChange={() => handleChangeRadioButton(item, index, "mediana")}
											/>
										</div>
									</div>
								</div>
							</div>
						))}
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
