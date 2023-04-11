import Link from "next/link";

function HeroHome() {
	return (
		<section className="relative">
			{/* Illustration behind hero content */}

			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				{/* Hero content */}
				<div className="pt-32 pb-12 md:pt-40 md:pb-20">
					{/* Section header */}
					<div className="text-center pb-12 md:pb-16">
						<h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-gray-50">
							Pizzeria
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-600 pl-2">
								Canavaro
							</span>
						</h1>
						<div className="max-w-3xl mx-auto">
							<p className="text-xl text-gray-300 mb-8">
								Las mejores pizzas, empanadas y canastitas de Olivos, veni a probarlas !
							</p>
							<div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
								<div>
									<Link href={"/order/login"}>
										<a className="btn font-bold text-lg bg-white  w-full mb-4 sm:w-auto sm:mb-0">Hace tu pedido</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroHome;
