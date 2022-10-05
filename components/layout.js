import Head from "next/head";
import Navbar from "/components/navbar"



export default function Layout( { children } ) {
  return (
    <div>
        <Head>
            <title>Cavanaro</title>
        </Head>
            <Navbar/>
            <main className="bg-slate-50 font-poppins">{children}</main>
    </div>
  )
}
