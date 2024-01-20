import Link from "next/link";

function Header() {

  return (
    <header

    >
      <div className="w-full sm:w-full md:w-full lg:w-11/12 mx-auto  sm:px-6">
        <div className="flex items-center  justify-center px-3 pt-5">
          <nav className="flex font-poppins ">
            <div className="w-full flex items-center">
              <Link href={"/welcomeLogo"}>
                <a
                  className={`p-2 px-4 rounded-md font-semibold  font-poppins  text-lg  mx-auto 
                          hover:bg-black hover:text-white bg-white  text-gray-900   
                          hover:-translate-y-1 transition-all duration-500`}
                >
                  Hac&eacute; tu pedido
                </a>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
