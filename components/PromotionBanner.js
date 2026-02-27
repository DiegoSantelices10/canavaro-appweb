import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const PromotionBanner = () => {
    const { promoEfectivo } = useSelector(state => state.setting);

    if (!promoEfectivo?.available) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-500 p-4 shadow-lg mb-6"
        >
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-100">🔥 Oferta Especial</span>
                    <h2 className="text-xl font-extrabold text-white">
                        {promoEfectivo.descuento}% OFF en efectivo
                    </h2>
                    <p className="text-sm text-red-50" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Aprovechá este descuento pagando al recibir tu pedido.
                    </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                    <span className="text-2xl">💸</span>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-black/5 blur-2xl"></div>
        </motion.div>
    );
};

export default PromotionBanner;
