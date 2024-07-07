import Image from "next/image";
import { Formik, Form, Field } from "formik";
// import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";

export default function Register() {
  // const router = useRouter();

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
            <h1 className="font-extrabold text-center text-3xl font-montserrat">¡Bienvenido!</h1>
            <h3 className="font-medium text-lg font-montserrat">Registro de usuario</h3>
          </div>
          <div className="flex flex-col gap-3">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={async values => {
                await axios.post("/api/auth/register", values);
              }}
            >
              {() => (
                <Form>
                  <div className="mb-3">
                    <Field
                      id="username"
                      className="shadow w-full font-montserrat font-semibold bg-slate-50  text-sm border-none text-center  h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
                      placeholder="Introduce tu usuario"
                      type="text"
                      name="username"
                    />
                  </div>
                  <div>
                    <Field
                      id="password"
                      className="shadow w-full font-montserrat bg-slate-50 font-semibold text-sm  text-center border-none h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
                      placeholder="Introduce tu contraseña"
                      type="password"
                      name="password"
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
        </div>
      </div>
    </div>
  );
}
