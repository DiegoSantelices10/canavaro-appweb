/* eslint-disable react/no-unknown-property */
import Link from "next/link";
import { Element } from "react-scroll";
import Image from "next/image";
import { MdOutlineDeliveryDining } from "react-icons/md";

function HomeFront() {
	return (
		<Element name="home" className="relative element h-screen">
			<div className="bg-image font-nunito w-full h-3/5 mx-auto">
				<div className="absolute inset-0 bg-black bg-opacity-30 h-3/5"> </div>
				<style jsx>{`
					.bg-image {
						background-image: url(/images/fondofront.jpg);
						background-size: cover;
						background-position: center center;
						width: 100%;
					}
				`}</style>

				<div className="relative text-center h-full">
					<div className="absolute inset-1 flex flex-col justify-center gap-5">
						<div className="mx-auto ">
							<Image src="/images/logocanavaro.png" width={150} height={150} alt="logo" />
						</div>
						<div>
							<p className="text-xl font-extrabold text-gray-200 ">
								¡Todo lo que necesitas en un solo lugar!
							</p>
							<p className="text-gray-200 font-medium text-base">Pelliza 1794 - Olivos</p>
						</div>
					</div>
				</div>
				<div className="w-full h-auto p-3 mx-auto flex flex-col justify-center items-center gap-1   text-center">
					<MdOutlineDeliveryDining size={60} />

					<div className="text-2xl font-extrabold">
						<h1>Hac&eacute; tu pedido.</h1>
						<h2>¡Nosotros te lo llevamos!</h2>
						<p className="text-base font-medium">De martes a domingos de 19 a 23hs.</p>
					</div>

					<div className="w-full h-20 flex items-center">
						<Link href={"/order/login"}>
							<a
								className={`p-4 rounded-md font-bold font-nunito text-base  mx-auto   bg-gray-900 text-white hover:bg-white hover:text-gray-900   hover:-translate-y-1
											transition-all duration-500`}
							>
								HAC&Eacute; TU PEDIDO
							</a>
						</Link>
					</div>
					<h1 className="text-lg">Delivery & Take Away</h1>
				</div>
			</div>
		</Element>
	);
}

export default HomeFront;
