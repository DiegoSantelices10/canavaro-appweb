import { Formik, Form, Field } from "formik";
import { FaChevronRight, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAuth } from "store/reducers/authSlice";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '10px',
            border: '1px solid #334155'
          },
        }}
      />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-red-500 mb-6 shadow-lg shadow-red-600/30">
                <FaLock className="text-2xl text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Bienvenido</h1>
              <p className="text-slate-400 mt-2 text-sm">Ingresa a tu cuenta para continuar</p>
            </div>

            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const res = await axios.post("/api/auth/login", values);
                  if (res.data.token) {
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    dispatch(setAuth({ username: res.data.user, token: res.data.token }));
                    toast.success("¡Acceso concedido!");
                    router.push("/admin/");
                  }
                } catch (error) {
                  if (error.response?.status === 401) {
                    toast.error("Credenciales incorrectas");
                  } else {
                    toast.error("Error al iniciar sesión");
                  }
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-slate-500 group-focus-within:text-red-500 transition-colors" />
                      </div>
                      <Field
                        id="username"
                        name="username"
                        className="block w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="Usuario"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaLock className="text-slate-500 group-focus-within:text-red-500 transition-colors" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className="block w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="Contraseña"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Ingresando...
                        </span>
                      ) : (
                        <>
                          <span>Iniciar Sesión</span>
                          <FaChevronRight className="text-xs" />
                        </>
                      )}
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
