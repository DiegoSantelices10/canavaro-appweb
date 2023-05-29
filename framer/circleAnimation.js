import { CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const CircleAnimation = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.5, delay: 0.5 },
		},
	};

	const textVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	return (
		<div
			style={{
				position: "relative",
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
				backgroundColor: "white",
			}}
		>
			<motion.div
				initial={{ width: "100vw", height: "100vw", borderRadius: "50%", backgroundColor: "red" }}
				animate={{ width: 0, height: 0, borderRadius: "50%", backgroundColor: "red" }}
				transition={{ duration: 1 }}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			/>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: "100%",
					transform: "translate(-50%, -50%)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					textAlign: "center",
				}}
			>
				<motion.div variants={textVariants}>
					<CheckCircleOutlined style={{ fontSize: "64px", color: "red" }} />
					<h2 className="text-black font-poppins text-xl font-bold w-full">Tu pedido fue realizado con éxito! </h2>
					<h3 className="text-black font-poppins text-xl font-bold">Muchas gracias!</h3>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default CircleAnimation;
