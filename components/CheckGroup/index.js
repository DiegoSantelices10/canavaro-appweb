/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getImageModal, getPromo } from 'services/fetchData';
import { setSetting } from 'store/reducers/settingSlice';

const CheckGroup = (props) => {

    const { dispatch } = props;

    const [barra, setBarra] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await getPromo();
            const imageModal = await getImageModal();

            const efectivo = res.data.find(item => item.nombre === "Promo efectivo")
            dispatch(setSetting({ promoEfectivo: efectivo }));

            setBarra([...res.data, ...imageModal]);
        })()
    }, [])

    const promoBarra = async (id, available, item) => {
        const idImage = "67816cd547f387e5c3442668"

        try {
            if (item.imagen) {

                const response = await axios.put(`/api/settings/${id === idImage ? "imageModal" : "promo"}/${id === idImage ? idImage : id}`,
                    {
                        imagen: item.imagen,
                        available: !available,
                    })
                if (response.status === 200) {
                    const updatedBarra = barra?.map(item => {
                        if (item._id === id) {
                            return {
                                ...item,
                                available: !available
                            };
                        }
                        return item;
                    });
                    setBarra(updatedBarra);
                }
            } else {

                const response = await axios.put(`/api/settings/${id === idImage ? "imageModal" : "promo"}/${id === idImage ? idImage : id}`, { available: !available })
                if (response.status === 200) {
                    const updatedBarra = barra?.map(item => {
                        if (item._id === id) {
                            return {
                                ...item,
                                available: !available
                            };
                        }
                        return item;
                    });
                    setBarra(updatedBarra);
                }
            }
        } catch (error) {
            alert("Error al realizar la accion")
        }
    }

    return (
        <div className="grid gap-4 grid-cols-2 justify-center items-center mx-auto w-full lg:hidden mt-4">
            {barra?.map(item => (
                <div
                    key={item._id}
                    className="flex justify-between items-center"
                >
                    <h1 className="text-sm font-montserrat">
                        {item.nombre || "Imagen destacable"}
                    </h1>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            id={item._id}
                            type="checkbox"
                            className="sr-only peer"
                            checked={item.available}
                            onChange={() => promoBarra(item._id, item.available, item)}
                        />
                        <div className="w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-0 
                                    rounded-full 
                                    dark:bg-gray-200 peer-checked:after:translate-x-full 
                                    after:content-[''] after:absolute 
                                    after:top-[2px] after:left-[2px] after:bg-white   
                                    after:rounded-full after:h-4 after:w-4 after:transition-all 
                                    dark:border-gray-600 peer-checked:bg-red-600 "></div>
                    </label>

                </div>
            ))}
        </div>
    )
}

export default CheckGroup;