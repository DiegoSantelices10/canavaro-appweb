/* eslint-disable react/prop-types */
import { Provider } from "react-redux";
import { wrapper } from "store/app/store";
import { AnimatePresence, motion } from "framer-motion";
import "typeface-nunito";

import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";



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
            opacity: 2,
          },
        }}
      >
        <Provider store={store}>
          <Component {...props.pageProps} />
        </Provider>
      </motion.div>
    </AnimatePresence>
  );
}
export default MyApp;
