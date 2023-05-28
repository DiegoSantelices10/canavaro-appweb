import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Element } from "react-scroll";

export default function SectionZona() {
	return (
		<Element name="zonaCobertura" className="p-3 w-full  element font-nunito">
			<h1 className="text-center p-3 text-2xl font-extrabold">Contacto</h1>

			<div className="bg-black p-4 bg-opacity-80 w-full lg:w-4/5 mx-auto text-white md:flex md:justify-between  gap-2 content-center py-10 ">
				<div className="md:w-1/2 text-center grid grid-cols-1 gap-5">
					<div>
						<h1 className="font-bold font-nunito text-lg">Horarios de atencion</h1>
						<p>De Martes a Domingo</p>
						<p>De 19 a 23hs.</p>
					</div>
					<div>
						<h1 className="font-bold  text-lg">Direccion del local</h1>
						<p>Mariano Pelliza 1794, Esquina D. F. Sarmiento</p>
						<p>Zona Olivos</p>
					</div>

					<div>
						<h1 className="font-bold  text-lg">Telefonos de Contacto</h1>
						<p>4711 3259</p>
						<p>11 2714 5669</p>
					</div>
					<div>
						<h1 className="font-bold  text-lg">Zona de Cobertura</h1>
						<p>Vicente Lopez - Florida - Olivos - La Lucila</p>
						<p>Acassuso - Martinez - Munro</p>
					</div>
					<div>
						<h1 className="font-bold  text-lg">Nuestras Redes</h1>
						<div className="text-center mx-auto flex w-full gap-2 justify-center">
							<div className="flex items-center justify-center w-1/4 h-12 rounded-md shadow  text-center bg-white ">
								<a href="https://facebook.com/Canavaro-289165874501296/">
									<FaFacebook className="text-blue-700" size={30} />
								</a>
							</div>
							<div className="flex justify-center items-center w-1/4 h-12 rounded-md shadow bg-white ">
								<a className="flex items-center justify-center" href="https://facebook.com/Canavaro-289165874501296/">
									<Image src="/images/logoig.png" width={30} height={30} alt="logo" />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded-md py-5 md:pr-5 md:py-0  mx-auto flex justify-center w-auto h-4/5 my-auto">
					<Image className="rounded-md mx-auto" src="/images/mapanuevocobertura.jpg" width={600} height={400} alt="zona" />
				</div>
			</div>
		</Element>
	);
}
