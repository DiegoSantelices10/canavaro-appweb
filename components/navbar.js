import Link from "next/link"
import Image from "next/image"

export default function Navbar({title}) {
    return (

        <nav className="w-full fixed bg-white top-0 py-4  z-50 shadow-md">
            <h1 className="font-semibold text-lg text-gray-800 tracking-wide  text-center">{title}</h1>
        </nav>

    )
}
