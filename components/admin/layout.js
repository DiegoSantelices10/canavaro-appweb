import AccessMenu from "components/admin/menu";
import Head from "next/head";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full lg:flex block ">
      <Head>
        <title>Pizzeria Canavaro</title>
      </Head>
      <div className="w-full lg:w-2/12 bg-sky-700 lg:h-full lg:fixed">
        <AccessMenu />
      </div>

      <main className="max-h-max  w-full lg:w-10/12 lg:absolute lg:right-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
