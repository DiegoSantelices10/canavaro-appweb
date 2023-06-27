import AccessMenu from "components/admin/menu";
import Head from "next/head";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <Head>
        <title>Pizzeria Canavaro</title>
      </Head>

      <main className="max-h-max  bg-slate-50 font-sans w-full">
        <AccessMenu />
        {children}
      </main>
    </div>
  );
};

export default Layout;
