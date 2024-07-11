import axios from "axios";
import Layout from "components/admin/layout";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Settings() {

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
			toast.success('Creado con exito!')
		} catch (error) {
			alert("Error al realizar la accion")
		}
	}

	return (
		<Layout>
			<Toaster />
			<div
				className="p-4"
			>
				<p className="text-sm font-montserrat font-medium">Pago en efectivo, el porcentaje de descuento es: {promoEfectivo?.descuento}%</p>
				<p className="text-xs font-montserrat font-normal text-gray-500">Agregar solo el numero ej: 5 o 10</p>
				<div
					className="flex justify-start items-center mt-2 gap-4"
				>
					<input
						className="border border-gray-200 p-2 rounded-lg"
						name='porcentaje'
						type="number"
						value={porcentaje}
						onChange={onChangePorcentaje}
					/>
					<button
						onClick={onSubmit}
						className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
					>
						Actualizar
					</button>
				</div>

			</div>
		</Layout>
	);
}
