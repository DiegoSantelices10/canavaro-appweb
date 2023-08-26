import { useEffect, useState } from "react";
import { Link } from "react-scroll";
// import { motion } from "framer-motion";
import { useRouter } from "next/router";

function Header() {
  const [top, setTop] = useState(true);
  // const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

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
            {/* <section className="MOBILE-MENU block sm:block  md:block lg:hidden">
              <div className="HAMBURGER-ICON space-y-2" onClick={() => setIsNavOpen(prev => !prev)}>
                <span className={`block h-0.5 w-8 animate-pulse	bg-white `}></span>
                <span className={`block h-0.5 w-8 animate-pulse bg-white`}></span>
                <span className={`block h-0.5 w-8 animate-pulse bg-white`}></span>
              </div>

              <motion.div
                className={isNavOpen ? "showMenuNav" : "hideMenuNav"}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <div className="absolute top-0 right-0 px-8 py-8" onClick={() => setIsNavOpen(false)}>
                  <svg
                    className="h-8 w-8 "
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <div className="mt-5">
                  <ul className="flex flex-col justify-start text-center gap-x-3">
                    <li className=" my-4 uppercase">
                      <Link to="home" smooth={true} offset={0} duration={500}>
                        <button onClick={() => setIsNavOpen(false)}>Home</button>
                      </Link>
                    </li>
                    <li className=" my-4 uppercase">
                      <Link to="pizzas" smooth={true} offset={-65} duration={500}>
                        <button onClick={() => setIsNavOpen(false)}>Pizzas</button>
                      </Link>
                    </li>
                    <li className=" my-4 uppercase">
                      <Link to="empanadas" smooth={true} offset={-65} duration={500}>
                        <button onClick={() => setIsNavOpen(false)}>Empanadas</button>
                      </Link>
                    </li>
                    <li className=" my-4 uppercase">
                      <Link to="combos" smooth={true} offset={-65} duration={500}>
                        <button onClick={() => setIsNavOpen(false)}>Nuestros Combos</button>
                      </Link>
                    </li>
                    <li className=" my-4 uppercase">
                      <Link to="zonaCobertura" smooth={true} offset={-65} duration={500}>
                        <button onClick={() => setIsNavOpen(false)}>Contacto</button>
                      </Link>
                    </li>
                    {/* <button
                      onClick={() => router.push("/welcomeLogo")}
                      className={`p-4 rounded font-semibold font-nunito text-base w-auto mx-auto px-6   bg-gray-900 text-white mt-5 hover:bg-white hover:text-neutral-900   hover:-translate-y-1
											transition-all duration-500`}
                    >
                      HAC&Eacute; TU PEDIDO
                    </button> 
                  </ul>
                </div>
              </motion.div>
            </section> */}

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
                <div
                  className={`p-3 bg-gray-50 w-auto px-4 hover:bg-gray-900 hover:text-gray-50 hover:-translate-y-1
											transition-all duration-500 rounded-xl`}
                >
                  <button onClick={() => router.push("/welcomeLogo")} className="flex justify-around items-center">
                    <p className="text-base font-nunito font-semibold">HAC&Eacute; TU PEDIDO</p>
                  </button>
                </div>
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
