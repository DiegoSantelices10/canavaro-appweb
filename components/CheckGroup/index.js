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
        <div className="flex flex-wrap gap-6 items-center w-full lg:hidden">
            {barra?.map(item => (
                <div
                    key={item._id}
                    className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-all"
                >
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        {item.nombre || "Banner"}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer scale-90">
                        <input
                            id={item._id}
                            type="checkbox"
                            className="sr-only peer"
                            checked={item.available}
                            onChange={() => promoBarra(item._id, item.available, item)}
                        />
                        <div className="w-8 h-4 bg-slate-700 rounded-full peer-checked:bg-red-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default CheckGroup;