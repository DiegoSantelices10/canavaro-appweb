import Image from "next/image"
import { useFormik } from 'formik';
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      nombre: "",
      direccion: "",
      telefono: "",

    },
    onSubmit: async function (values) {
     
    router.push("/home")
    localStorage.setItem("user", JSON.stringify(values))

    },
  });


  return (
    <div className="bg-neutral-900 h-screen">
      <div className="flex flex-col justify-center items-center h-full w-screen md:w-1/2 md:mx-auto">
        <div>
          <Image src="/images/logocanavaro.png" width={120} height={120} alt="logo" />
        </div>
        <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="p-2 flex flex-col gap-6" onSubmit={handleSubmit}>
           
            <h1 className="text-slate-100 text-center font-bold text-3xl mb-1">Bienvenidos</h1>
            <div className="rounded-md">
              <input id="nombre" 
                     className="p-2 w-full rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-600" 
                     type="text" 
                     name="nombre" 
                     placeholder="Ingrese su nombre"
                     onChange={handleChange}
                     value={values.nombre} />
            </div>
            <div className="rounded-md">
              <input id="direccion" 
                     className="p-2 w-full rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-600" 
                     type="text" 
                     name="direccion" 
                     placeholder="Ingrese su direccion"
                     onChange={handleChange}
                     value={values.direccion} />
            </div>
            <div className="rounded-md">
              <input id="telefono" 
                     className="p-2 w-full rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-600"
                     type="text" 
                     name="telefono" 
                     placeholder="Ingrese su telefono"
                     onChange={handleChange}
                     value={values.telefono} />
            </div>
            <button type="submit" 
                    className="block w-full bg-cyan-600 py-2 rounded-md 
                    
            hover:bg-cyan-500 hover:-translate-y-1 transition-all duration-500 text-white 
            font-semibold mb-2">Ingresar</button>
         
          </form>
        </div>
      </div>
        </div>

  )
}


