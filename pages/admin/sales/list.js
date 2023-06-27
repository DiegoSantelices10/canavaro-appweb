import Layout from "components/admin/layout";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSaleData } from "store/reducers/saleSlice";
export default function Sales() {
  const { sales } = useSelector(state => state.sale);
  const dispatch = useDispatch();
  const [totalSale, setTotalSale] = useState("");

  useEffect(() => {
    if (sales.length < 1) {
      const salesLocal = JSON.parse(localStorage.getItem("sales"));
      console.log("Venta de storage", salesLocal);
      dispatch(setSaleData(salesLocal));
    }

    const total = sales.reduce((accumulator, pedido) => accumulator + pedido.total, 0);
    setTotalSale(total);
  }, []);

  useEffect(() => {
    const total = sales.reduce((accumulator, pedido) => accumulator + pedido.total, 0);
    setTotalSale(total);
  }, [sales]);

  return (
    <Layout>
      <div className="h-full  w-full">
        <div className="w-full lg:w-11/12 h-auto text-center py-5 mx-auto">
          <div className="w-full h-auto flex justify-center items-center">
            <div className="w-3/5 lg:w-1/2 font-bold bg-white rounded-md shadow p-5">
              <h2>
                VENTAS DEL DIA: $ <span>{totalSale}</span>
              </h2>
            </div>
          </div>

          <div className="w-full lg:w-11/12 mx-auto h-auto mt-4 ">
            <div className="w-full mx-auto">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm  text-gray-500 dark:text-gray-400 ">
                  <thead>
                    <tr>
                      <th scope="col" className="pl-4 py-3">
                        Cliente
                      </th>
                      <th scope="col" className="pl-2 py-3">
                        Tipo envio
                      </th>
                      <th scope="col" className="pl-2 py-3">
                        Hora Pedido
                      </th>
                      <th scope="col" className="pl-2 py-3">
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 font-nunito">
                    {sales?.map((pedido, index) => {
                      return (
                        <tr key={pedido._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                          <th scope="row" className="pl-4 py-4 w-auto  ">
                            {pedido.cliente}
                          </th>
                          <td className="pl-2 py-4 font-bold">{pedido.tipoEnvio}</td>
                          <td className="pl-2 py-4">{pedido.creado}</td>
                          <td className="pl-2 py-4 ">$ {pedido.total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { req, res } = context;

  const token = req.headers.cookie?.includes("token") || req.cookies.token;
  if (!token) {
    res.setHeader("location", "/admin/auth/login"); // Redirigir al usuario a la página de inicio de sesión
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { props: {} };
}
