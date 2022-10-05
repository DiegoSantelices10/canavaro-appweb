import Image from "next/image"
import { useFormik } from 'formik';
import { useRouter } from 'next/router'
import { FaChevronRight, FaFacebook } from 'react-icons/fa';
import Link from "next/link";



export default function Login() {
  const router = useRouter()
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      direccion: "",
      telefono: "",

    },
    onSubmit: async function (values) {

      router.push("/home")
      localStorage.setItem("user", JSON.stringify(values))

    },
  });


  return (
    <div className="h-screen font-poppins bg-slate-50">
      <div className="flex flex-col h-full justify-center px-4 md:w-1/2 md:mx-auto lg:w-1/3">
        <div className="mx-auto">
          <Image src="/images/logocanavaro.png" width={150} height={150} alt="logo" />
        </div>
        <div className="text-center text-xs text-gray-400 font-normal">
          <h1>Pelliza 1794 - Olivos</h1>
          <p>11-2714-3259</p>
          <p>4711-3259</p>
        </div>
     
        <div className="w-full mt-7">
          <h1 className="text-center font-bold text-lg py-1">Ingresa tus datos</h1>
          <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
            <div >
              <input id="direccion"
                className="shadow w-full font-light text-sm  text-center  h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
                placeholder="Introduce tu dirección"
                type="text"
                name="direccion"
                onChange={handleChange}
                value={values.direccion} />
            </div>
            <div >
              <input id="telefono"
                className="shadow w-full font-light text-sm  text-center  h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
                placeholder="Introduce tu teléfono"
                type="text"
                name="telefono"
                onChange={handleChange}
                value={values.telefono} />
            </div>

            <button type="submit"
              className="self-end w-auto text-right  p-2 rounded-3xl hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-500  
                       font-semibold mt-3"><FaChevronRight size={30} /></button>
          </form>
        </div>
        <div className="w-full mt-10">
            <p className="text-center text-sm text-gray-400 font normal">Nuestras redes</p>
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="flex items-center justify-center w-1/2 h-12 rounded-xl shadow text-center bg-white">
              <a href="https://facebook.com/Canavaro-289165874501296/">
                <FaFacebook className="text-blue-700" size={30} />
              </a>
            </div>
            <div className="flex justify-center items-center w-1/2 h-12 rounded-xl shadow bg-white">
              <a className="flex items-center" href="https://facebook.com/Canavaro-289165874501296/">
                <Image src="/images/logoig.png" width={30} height={30} alt="logo" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}


