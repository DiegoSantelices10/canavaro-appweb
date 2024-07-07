import { FaLinkedin } from "react-icons/fa"

export default function footer() {
  return (
    <div className="w-full bg-sky-950 bg-opacity-20 h-32 flex flex-col justify-center items-center">
      <div>
        <h1 className="font-montserrat text-white text-lg font-medium">Desarrollador dinhodev - 2023</h1>
      </div>
      <div>
        <a href="https://linkedin.com/in/diegosantelices10" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={26} className="text-white" />
        </a>
      </div>
    </div>
  );
}
