import axios from "axios";
import Layout from "components/Admin/Layout";
import HeaderTitle from "components/HeaderTitle";
import Tabs from "components/Tabs";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import cloudinaryImage from "utils/cloudinaryImage";

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
			label: "Home",
			content: <div className="grid grid-cols-2">
				<div className=" border p-3 space-y-4 rounded-lg col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
					<p className="text-sm font-montserrat text-center font-bold">Imagen Destacable Home</p>
					<Formik
						initialValues={{
							imagen: '',
						}}
						onSubmit={async (values, { resetForm }) => {

							const valueSumbit = {
								available: true,
								imagen: values?.imagen
							}

							try {
								// const idImage = "67815790a64f8c07fcf6f5db"
								const response = await axios.post(`/api/settings/imageModal`, valueSumbit)

								// const response = await axios.put(`/api/settings/imageModal/${idImage}`, valueSumbit)
								if (response.data.success) {
									resetForm();
									toast.success('Actualizado con exito!')
								}
							} catch (error) {
								alert("Error al realizar la accion")
							}
						}}
					>
						{({ setFieldValue }) => (
							<Form>
								<div className="w-auto">
									<input
										name="imagen"
										type="file"
										accept="image/png, image/jpeg, image/jpg"
										onChange={e => cloudinaryImage(e.target, setFieldValue)}
										className="w-full h-8 file:h-8 file:cursor-pointer  text-xs leading-tight text-gray-900 border-gray-200 
                                  						appearance-none focus:outline-none focus:shadow-outline
                                 					  file:bg-red-600 file:text-white file:border-none file:p-2 file:px-3 file:rounded-lg
                                  						file:font-normal"
									/>
								</div>
								<div className="flex justify-end">
									<button
										className="w-full md:w-44 h-10 col-start-2 rounded-lg mt-6 text-sm 
									border text-white bg-red-600 font-normal font-montserrat hover:bg-red-500"
										type="submit"
									>
										Actualizar
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
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
			<HeaderTitle title="Configuración" />
			<div className="mt-6">
				<Tabs sections={sections} />
			</div>

		</Layout>
	);
}

export default Settings;