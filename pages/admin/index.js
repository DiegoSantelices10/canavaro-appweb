/* eslint-disable react/prop-types */
import Layout from "components/admin/layout";
import ModalPedido from "components/modalPedido";
import { useEffect, useState } from "react";

import { pedidos } from "services/fetchData";
import Button from "components/buttonDemora";
import { useDispatch } from "react-redux";
import { setSaleData } from "store/reducers/saleSlice";
export default function Home() {
	const [showModal, setShowModal] = useState(false);
	const [currentPedido, setCurrentPedido] = useState(null);
	const [renderSale, setRenderSale] = useState([]);

	const [demoraDomicilio, setDemoraDomicilio] = useState("35-45min");
	const [demoraLocal, setDemoraLocal] = useState("10-15min");
	const dispatch = useDispatch();

	useEffect(() => {
		setRenderSale(pedidos);
		localStorage.setItem("sales", JSON.stringify(pedidos));
		dispatch(setSaleData(pedidos));
	}, []);

	const handleOpenModal = pedido => {
		setCurrentPedido(pedido);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setCurrentPedido(null);
		setShowModal(false);
	};

	const tiempoDemoraDomicilio = ["35-45min", "45-55min", "55-65min", "65-75min", "75-85min"];
	const tiempoDemoraLocal = ["10-15min", "15-20min", "20-25min", "25-30min", "30-35min"];

	return (
		<Layout>
			{currentPedido && <ModalPedido key={currentPedido._id} show={showModal} handleClose={handleCloseModal} pedido={currentPedido} />}
			<div className="h-auto p-0 md:px-2">
				<div className=" w-full block md:flex p-2">
					<div className="w-full md:w-1/2 text-center">
						<h1 className="font-semibold my-5">Demora domicilio</h1>
						<div className="flex gap-1 md:gap-4 justify-center">
							{tiempoDemoraDomicilio.map((tiempo, index) => (
								<Button key={index} setDemora={setDemoraDomicilio} demora={demoraDomicilio} time={tiempo} />
							))}
						</div>
					</div>
					<div className="w-full md:w-1/2 text-center">
						<h1 className="font-semibold my-5">Demora por local</h1>
						<div className="flex gap-3 justify-center">
							{tiempoDemoraLocal.map((tiempo, index) => (
								<Button key={index} setDemora={setDemoraLocal} demora={demoraLocal} time={tiempo} />
							))}
						</div>
					</div>
				</div>

				<div className="w-full bg-white min-h-screen  mx-auto text-center p-4 rounded-md ">
					<div className="flex flex-wrap justify-start gap-4 mx-auto">
						{renderSale?.map(item => (
							<div key={item._id} className="w-full md:w-72 bg-white rounded- shadow-md p-3 border-2">
								<div className="w-full text-sm">
									<h2 className="text-right">{item?._id}</h2>
									<div className="text-left py-3 font-medium">
										<h5 className="text-sm">{item?.direccion}</h5>
										<h5 className="font-normal">{item?.cliente}</h5>
										<h5 className="font-normal text-xs text-gray-400">{item?.tipoEnvio}</h5>
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
