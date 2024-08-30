/* eslint-disable react/prop-types */
import { Field } from 'formik';
import React from 'react'

const ControllerInput = ({ label, name, disabled }) => {

    return (
        <div className="w-full mx-auto">
            <label className="block text-xs text-gray-900 font-montserrat">
                {label}
                <Field
                    disabled={disabled}
                    id={name}
                    name={name}
                    className={`${disabled === true ? "bg-gray-200" : ""} p-2 w-full h-10 text-sm leading-tight text-gray-900  
                             border-gray-200 border rounded-lg focus:ring-0 focus:border-gray-300`}
                />
            </label>
        </div>
    )
}

export default ControllerInput;