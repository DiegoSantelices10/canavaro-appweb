/* eslint-disable react/prop-types */
import { Field } from 'formik';
import React from 'react'

const ControllerInput = ({ label, name, disabled, type, placeholder }) => {

    return (
        <div className="w-full">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</p>
            <Field
                disabled={disabled}
                id={name}
                type={type}
                placeholder={placeholder || "..."}
                name={name}
                className={`
                    w-full px-6 py-4 text-sm font-bold rounded-[1.5rem] transition-all outline-none shadow-sm border-2
                    ${disabled
                        ? "bg-slate-100 border-transparent text-slate-400 cursor-not-allowed"
                        : "bg-white border-transparent text-slate-700 hover:shadow-md focus:border-red-500/10 focus:ring-4 focus:ring-red-500/5 focus:bg-white"}
                `}
            />
        </div>
    )
}

export default ControllerInput;