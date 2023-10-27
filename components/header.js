import { useEffect, useState } from "react";
import { Link } from "react-scroll";

function Header() {
  const [top, setTop] = useState(true);
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-30 transition duration-300 ease-in-out ${!top && "bg-gray-200 bg-opacity-40 backdrop-blur-sm shadow-lg"
        }`}
    >
      <div className="w-full sm:w-full md:w-full lg:w-11/12 mx-auto  sm:px-6">
        <div className="flex items-center lg:justify-center justify-center px-3 h-14 md:h-16">
          <nav className="flex font-nunito lg:justify-end">
            <ul className="flex gap-5  lg:hidden">
              <li>
                <Link to="pizzas" spy={true} smooth={true} offset={-80} duration={500}>
                  <button
                    className={`text-white rounded-md pointer-events-auto text-lg  p-2 px-4 block items-center transition duration-150 ease-in-out`}
                    aria-current="page"
                  >
                    Pizzas
                  </button>
                </Link>
              </li>
              <li>
                <Link to="empanadas" spy={true} smooth={true} offset={-80} duration={500}>
                  <button
                    className={`text-white   rounded-md px-4 text-lg   p-2 block items-center transition duration-150 ease-in-out`}
                    aria-current="page"
                  >
                    Empanadas
                  </button>
                </Link>
              </li>
              <li>
                <Link to="combos" spy={true} smooth={true} offset={-80} duration={500}>
                  <button
                    className={`text-white  px-4 rounded-md text-lg   p-2 block items-center transition duration-150 ease-in-out`}
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
