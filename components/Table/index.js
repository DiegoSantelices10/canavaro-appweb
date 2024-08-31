import * as React from 'react'

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const Table = (props) => {
    const {
        data,
        columns,
        ...rest
    } = props;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div
            {...rest}
        >
            <table className='w-full'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className="bg-white border-b"
                        >
                            {headerGroup.headers.map(header => (
                                <th key={header.id}
                                    className='font-montserrat text-sm'
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : (flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table?.getRowModel().rows.map(row => (
                        <tr key={row.id}
                            className="bg-white  border-b hover:bg-gray-50 dark:hover:bg-red-200"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}
                                    className='p-2 font-montserrat text-sm text-center'
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;

