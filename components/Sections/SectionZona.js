import Image from "next/image";

const SectionZona = () => {
  return (
    <div className=" bg-black w-full h-full">
      <div className="relative p-2 h-full  
          rounded-lg w-full lg:w-4/5 mx-auto 
					">
        <h1 className="relative font-montserrat py-4  w-full 
              text-center text-gray-200  text-2xl lg:text-3xl 
              font-semibold ">Contacto</h1>
        <hr className="py-2" />
        <div className="text-center text-white grid  mt-6 h-full  font-montserrat ">
          <div className="flex flex-wrap justify-center items-center ">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
              <h1 className="font-bold text-xl">HORARIOS DE ATENCI&Oacute;N</h1>
              <p className="font-normal">De Martes a Domingo</p>
              <p className="font-normal">De 19 a 23hs.</p>
            </div>
            <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
              <h1 className="font-bold  text-xl">DIRECCI&Oacute;N DEL LOCAL</h1>
              <p className="font-normal">Mariano Pelliza 1794, Esquina D. F. Sarmiento</p>
              <p className="font-normal">Zona Olivos</p>
            </div>
            <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
              <h1 className="font-bold  text-xl">TELEFONO DE CONTACTO</h1>
              <p className="font-normal">4711 3259</p>
              <p className="font-normal">11 2714 5669</p>
            </div>
            <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
              <h1 className="font-bold  text-xl">ZONA DE ENV&Iacute;O</h1>
              <p className="font-normal">Vicente L&oacute;pez - Florida - Olivos</p>
              <p className="font-normal">La Lucila - Mart&iacute;nez - Munro</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold  text-lg">SEGUINOS EN</h1>
            <div className="text-center mx-auto flex w-full gap-2 mt-2 justify-center">

              <div className="flex justify-center items-center p-4 rounded-full shadow bg-white ">
                <a
                  className="flex items-center justify-center"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/pizzeria_canavaro/"
                >
                  <Image src="/images/logoig.webp" width={30} height={30} alt="logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionZona;