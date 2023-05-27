import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function menu() {
	return (
		<div className="w-full">
			<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 content-center justify-center items-center w-full mx-auto h-auto py-4">
				<Link href="/admin" passHref>
					<button className="bg-white mx-auto rounded-2xl  shadow-md p-2  h-auto w-32 lg:w-36">
						<div>
							<Image src="/images/pedidosblack.png" width={60} height={60} alt="pedidoblack" />
							<p className="font-bold text-base lg:text-lg">Pedidos</p>
						</div>
					</button>
				</Link>

				<Link href="/admin/products/list" passHref>
					<button className="bg-white mx-auto rounded-2xl   shadow-md p-2  h-auto w-32 lg:w-36">
						<div>
							<Image src="/images/productsblack.png" width={60} height={60} alt="black" />
							<p className="font-bold text-base lg:text-lg">Productos</p>
						</div>
					</button>
				</Link>

				<Link href="/admin/sales" passHref>
					<button className="bg-white mx-auto rounded-2xl   shadow-md p-2  h-auto w-32 lg:w-36">
						<div>
							<Image src="/images/salesblack.png" width={60} height={60} alt="salesblack" />
							<p className="font-bold text-base lg:text-lg">Ventas</p>
						</div>
					</button>
				</Link>

				<Link href="/admin/settings" passHref>
					<button className="bg-white mx-auto rounded-2xl   shadow-md p-2 h-auto w-32 lg:w-36">
						<div>
							<Image src="/images/settingsblack.png" width={60} height={60} alt="settingblack" />
							<p className="font-bold text-base lg:text-lg">Ajustes</p>
						</div>
					</button>
				</Link>
			</div>
		</div>
	);
}
