import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CircleAnimation = () => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    // Actualiza el contador cada segundo
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    // Redirecciona cuando el contador llega a cero
    if (countdown === 0) {
      clearInterval(timer);
      router.push("/"); // Reemplaza '/pagina-principal' con la ruta de tu página principal
    }

    // Limpia el temporizador al desmontar el componente
    return () => clearInterval(timer);
  }, [countdown, router]);

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
        initial={{
          width: "100vw",
          height: "100vw",
          borderRadius: "50%",
          backgroundColor: "#5EEF7B",
        }}
        animate={{ width: 0, height: 0, borderRadius: "50%", backgroundColor: "#5EEF7B" }}
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
          <BsFillCheckCircleFill
            style={{
              fontSize: "60px",
              color: "#5EEF7B",
              margin: "auto",
            }}
          />
          <h2 className="text-black font-poppins text-xl font-bold w-full mt-5">Tu pedido fue realizado con éxito! </h2>
          <h3 className="text-black font-poppins text-xl font-bold">Muchas gracias!</h3>
          <p className="text-black  font-bold font-nunito text-base py-2">
            En {countdown} segundos se redirecciona a la pagina principal...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CircleAnimation;
