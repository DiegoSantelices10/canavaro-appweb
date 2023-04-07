/* eslint-disable react/prop-types */
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

export default function Navbar({ nombre }) {
	return (
		<nav className="w-full bg-white   mx-auto fixed h-[8%]  top-0  z-50  ">
			<div className="w-full flex justify-between px-3  items-center sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto  h-full ">
				<div className="font-poppins font-semibold">
					Hola <span className="font-medium">{nombre}</span>
				</div>
				<div className="p-1 rounded-md bg-red-500 w-32 px-2">
					<Link href="/order/cart">
						<a className="flex justify-around items-center">
							<p className=" text-white p-1 font-nunito font-bold">Tu carrito</p>
							<FiShoppingCart className="text-white" size={20} />
						</a>
					</Link>
				</div>
			</div>
		</nav>
	);
}
