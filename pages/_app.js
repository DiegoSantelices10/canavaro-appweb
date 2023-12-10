/* eslint-disable react/prop-types */
import { Provider } from "react-redux";
import { wrapper } from "store/app/store";
import { AnimatePresence, motion } from "framer-motion";
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
    <AnimatePresence>
      <motion.div
        key={router.route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 1.25,
        }}
        variants={{
          initialState: {
            opacity: 0,
          },
          animateState: {
            opacity: 1,
          },
        }}
      >
        <Provider store={store}>

            <Head>
              <title>Pizzería Canavaro</title>
              <meta name="description" content="La mejor pizzería de Olivos!" />
            </Head>
            <Component {...props.pageProps} />

        </Provider>
      </motion.div>
    </AnimatePresence>
  );
}
export default MyApp;
