import React, { useState } from 'react';

const Tabs = ({ sections }) => {
    const [activeTab, setActiveTab] = useState(sections[0].id); // Iniciar con la primera tab como activa

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    return (
        <>
            <ul className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1">
                {sections.map((section) => (
                    <li key={section.id}
                        className='cursor-pointer'
                    >
                        <a
                            onClick={() => handleTabClick(section.id)}
                            className={`flex font-montserrat justify-center py-2 text-sm sm:text-base ${activeTab === section.id ? 'bg-white font-medium  rounded-md shadow-sm text-red-500' : ''
                                }`}
                        >
                            {section.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="py-4">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        id={section.id}
                        className={`${activeTab === section.id ? 'block' : 'hidden'}`}
                    >
                        {section.content}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Tabs;
