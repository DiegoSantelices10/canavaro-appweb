import useCategories from 'Hooks/useCategories';
import React from 'react'
import { capitalizeFirstLetter } from 'utils';

function TabsCategories({ renderProducts, setRenderProductos, clearTotal }) {

    const { categories } = useCategories();
    const combosYPromo = categories.filter(item => item === 'Combos' || item === 'promociones');
    const pizzasYEmpanadas = categories.filter(item => item === 'empanadas' || item === 'pizzas');
    const resto = categories.filter(item => item !== 'Combos' && item !== 'promociones' && item !== 'empanadas' && item !== 'pizzas');

    const newListCategories = [...pizzasYEmpanadas, ...combosYPromo, ...resto];

    return (
        <div className="flex overflow-x-scroll flexp justify-between space-x-2 w-full mt-4">
            <style jsx>
                {`
            .flexp::-webkit-scrollbar-thumb {
              background: #f4f4f4;
              border-radius: 20px;
            }

            .flexp::-webkit-scrollbar {
              height: 4px;
            }
          `}
            </style>
            {newListCategories.filter((categoria) => categoria !== 'extras').map((categoria, index) => (
                <div
                    key={index}>
                    <button
                        onClick={() => {
                            setRenderProductos(categoria);
                            clearTotal();
                        }}
                        className={
                            renderProducts !== categoria
                                ? "whitespace-nowrap px-3 font-medium font-montserrat text-sm text-gray-400"
                                : "whitespace-nowrap px-3 font-semibold  text-neutral-800 focus:ring-0 focus:outline-none  text-sm font-montserrat  pb-2 tracking-wide"
                        }
                    >
                        {categoria === 'empanadas' ? 'Empanadas & Canastitas' : capitalizeFirstLetter(categoria)}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TabsCategories;