import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ sections }) => {
    const [activeTab, setActiveTab] = useState(sections[0].id);

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    return (
        <div className="space-y-8">
            <div className="bg-slate-100 p-1.5 rounded-[2rem] w-full max-w-2xl">
                <ul className="flex items-center gap-1 overflow-x-auto custom-scrollbar-hide">
                    {sections.map((section) => {
                        const isActive = activeTab === section.id;
                        return (
                            <li key={section.id} className="flex-1 min-w-[140px]">
                                <button
                                    onClick={() => handleTabClick(section.id)}
                                    className={`
                                        w-full relative py-3.5 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300
                                        ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-700'}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabBadge"
                                            className="absolute inset-0 bg-slate-900 rounded-[1.5rem] shadow-lg shadow-slate-900/10"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{section.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="relative">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className={`${activeTab === section.id ? 'block' : 'hidden'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                    >
                        {section.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
