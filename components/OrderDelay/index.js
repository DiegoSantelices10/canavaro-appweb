import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrderDelay = () => {

    const [selectedDomicilio, setSelectedDomicilio] = useState({});
    const [selectedLocal, setSelectedLocal] = useState({});
    const [data, setData] = useState(null);

    useEffect(() => {
        getDelay();
    }, []);

    const getDelay = async () => {
        try {
            const res = await axios.get("/api/delay");
            const local = res.data.find(item => item.tipo === "localActual");
            setSelectedLocal({ ...local, demora: local.demoraActual });
            const domicilio = res.data.find(item => item.tipo === "domicilioActual");
            setSelectedDomicilio({ ...domicilio, demora: domicilio.demoraActual });
            setData(res.data);
        } catch (error) {
            alert("Error al obtener los datos")
        }
    }

    const handlePutTime = async value => {
        if (value.tipoEnvio === "local") {
            const local = data.find(item => item.tipo === "localActual");
            setSelectedLocal(value);
            try {
                await axios.put(`/api/delay/${local._id}`, { demoraActual: value.demora });
            } catch (error) {
                alert("Error al actualizar los datos")
            }
        } else {
            const domicilio = data.find(item => item.tipo === "domicilioActual");
            setSelectedDomicilio(value);
            try {
                await axios.put(`/api/delay/${domicilio._id}`, { demoraActual: value.demora });
            } catch (error) {
                alert("Error al actualizar los datos")
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-8 w-full">
            {data?.length > 0 && (
                <div className="flex-1">
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Demora Domicilio</h2>
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
                        {data?.filter(item => item.tipoEnvio === "domicilio").map((item) => (
                            <button
                                key={item._id}
                                onClick={() => handlePutTime(item)}
                                className={`
                                    flex-[1] py-2.5 text-sm font-bold rounded-xl transition-all duration-300
                                    ${selectedDomicilio.demora === item.demora
                                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}
                                `}
                            >
                                {item.demora}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {data?.length > 0 && (
                <div className="flex-1">
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Demora Local</h2>
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
                        {data?.filter(item => item.tipoEnvio === "local").map((item) => (
                            <button
                                key={item._id}
                                onClick={() => handlePutTime(item)}
                                className={`
                                    flex-[1] py-2.5 text-sm font-bold rounded-xl transition-all duration-300
                                    ${selectedLocal.demora === item.demora
                                        ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}
                                `}
                            >
                                {item.demora}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderDelay;
