/* eslint-disable react/prop-types */
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Navbar({ nombre }) {
	const { orderList } = useSelector(state => state.order);
	const [userData, setUserData] = useState({});
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		setUserData(user);
	}, []);

	console.log(userData);
	return (
		<nav className="w-full bg-white   mx-auto fixed h-[8%]  top-0  z-50  ">
			<div className="w-full flex justify-between px-3  items-center sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto  h-full ">
				<div className="font-poppins font-semibold">
					Hola <span className="font-medium">{userData?.nombre}</span>
				</div>
				{orderList.length > 0 && (
					<div className="p-1 rounded-md bg-red-500 w-32 px-2 hover:-translate-y-1 transition-all duration-500">
						<Link href={"/order/cart"}>
							<a className="flex justify-around items-center ">
								<p className=" text-white p-1 font-nunito font-bold">Tu carrito</p>
								<FiShoppingCart className="text-white" size={20} />
							</a>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
