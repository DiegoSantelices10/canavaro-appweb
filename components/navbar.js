import Link from "next/link"
import Image from "next/image"

export default function navbar() {
    return (

        <nav className="flex justify-center justify-items-center bg-white shadow-md shadow-slate-300/50 w-full">
                        <Image  src="/images/logocanavaro.png" width={90} height={90} alt="logo" />
        </nav>

    )
}
