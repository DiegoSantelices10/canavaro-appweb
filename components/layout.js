import Head from "next/head";
import Navbar from "/components/navbar"



export default function Layout( { children, title } ) {
  return (
    <div>
        <Head>
            <title>Cavanaro</title>
        </Head>
            <div className="w-full min-h-screen sm:w-1/2 md:w-1/2 lg:w-2/5 mx-auto bg-blue-900">
            <Navbar title={title}/>
            <main className="font-poppins max-h-screen">{children}</main>
            </div>
            
    </div>
  )
} 
