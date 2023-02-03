import Head from 'next/head';
import Navbar from '/components/navbar';

export default function Layout({ children, title }) {
	return (
		<div className="h-full ">
			<Head>
				<title>Cavanaro</title>
			</Head>
			<Navbar title={title} />
			<div className="w-full  mx-auto ">
				<main className="font-poppins border-x-2 w-full mx-auto max-h-screen sm:w-4/5 md:w-4/5 lg:w-3/5">
					{children}
				</main>
			</div>
		</div>
	);
}
