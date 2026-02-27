import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLogOut, FiPackage, FiShoppingCart, FiSettings, FiGrid } from "react-icons/fi";
import { getImageModal, getPromo, logout } from "services/fetchData";
import Image from "next/image";
import axios from "axios";
import Hamburger from 'hamburger-react'
import { AnimatePresence, motion } from "framer-motion";

const AccessMenu = () => {
  const [selected, setSelected] = useState("/admin");
  const [barra, setBarra] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    setSelected(currentPath);
  }, [router.asPath]);

  useEffect(() => {
    (async () => {
      const res = await getPromo();
      const imageModal = await getImageModal();
      setBarra([...res.data, ...imageModal]);
    })();
  }, []);

  const signOut = async () => {
    const res = await logout();
    if (res === "ok") {
      return router.push("/admin/auth/login");
    }
  };

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
              return { ...item, available: !available };
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
              return { ...item, available: !available };
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

  const menuItems = [
    { name: "Pedidos", href: "/admin", icon: <FiGrid className="text-xl" /> },
    { name: "Productos", href: "/admin/products/list", icon: <FiPackage className="text-xl" /> },
    { name: "Ventas", href: "/admin/sales/list", icon: <FiShoppingCart className="text-xl" /> },
    { name: "Configuración", href: "/admin/settings", icon: <FiSettings className="text-xl" /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-full h-full bg-slate-950 text-slate-300 border-r border-slate-800/50">
        <div className="px-6 py-10">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="p-2 bg-red-600 rounded-xl shadow-lg shadow-red-600/20">
              <Image height={32} width={32} src={"/images/logocanavaro.webp"} className="brightness-0 invert" alt="logo" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Canavaro</h1>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = selected === item.href;
              return (
                <Link key={item.href} href={item.href} passHref>
                  <a className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive
                      ? "bg-red-600 text-white shadow-xl shadow-red-600/30 font-medium"
                      : "hover:bg-slate-900 hover:text-white"}
                  `}>
                    <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-red-500"} transition-colors`}>
                      {item.icon}
                    </span>
                    <span className="text-sm tracking-wide">{item.name}</span>
                  </a>
                </Link>
              );
            })}
          </nav>

          <div className="mt-12">
            <h2 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Promociones</h2>
            <div className="space-y-3 px-2">
              {barra?.map(item => (
                <div key={item._id} className="flex justify-between items-center group">
                  <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors truncate max-w-[120px]">
                    {item.nombre || "Destacado"}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer scale-90">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.available}
                      onChange={() => promoBarra(item._id, item.available, item)}
                    />
                    <div className="w-8 h-4 bg-slate-800 rounded-full peer-checked:bg-red-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800/50">
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group"
          >
            <FiLogOut className="text-xl group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between w-full h-16 px-4 bg-slate-950 border-b border-slate-800/50 fixed top-0 left-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-600 rounded-lg">
            <Image height={24} width={24} src={"/images/logocanavaro.webp"} className="brightness-0 invert" alt="logo" />
          </div>
          <span className="font-bold text-white">Canavaro</span>
        </div>
        <Hamburger size={24} color="white" toggled={isOpen} toggle={setOpen} />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-20 px-6 lg:hidden"
          >
            <nav className="space-y-4">
              {menuItems.map((item) => {
                const isActive = selected === item.href;
                return (
                  <Link key={item.href} href={item.href} passHref>
                    <a
                      onClick={() => setOpen(false)}
                      className={`
                        flex items-center gap-4 p-4 rounded-2xl
                        ${isActive ? "bg-red-600 text-white shadow-xl shadow-red-600/20" : "text-slate-400 bg-slate-900"}
                      `}
                    >
                      {item.icon}
                      <span className="text-lg font-medium">{item.name}</span>
                    </a>
                  </Link>
                );
              })}
              <button
                onClick={signOut}
                className="flex items-center gap-4 w-full p-4 rounded-2xl text-red-500 bg-red-500/5 border border-red-500/10"
              >
                <FiLogOut className="text-xl" />
                <span className="text-lg font-medium">Cerrar Sesión</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessMenu;
