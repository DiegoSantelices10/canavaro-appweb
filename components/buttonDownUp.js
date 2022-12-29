import { useDispatch } from 'react-redux';

export default function ButtonDownUp({ data, quantity, id }) {
	const dispatch = useDispatch();

	// const increaseCart = data => {
	//   dispatch(addProductList(data))
	// }

	// const decreaseCart = data => {
	//   dispatch(decreaseProductList(data))
	// }

	return (
		<div className="font-roboto w-auto rounded-3xl border  px-3 text-end space-x-4 text-normal">
			<button type="button">-</button>
			<span>0</span>
			<button type="button">+</button>
		</div>
	);
}
