import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (

        <nav className="bg-white w-full p-2">
                <h1 className="uppercase font-bold">Pizzeria Canavaro</h1>
                <div className="flex gap-x-3 items-center">
                <h1 className="font-medium text-sm">Pelliza 1794</h1>
                <div className="font-medium">-</div>
                <h2 className="font-medium text-sm">4711-3259</h2>
                <h2 className="font-medium text-sm">11-2714-5669</h2>
                </div>
                
        </nav>

    )
}
