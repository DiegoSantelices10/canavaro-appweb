import Image from 'next/image';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FaChevronRight, FaFacebook } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/reducers/userSlice';

export default function Login() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { handleSubmit, handleChange, values } = useFormik({
		initialValues: {
			direccion: '',
			telefono: '',
		},
		onSubmit: async function (values) {
			dispatch(
				setUser({
					direccion: values.direccion,
					telefono: values.telefono,
				})
			);
			router.push('/home');
		},
	});

	return (
		<div className="h-screen bg-gradient-to-r from-slate-900 to-slate-800 font-poppins">
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
						<h1 className="font-bold text-3xl"> ¡Bienvenido!</h1>
					</div>
					<form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
						<div>
							<input
								id="direccion"
								className="shadow w-full bg-slate-50 font-light text-sm  text-center  h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
								placeholder="Introduce tu dirección"
								type="text"
								name="direccion"
								onChange={handleChange}
								value={values.direccion}
							/>
						</div>
						<div>
							<input
								id="telefono"
								className="shadow w-full bg-slate-50 font-light text-sm  text-center  h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
								placeholder="Introduce tu teléfono"
								type="text"
								name="telefono"
								onChange={handleChange}
								value={values.telefono}
							/>
						</div>
						<div className="flex" style={{ justifyContent: 'flex-end' }}>
							<button
								type="submit"
								className=" w-auto text-right  p-2 rounded-3xl hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-500  
						 font-semibold mt-3"
							>
								<FaChevronRight size={30} />
							</button>
						</div>
					</form>
					<div
						className="flex items-center my-6 before:flex-1 mt-16
					  before:border-t before:border-gray-300 
					  before:mt-0.5 after:flex-1 after:border-t 
					  after:border-gray-300 after:mt-0.5"
					>
						<p className="text-center text-xs text-slate-400 mx-4 mb-0">Nuestras redes</p>
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
					<h1 className="font-light pt-4 text-center text-base font-poppins text-gray-400">Pelliza 1794 - Olivos</h1>
				</div>
			</div>
		</div>
	);
}
