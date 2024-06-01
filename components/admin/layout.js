import AccessMenu from "components/admin/menu";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full lg:flex block ">
      <Head>
        <title>Pizzeria Canavaro</title>
      </Head>
      <div className="w-full lg:w-2/12 bg-red-600 lg:h-full lg:fixed lg:rounded-e-3xl">
        <AccessMenu />
      </div>
      <Toaster />


      <main className="max-h-max  w-full lg:w-10/12 lg:absolute lg:right-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
