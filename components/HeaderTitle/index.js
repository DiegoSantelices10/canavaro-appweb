import { useRouter } from 'next/router';
import React from 'react'
import { FiArrowLeft } from 'react-icons/fi';

const HeaderTitle = ({ title, isBack }) => {
    const router = useRouter();

    const backNavigate = () => {
        router.back()
    }

    return (
        <div className="flex flex-col items-start gap-4 ">
            {isBack && (
                <button
                    onClick={backNavigate}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 shadow-sm"
                >
                    <FiArrowLeft size={20} />
                </button>
            )}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
            </div>
        </div>
    )
}

export default HeaderTitle;