/* eslint-disable react/prop-types */
import Table from "rc-table";
import { useEffect, useState } from "react";

export default function SectionPizzas({ products, imagefront }) {
  const [renderPizzas, setRenderPizzas] = useState()

  useEffect(() => {
    const pizzas = products
      ?.filter(item => item.categoria === "pizzas" && item.available === true)
      ?.sort((a, b) => {
        const nombreA = a.nombre.toUpperCase();
        const nombreB = b.nombre.toUpperCase();

        if (nombreA.startsWith('M') && !nombreB.startsWith('M')) {
          return -1;
        } else if (nombreB.startsWith('M') && !nombreA.startsWith('M')) {
          return 1;
        }

        if (nombreA.startsWith('J') && !nombreB.startsWith('J')) {
          return -1;
        } else if (nombreB.startsWith('J') && !nombreA.startsWith('J')) {
          return 1;
        }

        return nombreA.localeCompare(nombreB);

      }).map((item) => ({
        key: item._id,
        nombre: item.nombre,
        gigante: item.precioPizza.gigante,
        mediana: item.precioPizza.mediana,
        chica: item.precioPizza.chica
      }))
    setRenderPizzas(pizzas)
  }, [])

  const columns = [
    {
      title: 'Productos',
      dataIndex: 'nombre',
      key: 'nombre',
      width: 400,
      render: (value) => <div className=" font-poppins">{value}</div>
    },
    {
      title: 'Gig',
      dataIndex: 'gigante',
      key: 'gigante',
      align: 'center',
      render: (value) => <div className="text-center font-poppins">{value}</div>
    },
    {
      title: 'Med',
      dataIndex: 'mediana',
      key: 'mediana',
      align: 'center',
      render: (value) => <div className="text-center px-4 font-poppins">{value}</div>
    },
    {
      title: 'Chi',
      dataIndex: 'chica',
      key: 'chica',
      align: 'center',
      render: (value) => <div className="text-center font-poppins">{value}</div>
    },
  ];

  return (
    <div className="w-full relative bg-zinc-900">
      <div className="w-auto h-full mx-auto bg-cover bg-center  ">
        <div
          className="relative p-2 h-full  
          rounded-lg w-full lg:w-4/5 mx-auto 
					gap-5 content-center pb-6 "
        >
          <h1 className="relative font-poppins  w-full 
              text-center text-gray-200  text-2xl lg:text-3xl 
              font-semibold ">
            Nuestras Pizzas
          </h1>
          <hr className="py-2" />
          <div className="h-full w-full mx-auto text-white overflow-y-auto">
            <div className="flex flex-col gap-y-5 mt-4">
              <Table
                className="text-white w-full  flex justify-center font-poppins"
                columns={columns}
                data={renderPizzas}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
