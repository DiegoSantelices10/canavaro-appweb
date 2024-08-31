import axios from "axios";
import Layout from "components/Admin/Layout";
import HeaderTitle from "components/HeaderTitle";
import Tabs from "components/Tabs";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Settings = () => {

	const [porcentaje, setPorcentaje] = useState(0);
	const { promoEfectivo } = useSelector(state => state.setting);


	const onChangePorcentaje = (e) => {
		setPorcentaje(e.target.value)
	}

	const onSubmit = async () => {
		const id = '6658f2017e3dee5fc80edd18'
		try {
			const response = await axios.put(`/api/settings/promo/${id}`, { descuento: porcentaje })
			console.log('response', response);
			toast.success('Actualizado con exito!')
		} catch (error) {
			alert("Error al realizar la accion")
		}
	}

	const sections = [
		{
			id: "1",
			label: "Promociones",
			content:
				<div className="grid grid-cols-2">
					<div className=" border p-3 rounded-lg col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
						<p className="text-sm font-montserrat text-center font-bold">Descuento por pago en efectivo</p>
						<p className="text-xs text-gray-400 font-montserrat text-center">Descuento actual es {promoEfectivo?.descuento}</p>
						<div
							className="grid w-full gap-4 mt-6"
						>
							<div className="">
								<label className="text-xs px-1 font-montserrat text-gray-400">Porcentaje</label>
								<input
									className="border border-gray-200 p-2 w-full rounded-lg focus:outline-none focus:ring-0"
									name='porcentaje'
									type="number"
									value={porcentaje}
									onChange={onChangePorcentaje}
								/>
							</div>
							<button
								onClick={onSubmit}
								className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg"
							>
								Actualizar
							</button>
						</div>
					</div>
				</div>
		},
		{
			id: "2",
			label: "Demora",
			content: <div className="grid gap-3 py-3">
				<h1 className="text-3xl font-montserrat tracking-wider font-bold">Demora</h1>
				<hr />
			</div>
		},
		{
			id: "3",
			label: "Medios de pago",
			content: <div className="grid gap-3 py-3">
				<h1 className="text-3xl font-montserrat tracking-wider font-bold">Medios de pago</h1>
				<hr />
			</div>
		},
	]

	return (
		<Layout>
			<Toaster />
			<HeaderTitle title="Configuración" />
			<div className="mt-6">
				<Tabs sections={sections} />
			</div>

		</Layout>
	);
}

export default Settings;