import AccessMenu from "components/admin/menu";
import Head from "next/head";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full lg:flex block bg-gray-100">
      <Head>
        <title>Pizzeria Canavaro</title>
      </Head>
      <div className="w-full lg:w-24 shadow lg:fixed lg:h-full">
        <AccessMenu />
      </div>

      <main className="max-h-max  bg-gray-100 w-full lg:pl-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
