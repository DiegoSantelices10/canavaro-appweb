
import { Field, FieldArray } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const MultiSelect = ({ data, label }) => {
    const [isOpen, setIsOpen] = useState(false);


    const menuVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        },
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="relative w-full">
            <p className="text-gray-900 font-semibold text-xs font-montserrat">{label}</p>
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-full relative font-montserrat border border-gray-200 text-gray-600 text-sm rounded-lg p-2.5 text-left"
            >
                <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                    {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                </div>
            </button>
            {isOpen && (
                <AnimatePresence>
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <FieldArray
                            name="extras"
                            render={arrayHelpers => (
                                <ul className="absolute bg-white divide-y shadow h-44 flexp  w-full mt-2 rounded-lg overflow-y-auto z-10">
                                    <style>
                                        {`
                                            .flexp::-webkit-scrollbar-thumb {
                                                background: #E02C2CFF;
                                                border-radius: 20px;
                                            }

                                            .flexp::-webkit-scrollbar {
                                                height: 3px;
                                                width: 3px;
                                            }
                                            `}
                                    </style>
                                    {data.map((drink, index) => (
                                        <div key={index} className='p-3 relative'>
                                            <li className="flex justify-between text-xs text-gray-900 font-montserrat font-semibold">
                                                <h2>
                                                    {drink.nombre}
                                                </h2>
                                                <Field
                                                    type="checkbox"
                                                    name="extras"
                                                    value={drink.nombre}
                                                    className="rounded-md cursor-pointer focus:ring-0"
                                                />
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            )}
                        />
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );

}
export default MultiSelect;
