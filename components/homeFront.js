import Link from "next/link";
import { Element } from "react-scroll";
function HeroHome() {
	return (
		<Element name="home" className="relative element h-screen">
			{/* Illustration behind hero content */}

			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				{/* Hero content */}
				<div className="pt-32 pb-12 md:pt-40 md:pb-20">
					{/* Section header */}
					<div className="text-center pb-12 md:pb-16 w-auto">
						<div className="text-6xl text-center sm:text-6xl md:text-8xl lg:text-8xl flex w-full  lg:flex lg:justify-center lg:items-center gap-3">
							<h1 className=" w-auto  font-extrabold leading-tighter tracking-tighter  text-gray-50">Pizzeria</h1>
							<h1 className="w-auto  font-extrabold text-gray-50 pl-2">Canavaro</h1>
						</div>
						<div className="max-w-3xl mx-auto">
							<p className="text-lg sm:text-xl font-semibold text-gray-300 mb-8">
								Las mejores pizzas, empanadas y canastitas de Olivos, veni a probarlas !
							</p>
							<div className=" mx-auto flex justify-center w-full">
								<div>
									<Link href={"/order/login"}>
										<a className="btn font-bold text-lg bg-white  px-5 py-3 mb-4  sm:mb-0">Hace tu pedido</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Element>
	);
}

export default HeroHome;
