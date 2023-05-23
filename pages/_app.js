/* eslint-disable react/prop-types */
import { Provider } from "react-redux";
import { store } from "store/app/store";
import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, ...props }) {
	// const { store, props } = wrapper.useWrappedStore(rest);
	return (
		<Provider store={store}>
			<Component {...props.pageProps} />
		</Provider>
	);
}

export default MyApp;
