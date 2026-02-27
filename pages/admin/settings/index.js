import axios from "axios";
import Layout from "components/Admin/Layout";
import Tabs from "components/Tabs";
import HeaderTitle from "components/HeaderTitle";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import cloudinaryImage from "utils/cloudinaryImage";
import { FiPercent, FiImage, FiCreditCard, FiSave, FiInfo, FiUploadCloud, FiSettings } from "react-icons/fi";

const Settings = () => {
	const [porcentaje, setPorcentaje] = useState(0);
	const { promoEfectivo } = useSelector(state => state.setting);

	const onChangePorcentaje = (e) => {
		setPorcentaje(e.target.value)
	}

	const onSubmit = async () => {
		const idProd = '6658f2017e3dee5fc80edd18'
		const idDev = '6650ebdbb30d43cdd7aab5f6'
		const id = process.env.NODE_ENV === 'development' ? idDev : idProd
		try {
			const res = await axios.put(`/api/settings/promo/${id}`, { descuento: porcentaje })
			if (res.status === 200) {
				toast.success('¡Porcentaje actualizado con éxito!')
			}
		} catch (error) {
			toast.error("Error al actualizar el descuento")
		}
	}

	const sections = [
		{
			id: "1",
			label: "Descuento Efectivo",
			content: (
				<div className="max-w-2xl">
					<div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
						<div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

						<div className="relative">
							<div className="flex items-center gap-5 mb-10">
								<div className="p-4 bg-red-50 text-red-600 rounded-[1.5rem] shadow-sm">
									<FiPercent size={24} />
								</div>
								<div>
									<h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Promoción Efectivo</h3>
									<p className="text-sm font-medium text-slate-400">Descuento actual configurado: <span className="text-red-600 font-bold">{promoEfectivo?.descuento}%</span></p>
								</div>
							</div>

							<div className="space-y-8">
								<div className="space-y-3">
									<label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Nuevo Porcentaje de Descuento</label>
									<div className="relative max-w-xs">
										<input
											className="w-full pl-6 pr-14 py-4.5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] text-sm font-black focus:border-red-500/10 focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all outline-none"
											name='porcentaje'
											type="number"
											value={porcentaje}
											onChange={onChangePorcentaje}
										/>
										<span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-900 text-lg">%</span>
									</div>
									<div className="flex items-start gap-2 mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
										<FiInfo className="text-slate-400 mt-0.5 flex-shrink-0" />
										<p className="text-xs text-slate-400">Este valor se aplicará directamente al total del carrito cuando el cliente seleccione pago en efectivo.</p>
									</div>
								</div>

								<div className="flex pt-4">
									<button
										onClick={onSubmit}
										className="flex items-center justify-center gap-3 px-12 py-5 bg-slate-900 text-white text-[11px] font-black rounded-2xl hover:bg-red-600 transition-all active:scale-95 shadow-2xl shadow-slate-900/20 group tracking-[0.15em] uppercase"
									>
										<FiSave className="text-xl group-hover:rotate-12 transition-transform duration-300" />
										<span>GUARDAR CONFIGURACIÓN</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			id: "2",
			label: "Banner Publicitario",
			content: (
				<div className="max-w-2xl">
					<div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
						<div className="absolute top-0 left-0 w-64 h-64 bg-slate-900/5 rounded-full -ml-32 -mt-32 blur-3xl pointer-events-none"></div>

						<div className="relative">
							<div className="flex items-center gap-5 mb-10">
								<div className="p-4 bg-slate-100 text-slate-900 rounded-[1.5rem] shadow-sm">
									<FiImage size={24} />
								</div>
								<div>
									<h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Banner de Inicio</h3>
									<p className="text-sm font-medium text-slate-400">Esta imagen se mostrará automáticamente al abrir la web.</p>
								</div>
							</div>

							<Formik
								initialValues={{ imagen: '' }}
								onSubmit={async (values, { resetForm }) => {
									const valueSumbit = { available: true, imagen: values?.imagen }
									try {
										const idImage = "67816cd547f387e5c3442668"
										const response = await axios.put(`/api/settings/imageModal/${idImage}`, valueSumbit)
										if (response.data.success) {
											resetForm();
											toast.success('¡Banner actualizado con éxito!')
										}
									} catch (error) {
										toast.error("Error al subir el nuevo banner")
									}
								}}
							>
								{({ setFieldValue, values }) => (
									<Form className="space-y-8">
										<div className="relative group">
											<input
												name="imagen"
												type="file"
												accept="image/png, image/jpeg, image/jpg"
												onChange={e => cloudinaryImage(e.target, setFieldValue)}
												className="hidden"
												id="file-upload-banner"
											/>
											<label
												htmlFor="file-upload-banner"
												className="flex flex-col items-center justify-center w-full py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] cursor-pointer group-hover:bg-slate-100 group-hover:border-slate-400/50 transition-all overflow-hidden"
											>
												{values.imagen ? (
													<div className="relative w-full h-48 px-8 mb-4">
														<img
															src={values.imagen?.url || values.imagen}
															alt="Banner Preview"
															className="w-full h-full object-contain rounded-2xl shadow-xl hover:scale-[1.02] transition-transform"
														/>
													</div>
												) : (
													<div className="flex flex-col items-center">
														<div className="p-5 bg-white rounded-full shadow-lg mb-4 text-slate-400 group-hover:text-red-600 transition-colors">
															<FiUploadCloud size={32} />
														</div>
														<span className="text-sm font-black text-slate-500 uppercase tracking-widest">Seleccionar Archivo</span>
														<p className="text-xs text-slate-400 mt-2">Formatos: JPG, PNG o WebP</p>
													</div>
												)}
											</label>
										</div>

										<div className="flex pt-4">
											<button
												className="flex items-center justify-center gap-3 px-12 py-5 bg-slate-900 text-white text-[11px] font-black rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-2xl shadow-slate-900/20 group tracking-[0.15em] uppercase"
												type="submit"
											>
												<FiSave className="text-xl group-hover:rotate-12 transition-transform duration-300" />
												<span>ACTUALIZAR BANNER</span>
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			)
		},
		{
			id: "3",
			label: "Medios de Pago",
			content: (
				<div className="max-w-2xl">
					<div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-slate-900/10 text-white relative overflow-hidden">
						<div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32 blur-3xl pointer-events-none"></div>

						<div className="relative">
							<div className="flex items-center gap-5 mb-8">
								<div className="p-4 bg-white/10 text-white rounded-[1.5rem] backdrop-blur-sm">
									<FiCreditCard size={24} />
								</div>
								<h3 className="text-xl font-black uppercase tracking-tight">Canales de Pago</h3>
							</div>

							<p className="text-slate-400 text-sm leading-relaxed font-normal mb-10 max-w-md">
								Esta sección está actualmente en mantenimiento. Pronto podrás gestionar tus claves de Mercado Pago y otras pasarelas directamente desde aquí.
							</p>

							<div className="py-12 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center">
								<div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center animate-pulse mb-4 text-white/30">
									<FiSettings size={20} />
								</div>
								<span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Modulo en Desarrollo</span>
							</div>
						</div>
					</div>
				</div>
			)
		},
	]

	return (
		<Layout>
			<div className="mb-10 lg:mb-14">
				<HeaderTitle title="Configuración" isBack />
				<p className="text-slate-500 mt-2 font-medium">Gestiona los ajustes globales y visuales de tu plataforma.</p>
			</div>

			<div className="max-w-5xl">
				<Tabs sections={sections} />
			</div>
		</Layout>
	);
}

export default Settings;