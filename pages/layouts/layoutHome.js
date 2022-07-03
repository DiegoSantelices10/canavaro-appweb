import Head from "next/head";
import NavBar from "/components/navbar"



export default function layoutHome({children}) {
  return (
    <div>
        <Head>
            <title>Cavanaro</title>
            <NavBar/>
            <main className="bg-red-700">{children}</main>
        </Head>
    </div>
  )
}
