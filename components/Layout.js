/* eslint-disable react/prop-types */
import Head from "next/head";
import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen ">
      <Head>
        <title>Pizzeria Canavaro</title>
      </Head>
      <Navbar />
      <Toaster />
      <div className="w-full  mx-auto min-h-screen bg-white">
        <main className="font-montserrat px-3 shadow-md w-full mx-auto min-h-screen sm:w-4/5 md:w-3/5 lg:w-1/2">{children}</main>
      </div>
    </div>
  );
}
