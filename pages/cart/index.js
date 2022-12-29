import React from 'react';
import Layout from 'components/layout';
import { Card } from 'components/card';
import Link from 'next/link';
import Image from 'next/image';

export default function Cart() {
	return (
		<Layout title="Mi pedido">
			<div className=" mx-auto w-full h-full  bg-slate-100  rounded-t-3xl">
				<h2>Detalle del pedido</h2>
				<div>
					<h1>Productos</h1>
					<div className=" rounded-md mb-4 p-3 shadow-md bg-white">
						<div className="flex justify-between items-center gap-x-2">
							<div className="w-full self-start">
								<a className="font-semibold text-sm text-gray-800">Muzzarella</a>
								<p className="text-gray-400 text-xs">Muzzarella con salsa</p>
							</div>

							<Image
								className="rounded-md"
								src="/images/logoig.png"
								priority={true}
								width={140}
								height={140}
								alt="logo"
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
