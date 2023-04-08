import React, { useState, useEffect } from "react";
import Link from "next/link";

function Header() {
	const [top, setTop] = useState(true);

	// detect whether user has scrolled the page down by 10px
	useEffect(() => {
		const scrollHandler = () => {
			window.pageYOffset > 10 ? setTop(false) : setTop(true);
		};
		window.addEventListener("scroll", scrollHandler);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, [top]);

	return (
		<header
			className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
				!top && "bg-white backdrop-blur-sm shadow-lg"
			}`}
		>
			<div className="max-w-6xl mx-auto px-5 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Site branding */}
					<div
						className={`flex-shrink-0 mr-4 ${
							!top ? "text-gray-800" : "text-white"
						} font-extrabold font-nunito tracking-wider  text-xl`}
					>
						{/* Logo */}
						<h1>PIZZERIA CANAVARO</h1>
					</div>

					{/* Site navigation */}
					<nav className="flex flex-grow font-nunito">
						<ul className="flex flex-grow justify-end gap-4 flex-wrap items-center">
							<li>
								<Link href={"/signin"}>
									<a
										className={`${
											!top ? "text-gray-800" : "text-white"
										} font-medium   p-2 flex items-center transition duration-150 ease-in-out`}
									>
										Pizzas
									</a>
								</Link>
							</li>
							<li>
								<Link href={"/signin"}>
									<a
										className={`${
											!top ? "text-gray-800" : "text-white"
										} font-medium   p-2 flex items-center transition duration-150 ease-in-out`}
									>
										Empanadas
									</a>
								</Link>
							</li>
							<li>
								<Link href={"/signin"}>
									<a
										className={`${
											!top ? "text-gray-800" : "text-white"
										} font-medium   p-2 flex items-center transition duration-150 ease-in-out`}
									>
										Promociones
									</a>
								</Link>
							</li>

							<div
								className={`p-1 rounded-md ${
									!top && "bg-gray-900 text-white"
								} bg-white w-auto px-2 hover:bg-red-500 hover:text-gray-50  hover:-translate-y-1 
											transition-all duration-500`}
							>
								<Link href={"/order/login"}>
									<a className="flex justify-around items-center">
										<p className="  p-1 font-nunito font-bold">Hace tu pedido</p>
									</a>
								</Link>
							</div>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
