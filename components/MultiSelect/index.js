
import { FieldArray } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const MultiSelect = ({ data, label, values }) => {
    const [isOpen, setIsOpen] = useState(false);


    const menuVariants = {
        open: {
            opacity: 1,
            y: 10,
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

    const onChangeChecked = (drink, arrayHelpers) => {
        const index = values?.extras.findIndex(item => item.nombre === drink.nombre);
        if (index !== -1) {
            arrayHelpers.remove(index);
        } else {
            arrayHelpers.push(drink);
        }
    }

    return (
        <div className="relative w-full">
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
                                <ul className="absolute bottom-0 bg-gray-50 divide-y shadow h-60 flexp  w-full mt-2 rounded-lg overflow-y-auto z-10">
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
                                    {data?.filter(item => item.available === true).map((drink, index) => {
                                        const isChecked = values?.extras.some(item => item.nombre === drink.nombre)

                                        return (
                                            <div key={index} className='p-3 relative'>
                                                <li className="flex justify-between items-center text-xs text-gray-900 font-montserrat font-semibold">
                                                    <h2>
                                                        {drink.nombre}
                                                    </h2>
                                                    <div
                                                        onClick={() => onChangeChecked(drink, arrayHelpers)}
                                                        className={`h-6 w-6 cursor-pointer rounded-md border ${isChecked ? 'bg-red-600' : 'bg-white'} flex items-center justify-center cursor-pointer`}
                                                    />
                                                </li>
                                            </div>
                                        )
                                    })}
                                </ul>
                            )}
                        />
                    </motion.div>
                </AnimatePresence>
            )}
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
        </div>
    );

}
export default MultiSelect;
