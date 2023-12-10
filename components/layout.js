/* eslint-disable react/prop-types */
import Head from "next/head";
import Navbar from "components/navbar";

export default function Layout({ children }) {
  return (
    <div className="max-h-screen  ">
      <Head>
        <title>Pizzeria Canavaro</title>
      </Head>
      <Navbar />
      <div className="w-full  mx-auto h-screen ">
        <main className="font-nunito bg-white   w-full mx-auto max-h-screen sm:w-4/5 md:w-4/5 lg:w-3/5">{children}</main>
      </div>
    </div>
  );
}
