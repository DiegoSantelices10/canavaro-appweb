import Head from "next/head";
import Navbar from "/components/navbar"



export default function Layout( { children } ) {
  return (
    <div>
        <Head>
            <title>Cavanaro</title>
        </Head>
            <Navbar/>
            <main className="bg-slate-50">{children}</main>
    </div>
  )
}
