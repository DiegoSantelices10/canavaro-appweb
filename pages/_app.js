/* eslint-disable react/prop-types */
import { Provider } from "react-redux";
import { wrapper } from "store/app/store";
import "typeface-nunito";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";



function MyApp({ Component, router, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Head>
        <title>Pizzería Canavaro</title>
        <meta name="description" content="La mejor pizzería de Olivos!" />
      </Head>
      <Component {...props.pageProps} />
    </Provider>
  );
}
export default MyApp;
