import { FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';

export default function Navbar({ title }) {
	return (
		<nav className="w-full fixed h-[8%] bg-white top-0 py-4 px-3  z-50 shadow-md">
			<h1 className="font-semibold  text-lg text-gray-800 tracking-wide  text-center">{title}</h1>
			<Link href="/cart">
				<a>
					<FiShoppingCart className="absolute right-6 top-5" size={23} />
				</a>
			</Link>
		</nav>
	);
}
