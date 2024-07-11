/* eslint-disable react/prop-types */
import { Field } from 'formik';
import React from 'react'

const ControllerInput = ({ label, name }) => {

    return (
        <div className="w-full mx-auto">
            <label className="block  text-xs  text-gray-400 font-montserrat font-normal">
                {label}
                <Field
                    id={name}
                    name={name}
                    className="p-2 w-full h-10 text-sm leading-tight text-gray-700  
                             border-gray-200 border rounded-lg focus:ring-0 focus:border-gray-300"
                />
            </label>
        </div>
    )
}

export default ControllerInput;