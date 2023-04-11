import { useEffect, useState } from "react";
import Link from "next/link";

function Header() {
	const [top, setTop] = useState(true);
	const [isNavOpen, setIsNavOpen] = useState(false);

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
						<h1>CANAVARO</h1>
					</div>

					{/* Site navigation */}

					<nav className="flex flex-grow font-nunito justify-end">
						<section className="MOBILE-MENU block sm:block md:hidden lg:hidden">
							<div className="HAMBURGER-ICON space-y-2" onClick={() => setIsNavOpen(prev => !prev)}>
								<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>{" "}
								<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
								<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
							</div>

							<div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
								<div className="absolute top-0 right-0 px-8 py-8" onClick={() => setIsNavOpen(false)}>
									<svg
										className="h-8 w-8 text-gray-600"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<line x1="18" y1="6" x2="6" y2="18" />
										<line x1="6" y1="6" x2="18" y2="18" />
									</svg>
								</div>
								<ul className="flex flex-col items-center justify-between min-h-[250px]">
									<li className="border-b border-gray-400 my-4 uppercase">
										<Link href="/about">
											<a>Pizzas</a>
										</Link>
									</li>
									<li className="border-b border-gray-400 my-4 uppercase">
										<Link href="/about">
											<a>Empanadas</a>
										</Link>
									</li>
									<li className="border-b border-gray-400 my-4 uppercase">
										<Link href="/about">
											<a>Nuestros combos</a>
										</Link>
									</li>
									<div
										className={`p-2 rounded-md 
										bg-gray-900 w-auto px-5 hover:bg-white text-white hover:text-gray-900  hover:-translate-y-1
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
						</section>

						<div>
							<ul className="DESKTOP-MENU hidden sm:hidden md:flex lg:flex  md:flex-grow justify-end gap-4 flex-wrap items-center">
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
					<style>{`
      .hideMenuNav {
         display: none;
       }
       .showMenuNav {
         display: block;
         position: absolute;
         width: 100%;
         height: 100vh;
         top: 0;
         left: 0;
         background: white;
         z-index: 10;
         display: flex;
         flex-direction: column;
         justify-content: space-evenly;
         align-items: center;
		       }    `}</style>
				</div>
			</div>
		</header>
	);
}

export default Header;
