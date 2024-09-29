import AccessMenu from "components/Admin/AccessMenu";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full lg:flex block ">
      <Head>
        <title>Pizzeria Canavaro</title>
      </Head>
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-12 lg:col-span-2 relative">
          <AccessMenu />
        </div>
        <Toaster />
        <main className="col-span-12 p-2 lg:col-span-10 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
