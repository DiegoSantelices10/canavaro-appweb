import Head from "next/head"

export default function layoutWelcome({ children }) {
    return (
        <div>
            <Head>
                <title>Cavanaro</title>
            </Head>
            <main className="bg-slate-800">{children}</main>
        </div>
    )
}
