import useCategories from 'Hooks/useCategories';
import React from 'react'
import { capitalizeFirstLetter } from 'utils';
import { motion } from 'framer-motion';

function TabsCategories({ renderProducts, setRenderProductos, clearTotal }) {

    const { categories } = useCategories();
    const combosYPromo = categories.filter(item => item === 'Combos' || item === 'promociones');
    const pizzasYEmpanadas = categories.filter(item => item === 'empanadas' || item === 'pizzas');
    const resto = categories.filter(item => item !== 'Combos' && item !== 'promociones' && item !== 'empanadas' && item !== 'pizzas');

    const newListCategories = [...pizzasYEmpanadas, ...combosYPromo, ...resto];

    return (
        <div className="flex overflow-x-auto no-scrollbar items-center gap-2 py-4 px-1">
            <style jsx global>
                {`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}
            </style>
            {newListCategories.filter((categoria) => categoria !== 'extras').map((categoria, index) => {
                const isActive = renderProducts === categoria;
                return (
                    <div key={index} className="relative flex-shrink-0">
                        <button
                            onClick={() => {
                                setRenderProductos(categoria);
                                clearTotal();
                            }}
                            className={`
                                relative z-10 whitespace-nowrap px-6 py-2.5 rounded-2xl font-montserrat text-sm transition-all duration-300
                                ${isActive
                                    ? "text-white font-bold shadow-lg shadow-red-200"
                                    : "text-neutral-500 font-medium hover:bg-neutral-100"
                                }
                            `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-red-600 rounded-2xl -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {categoria === 'empanadas' ? 'Empanadas & Canastitas' : capitalizeFirstLetter(categoria)}
                        </button>
                    </div>
                );
            })}
        </div>
    )
}

export default TabsCategories;
