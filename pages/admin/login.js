import Image from "next/image";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { FaChevronRight, FaFacebook } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setAuth } from "store/reducers/authSlice";

export default function Login() {
	const router = useRouter();
	const dispatch = useDispatch();

	return (
		<div className="h-screen bg-gradient-to-r from-slate-900 to-slate-800 ">
			<div className="h-full w-full lg:w-4/5 md:w-4/5 sm:w-4/5 flex items-center justify-center lg:justify-between mx-auto">
				<div className="w-2/5 text-center hidden lg:block text-white">
					<div className="mx-auto ">
						<Image src="/images/logocanavaro.png" width={230} height={230} alt="logo" />
					</div>
				</div>

				<div
					className="grid content-center rounded-md shadow-lg bg-white lg:w-1/2 w-full h-full p-10 
								 lg:h-auto  md:h-auto sm:h-auto"
				>
					<div className="w-full text-center lg:hidden block text-white">
						<div className="mx-auto ">
							<Image src="/images/logocanavaro.png" width={170} height={170} alt="logo" />
						</div>
					</div>
					<div className="w-auto mx-auto pt-10 pb-4">
						<h1 className="font-extrabold text-center text-3xl font-nunito">¡Bienvenido!</h1>
						<h3 className="font-medium text-lg font-nunito">Escribe tus credenciales para ingresar al sistema</h3>
					</div>
					<div className="flex flex-col gap-3">
						<Formik
							initialValues={{
								nombre: "",
								password: "",
							}}
							onSubmit={values => {
								dispatch(
									setAuth({
										nombre: values.nombre,
										password: values.password,
									})
								);
								router.push("/welcomeLogo");
								setTimeout(() => {
									router.push("/admin");
								}, 3000);
							}}
						>
							{({ values, handleChange }) => (
								<Form>
									<div className="mb-3">
										<input
											id="nombre"
											className="shadow w-full font-nunito font-semibold bg-slate-50  text-sm border-none text-center  h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
											placeholder="Introduce tu usuario"
											type="text"
											name="nombre"
											onChange={handleChange}
											value={values.nombre}
										/>
									</div>
									<div>
										<input
											id="password"
											className="shadow w-full font-nunito bg-slate-50 font-semibold text-sm  text-center border-none h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
											placeholder="Introduce tu contraseña"
											type="password"
											name="password"
											onChange={handleChange}
											value={values.password}
										/>
									</div>
									<div className="flex" style={{ justifyContent: "flex-end" }}>
										<button
											type="submit"
											className=" w-auto text-right  p-2 rounded-3xl hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-500  
													 font-semibold mt-3"
										>
											<FaChevronRight size={30} />
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
					<div
						className="flex items-center my-6 before:flex-1 mt-16
					  before:border-t before:border-gray-300 
					  before:mt-0.5 after:flex-1 after:border-t 
					  after:border-gray-300 after:mt-0.5"
					>
						<p className="text-center text-xs text-slate-400 mx-4 mb-0 font-nunito">Nuestras redes</p>
					</div>
					<div className="text-center mx-auto flex w-full gap-2">
						<div className="flex items-center justify-center w-1/2 h-12 rounded-xl shadow  text-center bg-slate-50">
							<a href="https://facebook.com/Canavaro-289165874501296/">
								<FaFacebook className="text-blue-700" size={30} />
							</a>
						</div>
						<div className="flex justify-center items-center w-1/2 h-12 rounded-xl shadow bg-slate-50">
							<a className="flex items-center" href="https://facebook.com/Canavaro-289165874501296/">
								<Image src="/images/logoig.png" width={30} height={30} alt="logo" />
							</a>
						</div>
					</div>
					<h1 className="font-light pt-4 text-center text-base font-nunito text-gray-400">Pelliza 1794 - Olivos</h1>
				</div>
			</div>
		</div>
	);
}
