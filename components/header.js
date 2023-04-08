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

					<nav className="flex flex-grow font-nunito justify-end">
						<button
							data-collapse-toggle="navbar-default"
							type="button"
							className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-default"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-6 h-6"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
						<div className="hidden w-full md:block md:w-auto" id="navbar-default">
							<ul className="flex flex-grow justify-end gap-4 flex-wrap items-center">
								<li>
									<a
										href="#"
										className={`${
											!top ? "text-gray-800" : "text-white"
										} font-medium   p-2 block items-center transition duration-150 ease-in-out`}
										aria-current="page"
									>
										Pizzas
									</a>
								</li>
								<li>
									<a
										href="#"
										className={`${
											!top ? "text-gray-800" : "text-white"
										} font-medium   p-2 block items-center transition duration-150 ease-in-out`}
									>
										Empanadas
									</a>
								</li>
								<li>
									<a
										href="#"
										className={`${
											!top ? "text-gray-800" : "text-white"
										} block font-medium   p-2  items-center transition duration-150 ease-in-out`}
									>
										Promociones
									</a>
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
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
