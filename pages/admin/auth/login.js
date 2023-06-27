import { Formik, Form, Field } from "formik";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAuth } from "store/reducers/authSlice";
import Swal from "sweetalert2";
export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="h-screen bg-gradient-to-r from-slate-900 to-slate-800 ">
      <div className="h-full w-full lg:w-2/5 md:w-3/5 sm:w-3/5 flex items-center justify-center lg:justify-between mx-auto">
        <div
          className="grid content-center rounded-md shadow-lg bg-white  w-full h-full p-10 
								 lg:h-auto  md:h-auto sm:h-auto"
        >
          <div className="w-auto mx-auto pt-10 pb-4">
            <h1 className="font-extrabold text-center text-3xl font-nunito">¡Bienvenido!</h1>
          </div>
          <div className="flex flex-col gap-3">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={async values => {
                await axios
                  .post("/api/auth/login", values)
                  .then(res => {
                    if (res.data.token) {
                      localStorage.setItem("token", JSON.stringify(res.data.token));
                      dispatch(setAuth({ username: res.data.user, token: res.data.token }));
                      router.push("/admin/");
                    }
                  })
                  .catch(error => {
                    if (error.response.status === 401) {
                      console.log("incorrecto");
                      Swal.fire({
                        icon: "error",
                        text: "Credenciales invalidas !",
                      });
                    }
                  });
              }}
            >
              {() => (
                <Form>
                  <div className="mb-3">
                    <Field
                      id="username"
                      className="shadow w-full font-nunito font-semibold bg-slate-50  text-sm border-none text-center  h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
                      placeholder="Introduce tu usuario"
                      name="username"
                    />
                  </div>
                  <div>
                    <Field
                      id="password"
                      type="password"
                      className="shadow w-full font-nunito bg-slate-50 font-semibold text-sm  text-center border-none h-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-200 mt-1"
                      placeholder="Introduce tu contraseña"
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
