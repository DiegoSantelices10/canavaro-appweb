import { useRouter } from 'next/router';
import React from 'react'
import { IoChevronBack } from 'react-icons/io5';

const HeaderTitle = ({ title, isBack }) => {
    const router = useRouter();


    const backNavigate = () => {
        router.back()
    }

    return (
        <div className="grid gap-3 mt-6">
            <div className='flex gap-4 px-2'>
                {isBack &&
                    (

                        <button onClick={backNavigate}>
                            <IoChevronBack className="text-gray-900" size={25} />
                        </button>
                    )
                }
                <h1 className="text-3xl font-montserrat tracking-wider font-bold text-center sm:text-left">{title}</h1>
            </div>
            <hr />
        </div>
    )
}

export default HeaderTitle;