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
            className="overflow-hidden rounded-2xl md:rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/40"
        >
            <table className='w-full border-collapse'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className="bg-slate-50/50 border-b border-slate-100"
                        >
                            {headerGroup.headers.map(header => (
                                <th key={header.id}
                                    className='px-2 md:px-6 py-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest text-center'
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
                <tbody className="divide-y divide-slate-50">
                    {table?.getRowModel().rows.map(row => (
                        <tr key={row.id}
                            className="transition-colors hover:bg-slate-50 group"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}
                                    className='px-2 md:px-6 py-4 text-xs md:text-sm font-medium text-slate-600'
                                >
                                    <div className="flex justify-center items-center">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
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

