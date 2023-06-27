import axios from "axios";
import AccessMenu from "components/admin/menu";
import Head from "next/head";
import { useRouter } from "next/router";
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const router = useRouter();

  const signOut = async () => {
    await axios
      .get("/api/auth/logout")
      .then(res => {
        if (res.data.message) {
          router.push("/admin/auth/login");
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  return (
    <div className="h-screen w-full">
      <Head>
        <title>Pizzeria Canavaro</title>
      </Head>
      <nav className="w-full bg-white   mx-auto   ">
        <div className="w-full flex justify-between px-3  items-center sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto  h-full ">
          <button onClick={signOut} className="font-poppins font-semibold">
            cerrar sesion
          </button>
        </div>
      </nav>
      <main className="max-h-max  bg-slate-50 font-sans w-full">
        <AccessMenu />
        {children}
      </main>
    </div>
  );
};

export default Layout;
