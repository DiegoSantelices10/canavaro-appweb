import Layout from "components/admin/layout";
import ModalPedido from "components/modalPedido";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "components/buttonDemora";
import { useDispatch, useSelector } from "react-redux";
import { addSale, setSaleData } from "store/reducers/saleSlice";
import axios from "axios";
import Pusher from "pusher-js";

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	const [currentPedido, setCurrentPedido] = useState(null);
	const [data, setData] = useState(null);
	const [selectedDomicilio, setSelectedDomicilio] = useState({});
	const [selectedLocal, setSelectedLocal] = useState({});
	const { sales } = useSelector(state => state.sale);

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/delay");
			const local = res.data.find(item => item.tipo === "localActual");
			setSelectedLocal({ ...local, demora: local.demoraActual });
			const domicilio = res.data.find(item => item.tipo === "domicilioActual");
			setSelectedDomicilio({ ...domicilio, demora: domicilio.demoraActual });
			setData(res.data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/sales");
			const pedidos = res.data.filter(item => item.liberado !== true);
			if (pedidos.length > 0) {
				localStorage.setItem("sales", JSON.stringify(pedidos));
				dispatch(setSaleData(pedidos));
			}
		})();
	}, []);

	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
			cluster: "us2",
			authEndpoint: "/api/pusher/auth",
			useTLS: true,
		});

		const channel = pusher.subscribe("private-pizzeria");
		channel.bind("canavaro", data => {
			dispatch(addSale(data.message));
		});
		return () => {
			// Cuando el componente se desmonta, debes desuscribirte del canal
			channel.unsubscribe();
		};
	}, []);
	const handleOpenModal = pedido => {
		setCurrentPedido(pedido);
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setCurrentPedido(null);
		setShowModal(false);
	};

	const handlePutTime = async value => {
		if (value.tipoEnvio === "local") {
			const local = data.find(item => item.tipo === "localActual");
			setSelectedLocal(value);
			await axios.put(`/api/delay/${local._id}`, { demoraActual: value.demora });
		} else {
			const domicilio = data.find(item => item.tipo === "domicilioActual");
			setSelectedDomicilio(value);
			await axios.put(`/api/delay/${domicilio._id}`, { demoraActual: value.demora });
		}
	};

	const separarNumero = numero => {
		const segmento1 = numero?.substring(0, 2);
		const segmento2 = numero?.substring(2, 6);
		const segmento3 = numero?.substring(6, 10);

		return `${segmento1} ${segmento2} ${segmento3}`;
	};

	const handleDelete = async id => {
		await axios.put(`/api/sales/${id}`, { liberado: true }).then(res => console.log(res));
	};
	return (
		<Layout>
			{currentPedido && (
				<ModalPedido
					id={currentPedido._id}
					show={showModal}
					handleClose={handleCloseModal}
					pedido={currentPedido}
				/>
			)}
			<div className="h-auto p-0 md:px-2">
				<div className=" w-full block md:flex gap-1 p-2">
					<div className="w-full md:w-1/2 text-center">
						<h1 className="font-bold font-poppins my-5">Demora domicilio</h1>
						<div className="flex gap-3  justify-center">
							{data
								?.filter(item => item.tipoEnvio === "domicilio")
								.map(item => (
									<Button
										handlePutTime={handlePutTime}
										key={item._id}
										data={item}
										selected={selectedDomicilio}
									/>
								))}
						</div>
					</div>
					<div className="w-full md:w-1/2 text-center">
						<h1 className="font-bold font-poppins my-5">Demora por local</h1>
						<div className="flex gap-3 justify-center">
							{data
								?.filter(item => item.tipoEnvio === "local")
								.map(item => (
									<Button
										handlePutTime={handlePutTime}
										key={item._id}
										data={item}
										selected={selectedLocal}
									/>
								))}
						</div>
					</div>
				</div>

				<div className="w-full bg-white min-h-screen  mx-auto text-center p-2 mt-10 rounded-md ">
					<div className="flex flex-wrap justify-start gap-4 mx-auto">
						{sales?.length > 0 ? (
							sales.map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="w-full  md:w-72 bg-white rounded h-auto shadow-md p-3 border-2"
								>
									<div className="w-full text-sm">
										<h2 className="text-right">{index + 1}</h2>
										<div className="text-left py-3 font-medium">
											<h5 className="font-semibold">{item?.cliente}</h5>
											<h5 className="text-sm font-normal">
												{item?.domicilio || separarNumero(item?.telefono)}
											</h5>
											<h5 className="font-normal text-xs text-gray-400">
												{item?.tipoEnvio}
											</h5>
										</div>
									</div>
									<div className="flex justify-end  gap-3 w-full">
										<button
											onClick={() => handleOpenModal(item)}
											className="px-4 py-2 w-auto rounded-md text-xs font-medium  
														shadow focus:outline-none focus:ring transition 
														text-slate-500  hover:bg-blue-100 
														active:bg-blue-200 focus:ring-blue-300"
											type="submit"
										>
											Ver descripcion
										</button>
										<button
											onClick={() => handleDelete(item?._id)}
											className="px-4 py-2 w-auto rounded-md text-xs font-medium border shadow
												focus:outline-none focus:ring transition text-white 
											bg-red-500  hover:bg-red-600 
											hover:border-white "
											type="submit"
										>
											Liberar
										</button>
									</div>
								</motion.div>
							))
						) : (
							<p className="text-center w-full font-semibold font-poppins">
								No Hay pedidos
							</p>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
