import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const Select = ({ data, handleChange, label, placeholder, newOption }) => {
    const [selected, setSelected] = useState('');
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
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="relative w-full group">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</p>
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full relative font-bold text-sm rounded-[1.5rem] px-6 py-4 text-left transition-all outline-none border-2
                    ${isOpen
                        ? "bg-slate-900 border-red-500/50 shadow-xl shadow-red-600/10 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300 shadow-sm"}
                `}
            >
                <span className={!selected ? "text-slate-500 font-medium" : "text-white"}>
                    {selected || placeholder || 'Seleccionar...'}
                </span>
                <div className={`absolute right-6 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : 'text-slate-500'}`}>
                    <FaAngleDown size={18} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="absolute w-full mt-3 rounded-2xl overflow-hidden z-[100] shadow-2xl shadow-black/40 border border-slate-700 bg-slate-800"
                    >
                        <ul className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
                            {data.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                    className="px-6 py-3 text-sm font-bold text-slate-300 hover:bg-red-500/10 hover:text-red-400 cursor-pointer transition-colors"
                                >
                                    {item}
                                </li>
                            ))}
                            {newOption && (
                                <li
                                    onClick={() => handleSelect('categoria nueva')}
                                    className="px-6 py-3 text-sm font-black uppercase tracking-wider text-red-500 bg-red-500/5 hover:bg-red-500/10 cursor-pointer transition-colors border-t border-slate-700/50 mt-1"
                                >
                                    + Categoría nueva
                                </li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #475569;
                }
            `}</style>
        </div>
    );

}
export default Select;
