import { Provider } from 'react-redux';
import { wrapper } from 'store/app/store';
import 'styles/globals.css';

function MyApp({ Component, ...rest }) {
	const { store, props } = wrapper.useWrappedStore(rest);
	return (
		<Provider store={store}>
			<Component {...props.pageProps} />
		</Provider>
	);
}

export default MyApp;
