import React from 'react'
import { useCollapse } from "react-collapsed";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Collapsable = ({ children, title }) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        <div className='px-3'>
            <button
                className='rounded-lg border w-full flex justify-between items-center p-4'
                {...getToggleProps()}
            >
                {title}
                {isExpanded ? <FaAngleUp /> : <FaAngleDown />}

            </button>
            <section {...getCollapseProps()}>{children}</section>
        </div>
    )
}

export default Collapsable