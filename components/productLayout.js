/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PizzaInfo from './pizzaInfo';
import { FiShoppingCart, FiChevronsLeft } from 'react-icons/fi';
import Promotion from './promotion';

import {
	addProductPizza,
	addProductEmpanada,
	decrementProduct,
	calculateSubTotal,
	calculateTotalQuantity,
	addPromoOrderList,
	clearOrderPromo,
} from 'store/reducers/orderSlice';

import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export default function ProductLayout({
	data,
	data: { id, nombre, descripcion, categoria, cantidadMaxima, imagen, tamanio, precio, cantidad },
}) {
	const { orderPromo } = useSelector(state => state.order);
	const { orderList } = useSelector(state => state.order);

	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calculateSubTotal());
		dispatch(calculateTotalQuantity());
	}, [orderList, dispatch]);

	const productQuantity = id => {
		const pre = orderList.find(item => item.id === id);
		return pre?.cantidad ? pre.cantidad : 0;
	};

	const incrementCartEmpanada = data => {
		dispatch(addProductEmpanada(data));
	};
	const incrementCartPizza = data => {
		dispatch(addProductPizza(data));
	};

	const decrementCart = data => {
		dispatch(decrementProduct(data));
	};

	const returnHome = () => {
		if (categoria === 'promociones') {
			Swal.fire({
				title: 'Estas seguro que deseas salir?',
				showDenyButton: true,
				confirmButtonText: 'Descartar',
			}).then(result => {
				if (result.isConfirmed) {
					dispatch(clearOrderPromo());
					router.push('/home');
				}
			});
		}
	};

	const addCartPromo = value => {
		const res = value.some(element => element.id === 25 || element.id === 26 || element.id === 27);
		console.log(res);
		if (res) {
			dispatch(addPromoOrderList(...value));
		} else {
			console.log('entro');
			const promo = {
				id,
				nombre,
				productos: { ...value },
				descripcion,
				imagen,
				categoria,
				cantidadMaxima,
				precio,
				cantidad: 1,
			};
			dispatch(addPromoOrderList(promo));
		}

		Swal.fire({
			icon: 'success',
			title: '¡El pedido fue ingresado con exito!',
		});
		dispatch(clearOrderPromo());
		router.push('/home');
	};
	return (
		<div className="font-poppins min-h-screen  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5">
			<div className="relative overflow-hidden h-auto  mx-auto  ">
				<div className=" overflow-hidden w-auto">
					<Image
						src={imagen || ''}
						layout="responsive"
						width={100}
						height={40}
						objectFit="cover"
						objectPosition="center"
						alt={nombre || 'img'}
					/>
					<button onClick={returnHome}>
						<FiChevronsLeft className="absolute text-slate-800 bg-slate-50 rounded-full p-1 top-4 left-4" size={30} />
					</button>
				</div>
			</div>

			<div className=" bg-slate-100 content-between pt-1 w-full    h-auto   height-pro">
				<style jsx>{`
					.height-pro {
						height: -webkit-fill-available;
					}
				`}</style>

				<div className="flex flex-col tracking-wide w-full">
					<div className="w-full bg-white p-3 py-5 ">
						<h1 className="font-bold text-base text-gray-800">{nombre}</h1>
						<p className="font-roboto font-normal text-sm py-1 text-gray-400">{descripcion}</p>
						{categoria === 'promociones' ? (
							<p className="font-roboto font-normal  text-sm text-gray-400">$ {precio}</p>
						) : (
							''
						)}
					</div>

					<div className="text-sm font-semibold text-left bg-white p-3 my-1">
						{categoria === 'pizzas' ? (
							<div className=" flex flex-col gap-y-2 pt-5 justify-evenly">
								<PizzaInfo
									data={data}
									incrementCart={incrementCartPizza}
									decrementCart={decrementCart}
									cart={orderList}
								/>
							</div>
						) : categoria === 'empanadas' ? (
							<div className="flex gap-y-2 py-2 justify-between items-center">
								<div className="w-auto">
									<h2 className="font-semibold text-normal text-gray-800">
										Empanada <span className="text-xs font-normal font-roboto text-gray-400">x unidad</span>
									</h2>
								</div>
								<div className="w-1/3 font-medium text-base pl-1">{<h2>$ {precio}</h2>}</div>
								<div className="w-auto   px-3 text-end space-x-4 text-base">
									<button
										type="button"
										className="text-red-500"
										onClick={() => decrementCart({ id, nombre, categoria, tamanio, precio, imagen })}
									>
										-
									</button>
									<span className="font-normal">{productQuantity(id)}</span>
									<button
										type="button"
										className="text-green-500"
										onClick={() => incrementCartEmpanada({ id, nombre, categoria, tamanio, precio, imagen })}
									>
										+
									</button>
								</div>
							</div>
						) : (
							<Promotion data={data} quantity={productQuantity} cantMax={cantidadMaxima} />
						)}
					</div>
				</div>

				<div className="font-normal text-left text-sm pb-24 pt-5 bg-white p-3 max-h-full">
					<h1 className="pb-1">Comentarios</h1>
					<input type="text" className="border border-slate-500 rounded-md w-full p-2" />
				</div>
			</div>

			{data.categoria === 'promociones' ? (
				<div className="font-poppins w-full fixed bottom-0 p-4 border-t-2 bg-slate-50 sm:w-4/5 md:w-3/5 lg:w-2/5">
					<button
						className="flex justify-center gap-3 text-center rounded-md w-full p-4 bg-red-600 hover:bg-red-500 hover:-translate-y-1 
						transition-all duration-500 text-white text-base font-semibold "
						onClick={() => {
							addCartPromo(orderPromo);
						}}
					>
						Agregar al Carrito
						<FiShoppingCart size={23} />{' '}
					</button>
				</div>
			) : (
				<div className="w-full fixed bottom-0 p-4 border-t-2 bg-slate-50 lg:w-1/3">
					<Link href="/cart">
						<a
							className="flex justify-center gap-3 text-center rounded-md w-full p-4 bg-red-600 hover:bg-red-500 hover:-translate-y-1 
                  					   transition-all duration-500 text-white text-base font-semibold "
						>
							Ver Carrito
							<FiShoppingCart size={23} />{' '}
						</a>
					</Link>
				</div>
			)}
		</div>
	);
}

// export async function getServerSideProps() {
// 	const res = await getProducts();

// 	return {
// 		props: {
// 			products: res,
// 		},
// 	};
// }
