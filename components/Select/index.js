import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Select = ({ data, handleChange, label, newOption }) => {
    const [selected, setSelected] = useState('pizzas');
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (item) => {
        setSelected(item);
        handleChange(item);
        setIsOpen(false);
    };

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
                {selected || ''}
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
                        <ul className="absolute bg-white divide-y shadow  w-full mt-2 rounded-lg overflow-y-auto z-10">
                            {data.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                    className="p-2 px-3 text-sm font-montserrat font-normal hover:bg-gray-100 cursor-pointer"
                                >
                                    {item}
                                </li>
                            ))}
                            {newOption && (
                                <li
                                    onClick={() => handleSelect('categoria nueva')}
                                    className="p-2 px-3 text-sm font-montserrat font-normal hover:bg-gray-100 cursor-pointer"
                                >
                                    categoria nueva
                                </li>
                            )}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );

}
export default Select;
