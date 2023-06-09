/* eslint-disable react/prop-types */
import { Provider } from "react-redux";
import { wrapper } from "store/app/store";
import { AnimatePresence, motion } from "framer-motion";

import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function MyApp({ Component, router, ...rest }) {
	const { store, props } = wrapper.useWrappedStore(rest);
	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={router.route}
				initial="initialState"
				animate="animateState"
				exit="exitState"
				transition={{
					duration: 0.75,
				}}
				variants={{
					initialState: {
						opacity: 0,
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
					},
					animateState: {
						opacity: 1,
						clipPath: "polygon(0 -48px, 100% -48px, 100% 100%, 0% 100%)",
					},
					exitState: {
						clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
					},
				}}
				className="base-page-size"
			>
				<Provider store={store}>
					<Component {...props.pageProps} />
				</Provider>
			</motion.div>
		</AnimatePresence>
	);
}
export default MyApp;
