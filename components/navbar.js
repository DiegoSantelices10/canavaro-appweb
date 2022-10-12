import Link from "next/link"
import Image from "next/image"

export default function Navbar({title}) {
    return (

        <nav className="w-full p-4">
            <h1 className="font-bold text-lg text-white text-center">{title}</h1>
        </nav>

    )
}
