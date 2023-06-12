import Layout from "components/admin/layout";
import ModalPedido from "components/modalPedido";
import { useEffect, useState } from "react";

import { pedidos } from "services/fetchData";
import Button from "components/buttonDemora";
import { useDispatch } from "react-redux";
import { setSaleData } from "store/reducers/saleSlice";
import axios from "axios";
import Pusher from "pusher-js";

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	const [currentPedido, setCurrentPedido] = useState(null);
	const [renderSale, setRenderSale] = useState([]);
	const [data, setData] = useState(null);
	const [selectedDomicilio, setSelectedDomicilio] = useState({});
	const [selectedLocal, setSelectedLocal] = useState({});
	// const [chats, setChats] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		setRenderSale(pedidos);
		localStorage.setItem("sales", JSON.stringify(pedidos));
		dispatch(setSaleData(pedidos));
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
		const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
			cluster: "us2",
			authEndpoint: "/api/pusher/auth",
			useTLS: true,
		});

		const channel = pusher.subscribe("private-pizzeria");
		channel.bind("canavaro", data => {
			console.log(data);
			// setChats([...chats, data.message]);
		});
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

	return (
		<Layout>
			{currentPedido && (
				<ModalPedido
					key={currentPedido._id}
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

				<div className="w-full bg-white min-h-screen  mx-auto text-center p-4 rounded-md ">
					<div className="flex flex-wrap justify-start gap-4 mx-auto">
						{renderSale?.map(item => (
							<div
								key={item._id}
								className="w-full md:w-72 bg-white rounded- shadow-md p-3 border-2"
							>
								<div className="w-full text-sm">
									<h2 className="text-right">{item?._id}</h2>
									<div className="text-left py-3 font-medium">
										<h5 className="text-sm">{item?.direccion}</h5>
										<h5 className="font-normal">{item?.cliente}</h5>
										<h5 className="font-normal text-xs text-gray-400">
											{item?.tipoEnvio}
										</h5>
									</div>
								</div>
								<div className="flex justify-end gap-3 w-full">
									<button
										onClick={() => handleOpenModal(item)}
										className="px-4 py-2 w-1/2 rounded-md text-xs font-medium  
                                 shadow focus:outline-none focus:ring transition 
                                 text-slate-500  hover:bg-blue-100 
                                 active:bg-blue-200 focus:ring-blue-300"
										type="submit"
									>
										Ver descripcion
									</button>
									<button
										className="px-4 py-2 w-1/2 rounded-md text-xs font-medium border shadow
                                 focus:outline-none focus:ring transition text-white 
                               bg-red-500  hover:bg-red-600 
                               hover:border-white "
										type="submit"
									>
										Liberar
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}
