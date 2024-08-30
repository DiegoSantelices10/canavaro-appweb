import useCategories from 'Hooks/useCategories';
import React from 'react'

function TabsCategories({ renderProducts, setRenderProductos, clearTotal }) {

    const { categories } = useCategories();
    return (
        <div className="flex overflow-x-scroll flexp justify-between space-x-2 w-full mt-4">
            <style jsx>
                {`
            .flexp::-webkit-scrollbar-thumb {
              background: #ffffff;
              border-radius: 20px;
            }

            .flexp::-webkit-scrollbar {
              height: 0px;
            }
          `}
            </style>
            {categories.filter((categoria) => categoria !== 'extras').map((categoria, index) => (
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
                                : "whitespace-nowrap px-3 font-semibold  text-neutral-800 focus:ring-0 focus:outline-none  text-sm font-montserrat border-b-2 border-red-400 pb-2 tracking-wide"
                        }
                    >
                        {categoria === 'empanadas' ? 'empanadas & canastitas' : categoria}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TabsCategories;