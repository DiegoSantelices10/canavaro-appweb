import Image from "next/image";
import { Element } from "react-scroll";
export default function sectionCombos() {
	return (
		<Element name="combos" className="p-3 w-full  element">
			<h1 className="text-center p-3 text-2xl font-extrabold">Nuestros Combos</h1>
			<div className="flex justify-center h-32 items-center w-full gap-10">
				<div className="text-center h-28 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/empanada.png"} width={90} height={75} alt="empanada" />
					</div>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center ">
						<Image
							src={"/images/pizza-vector-negro.png"}
							width={70}
							height={70}
							alt="pizza"
						/>
					</div>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center ">
						<Image src={"/images/canastita.png"} width={90} height={90} alt="canastita" />
					</div>
				</div>
			</div>
			<div className="bg-black bg-opacity-80 w-full lg:w-4/5 mx-auto text-white grid lg:grid-cols-3 gap-5 content-center py-7">
				<div>
					<h1 className="col-span-2 font-bold text-xl text-center">Combo 1</h1>
					<p className="text-white text-center">1/2 Jamon</p>
					<p className="text-white text-center">1/2 Napolitana</p>
				</div>
				<div>
					<h1 className="col-span-2 font-bold text-xl text-center">Combo 2</h1>
					<p className="text-white text-center">1/4 Jamon - 1/4 Napolitana</p>
					<p className="text-white text-center">1/4 Muzzarella - 1/4 Fugazzeta</p>
				</div>
				<div>
					<h1 className="col-span-2 font-bold text-xl text-center">Combo 3</h1>
					<p className="text-white text-center">1/4 Jamon y morron - 1/4 Super Napo</p>
					<p className="text-white text-center">1/4 Fuga de la casa - 1/4 Calabresa</p>
				</div>
				<div>
					<h1 className="col-span-2 font-bold text-xl text-center">Combo 4</h1>
					<p className="text-white text-center">Combo 1 o Combo 2</p>
					<p className="text-white text-center">más 6 Empanadas</p>
				</div>
				<div>
					<h1 className="col-span-2 font-bold text-xl text-center">Combo 5</h1>
					<p className="text-white text-center">Combo 1 o Combo 2</p>
					<p className="text-white text-center">más 12 Empanadas</p>
				</div>
				<div>
					<h1 className="col-span-2 font-bold text-xl text-center">Combo 6</h1>
					<p className="text-white text-center">Combo 3</p>
					<p className="text-white text-center">más 12 Empanadas</p>
				</div>
			</div>
		</Element>
	);
}
