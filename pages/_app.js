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

import "@fontsource/montserrat/100.css"; // Specify weight
import "@fontsource/montserrat/200.css"; // Specify weight
import "@fontsource/montserrat/300.css"; // Specify weight
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/500.css"; // Specify weight
import "@fontsource/montserrat/600.css"; // Specify weight
import "@fontsource/montserrat/700.css"; // Specify weight
import "@fontsource/montserrat/800.css"; // Specify weight
import "@fontsource/montserrat/900.css"; // Specify weight



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
