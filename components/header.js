import { useEffect, useState } from "react";
import { Link } from "react-scroll";
// import { motion } from "framer-motion";
import { useRouter } from "next/router";
import moment from "moment-timezone";

function Header() {
  const [top, setTop] = useState(true);
  // const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const hora = moment.tz("America/Argentina/Buenos_Aires").format("HH");
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  const hoursDelivery = () => {
    if (hora >= 19 && hora < 23) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  useEffect(() => {
    hoursDelivery();
  }, [])

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && "bg-black bg-opacity-70 backdrop-blur-sm shadow-lg"
        }`}
    >
      <div className="w-full sm:w-full md:w-full lg:w-11/12 mx-auto  sm:px-6">
        <div className="flex items-center lg:justify-end justify-center px-3 h-16 md:h-20">
          <nav className="flex font-nunito lg:justify-end">
            <ul className="flex gap-5  lg:hidden">
              <li>
                <Link to="pizzas" spy={true} smooth={true} offset={-80} duration={500}>
                  <button
                    className={`text-white    rounded-md pointer-events-auto text-lg font-bold   p-2 px-4 block items-center transition duration-150 ease-in-out`}
                    aria-current="page"
                  >
                    Pizzas
                  </button>
                </Link>
              </li>
              <li>
                <Link to="empanadas" spy={true} smooth={true} offset={-80} duration={500}>
                  <button
                    className={`text-white  font-bold  rounded-md px-4 text-lg   p-2 block items-center transition duration-150 ease-in-out`}
                    aria-current="page"
                  >
                    Empanadas
                  </button>
                </Link>
              </li>
              <li>
                <Link to="combos" spy={true} smooth={true} offset={-80} duration={500}>
                  <button
                    className={`text-white   font-bold  px-4 rounded-md text-lg   p-2 block items-center transition duration-150 ease-in-out`}
                    aria-current="page"
                  >
                    Combos
                  </button>
                </Link>
              </li>
            </ul>

            <div className="flex justify-end">
              <ul className="DESKTOP-MENU hidden md:hidden lg:gap-5 lg:justify-end lg:flex  md:flex-grow justify-end gap-4 flex-wrap items-center">
                <li>
                  <Link to="home" spy={true} smooth={true} offset={0} duration={500}>
                    <button
                      className={`text-white font-medium   p-2 block items-center transition duration-150 ease-in-out`}
                      aria-current="page"
                    >
                      Home
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="pizzas" spy={true} smooth={true} offset={-80} duration={500}>
                    <button
                      className={`text-white pointer-events-auto font-medium   p-2 block items-center transition duration-150 ease-in-out`}
                      aria-current="page"
                    >
                      Pizzas
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="empanadas" spy={true} smooth={true} offset={-80} duration={500}>
                    <button
                      className={`text-white font-medium   p-2 block items-center transition duration-150 ease-in-out`}
                      aria-current="page"
                    >
                      Empanadas
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="combos" spy={true} smooth={true} offset={-80} duration={500}>
                    <button
                      className={`text-white font-medium   p-2 block items-center transition duration-150 ease-in-out`}
                      aria-current="page"
                    >
                      Combos
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="zonaCobertura" spy={true} smooth={true} offset={-80} duration={500}>
                    <button
                      className={`text-white font-medium   p-2 block items-center transition duration-150 ease-in-out`}
                      aria-current="page"
                    >
                      Contacto
                    </button>
                  </Link>
                </li>
                {open && (

                  <button onClick={() => router.push("/welcomeLogo")} className="p-3 rounded-md font-bold font-nunito  text-base  mx-auto 
                                    bg-white t hover:bg-black hover:text-white   
                                      hover:-translate-y-1 transition-all duration-500">
                    Hac&eacute; tu pedido
                  </button>
                )}
              </ul>
            </div>
          </nav>
          <style>{`
							.hideMenuNav {
								display: none;
							}
							.showMenuNav {
								display: block;
								position: absolute;
								width: 100%;
								height: 70vh;
								top: 0;
								left: 0;
								background: white;
								z-index: 10;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
		      				 }    `}</style>
        </div>
      </div>
    </header>
  );
}

export default Header;
