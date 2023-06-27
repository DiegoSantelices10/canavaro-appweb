/* eslint-disable react/prop-types */
import Head from "next/head";
import Navbar from "components/navbar";

export default function Layout({ children }) {
  return (
    <div className="h-full ">
      <Head>
        <title>Cavanaro</title>
      </Head>
      <Navbar />
      <div className="w-full  mx-auto h-full ">
        <main className="font-nunito  w-full mx-auto max-h-screen sm:w-4/5 md:w-4/5 lg:w-3/5">{children}</main>
      </div>
    </div>
  );
}
