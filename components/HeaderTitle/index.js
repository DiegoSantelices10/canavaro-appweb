import { useRouter } from 'next/router';
import React from 'react'
import { IoChevronBack } from 'react-icons/io5';

const HeaderTitle = ({ title, isBack }) => {
    const router = useRouter();


    const backNavigate = () => {
        router.back()
    }

    return (
        <div className="grid gap-3">
            <div className='flex md:gap-4 md:px-2 relative justify-center'>
                {isBack &&
                    (

                        <button onClick={backNavigate}>
                            <IoChevronBack className="text-gray-900 absolute left-0 bottom-1" size={25} />
                        </button>
                    )
                }
                <h1 className="text-3xl font-montserrat tracking-wider font-bold text-center">{title}</h1>
            </div>
            <hr />
        </div>
    )
}

export default HeaderTitle;