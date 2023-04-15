import Link from "next/link";
import { Element } from "react-scroll";
function HeroHome() {
	return (
		<Element name="home" className="relative element h-screen">
			<div className="bg-image font-nunito w-full h-full mx-auto">
				<div className="absolute inset-0 bg-black bg-opacity-50"> </div>
				<style jsx>{`
					.bg-image {
						background-image: url(/images/fondo1.png);
						background-size: cover;
						background-position: center center;
						width: 100%;
					}
				`}</style>

				<div className="absolute top-60 inset-1 text-center h-full">
					<div className="flex flex-col justify-center gap-y-20 lg:gap-y-5 ">
						<div className="text-5xl lg:text-8xl mx-auto  text-center ">
							<h1 className="w-auto  font-extrabold leading-tighter tracking-tighter  text-gray-50">
								Pizzeria Canavaro
							</h1>
							<p className="px-2  text-base font-semibold text-gray-300 mb-8">
								¡Pizzas, empanadas y canastitas, todo en un solo lugar!
							</p>
						</div>

						<div className="w-full">
							<p className="text-base px-2 sm:text-lg font-semibold text-gray-300 mb-5">Pelliza 1794, Olivos.</p>
							<Link href={"/order/login"}>
								<a
									className={`p-4 rounded-md font-bold font-nunito text-base w-auto mx-auto px-8   bg-white mt-5 hover:bg-gray-900 hover:text-white   hover:-translate-y-1
											transition-all duration-500`}
								>
									HAC&Eacute; TU PEDIDO
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Element>
	);
}

export default HeroHome;
