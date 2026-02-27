
import { FieldArray } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleDown, FaCheck, FaTimes } from 'react-icons/fa';

const MultiSelect = ({ data, label, values, name = "extras" }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        open: {
            opacity: 1,
            y: 5,
            scale: 1,
            display: "block",
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        closed: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transitionEnd: {
                display: "none"
            },
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    const onChangeChecked = (item, arrayHelpers) => {
        const index = values?.[name]?.findIndex(x => x.nombre === item.nombre);
        if (index !== -1) {
            arrayHelpers.remove(index);
        } else {
            arrayHelpers.push(item);
        }
    }

    const allSelectedItems = values?.[name] || [];
    // Only items that belong to the current data set
    const selectedItems = allSelectedItems.filter(item =>
        data?.some(d => d.nombre === item.nombre)
    );

    return (
        <div className="relative w-full space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                {label}
            </label>

            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    group w-full flex items-center justify-between bg-slate-900 border-2 transition-all duration-300 rounded-2xl px-5 py-3.5
                    ${isOpen ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-slate-800 hover:border-slate-700'}
                `}
            >
                <span className={`text-sm font-bold truncate ${selectedItems.length > 0 ? 'text-white' : 'text-slate-500'}`}>
                    {selectedItems.length > 0
                        ? `${selectedItems.length} seleccionados`
                        : 'Seleccionar opciones...'}
                </span>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : 'text-slate-500'}`}>
                    <FaAngleDown />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="absolute left-0 right-0 top-full z-[100] mt-2"
                    >
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-64 flex flex-col">
                            <FieldArray
                                name={name}
                                render={arrayHelpers => (
                                    <ul className="overflow-y-auto py-2 custom-scrollbar">
                                        {data?.filter(item => item.available === true).map((item, index) => {
                                            const isChecked = allSelectedItems.some(x => x.nombre === item.nombre);

                                            return (
                                                <li
                                                    key={index}
                                                    onClick={() => onChangeChecked(item, arrayHelpers)}
                                                    className={`
                                                        flex items-center justify-between px-5 py-3 cursor-pointer transition-colors
                                                        ${isChecked ? 'bg-red-500/10' : 'hover:bg-slate-700/50'}
                                                    `}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className={`text-sm font-bold ${isChecked ? 'text-red-400' : 'text-slate-300'}`}>
                                                            {item.nombre}
                                                        </span>
                                                        {item.precio > 0 && (
                                                            <span className="text-[10px] text-slate-500 font-bold">
                                                                + ${item.precio}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className={`
                                                        w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                                                        ${isChecked
                                                            ? 'bg-red-600 border-red-600 text-white'
                                                            : 'bg-slate-900 border-slate-700 group-hover:border-slate-600'}
                                                    `}>
                                                        {isChecked && <FaCheck className="text-[10px]" />}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Selected Items Display */}
            {selectedItems.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                    <FieldArray
                        name={name}
                        render={arrayHelpers => (
                            <>
                                {selectedItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-xl group hover:border-red-500/40 transition-all"
                                    >
                                        <span className="text-[11px] font-black text-red-500 uppercase tracking-wider">
                                            {item.nombre}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const idx = values[name].findIndex(x => x.nombre === item.nombre);
                                                arrayHelpers.remove(idx);
                                            }}
                                            className="text-red-500/50 hover:text-red-500 transition-colors"
                                        >
                                            <FaTimes className="text-[10px]" />
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}
                    />
                </div>
            )}

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

export default MultiSelect;
