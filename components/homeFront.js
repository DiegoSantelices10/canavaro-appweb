import Link from "next/link";
import { Element } from "react-scroll";
function HeroHome() {
	return (
		<Element name="home" className="relative element h-screen">
			{/* Illustration behind hero content */}

			<div className="font-nunito max-w-6xl mx-auto px-4 sm:px-6">
				{/* Hero content */}
				<div className="pt-32 pb-12 md:pt-40 md:pb-20">
					{/* Section header */}
					<div className="text-center pb-12 md:pb-16 w-full">
						<div className="text-5xl lg:text-8xl mx-auto  text-center flex w-full justify-center items-center ">
							<h1 className=" w-auto  font-extrabold leading-tighter tracking-tighter  text-gray-50">Pizzeria</h1>
							<h1 className="w-auto  font-extrabold text-gray-50 pl-2">Canavaro</h1>
						</div>
						<div className="max-w-3xl mx-auto">
							<p className="text-base sm:text-xl font-semibold text-gray-300 mb-8">
								Las mejores pizzas, empanadas y canastitas de Olivos, veni a probarlas !
							</p>
							<div className=" mx-auto flex justify-center w-full">
								<div>
									<Link href={"/order/login"}>
										<a className="btn font-bold font-nunito text-base bg-white  px-5 py-3 mb-4  sm:mb-0">
											HAC&Eacute; TU PEDIDO
										</a>
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
