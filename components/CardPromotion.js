/* eslint-disable react/prop-types */
import { convertToPath } from "libs/items";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CardPromotion({ data: { nombre, descripcion, imagen } }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="flex-shrink-0 w-64 group"
    >
      <Link href={`/order/products/${convertToPath(nombre)}`}>
        <a className="block space-y-3">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-lg border border-neutral-100">
            {/* Main Product Image (Full Cover) */}
            <img
              src={imagen?.url || "/images/sin-imagen-center.png"}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              alt={nombre}
            />

            {/* Overlay for better text readability if it was inside, but here we use it for a subtle polish */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="px-1">
            <h3 className="font-bold text-base font-montserrat text-neutral-800 group-hover:text-red-600 transition-colors">
              {nombre}
            </h3>
            {descripcion && (
              <p className="text-xs text-neutral-400 font-montserrat line-clamp-2 mt-0.5">
                {descripcion}
              </p>
            )}
          </div>
        </a>
      </Link>
    </motion.div>
  );
}

