/* eslint-disable react/prop-types */
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

export default function Navbar({ nombre }) {
	return (
		<nav className="w-full   mx-auto fixed h-[8%]  top-0  z-50  ">
			<div className="w-full flex justify-between px-4  items-center sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto bg-zinc-50 h-full border-x-2">
				<div className="font-poppins font-semibold">
					Hola <span className="font-medium">{nombre}</span>
				</div>
				<Link href="/cart">
					<a>
						<FiShoppingCart className="" size={23} />
					</a>
				</Link>
			</div>
		</nav>
	);
}
