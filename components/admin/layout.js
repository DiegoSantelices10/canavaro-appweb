import AccessMenu from "components/admin/menu";
import Head from "next/head";
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => (
	<div className="h-screen w-full">
		<Head>
			<title>D&amp;P</title>
		</Head>
		<main className="h-screen  bg-slate-50 font-sans w-full">
			<AccessMenu />
			{children}
		</main>
	</div>
);

export default Layout;
