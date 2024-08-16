/* eslint-disable react/prop-types */
import axios from 'axios';
import Button from 'components/ButtonDemora';
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
        <div className="w-full flex-row lg:flex  rounded-md h-auto py-2">
            <div className="w-full text-center py-2">
                <h1 className="font-medium font-montserrat ">Demora domicilio</h1>
                <div className="flex w-full gap-3 justify-center mt-2">
                    {data
                        ?.filter(item => item.tipoEnvio === "domicilio")
                        .map(item => (
                            <Button handlePutTime={handlePutTime} key={item._id} data={item} selected={selectedDomicilio} />
                        ))}
                </div>
            </div>


            <div className="w-full  text-center py-2">
                <h1 className="font-medium font-montserrat ">Demora local</h1>
                <div className="flex w-full gap-3 justify-center mt-2">
                    {data
                        ?.filter(item => item.tipoEnvio === "local")
                        .map(item => (
                            <Button handlePutTime={handlePutTime} key={item._id} data={item} selected={selectedLocal} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default OrderDelay;
