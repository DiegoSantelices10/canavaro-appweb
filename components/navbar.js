import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (

        <nav className="bg-white w-full p-2 py-3">
            <h1 className="uppercase font-bold text-xl text-center">Pizzeria Canavaro</h1>
            <div className="flex justify-between mt-2 text-gray-500 text-xs px-3">
                <div className="w-1/2">
                    <h1 className="font-normal ">Pelliza 1794 - Olivos</h1>
                </div>
                <div className="flex justify-end gap-3 w-full">
                    <h2 className="font-normal ">tel. 4711-3259</h2>
                    <h2 className="font-normal ">ws. 11-2714-5669</h2>
                </div>
            </div>

        </nav>

    )
}
