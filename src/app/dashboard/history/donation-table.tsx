"use client";

import { Donation } from "@prisma/client";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import useTxHistory from "~/hooks/useTxHistory";

const columnHelper = createColumnHelper<Donation>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => {
      const value = info.getValue();
      return `${value.slice(0, 4)}...${value.slice(-4)}`;
    },
  }),
  columnHelper.accessor("timestamp", {
    header: "Date",
    cell: (info) => new Date(info.getValue() ?? "").toLocaleString(),
  }),
  columnHelper.accessor("donor", {
    header: "Donor",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("message", {
    header: "Message",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount (XMR)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("isPaid", {
    header: "Paid",
    cell: (info) =>
      info.getValue() ? (
        <CheckCircledIcon className="mx-auto" />
      ) : (
        <CrossCircledIcon className="mx-auto" />
      ),
  }),
];

function DonationTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const { data, isFetching, isLoading } = useTxHistory({
    limit: pageSize,
    index: pageIndex,
  });

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data?.rows ?? defaultData,
    columns,
    pageCount: data?.pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isLoading) {
    return <UpdateIcon className="animate-spin" />;
  }

  return (
    <section>
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="hidden border border-gray-300 bg-gray-200 p-3 font-bold uppercase text-gray-600 lg:table-cell"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr className="flex grow">No donations received yet</tr>
          ) : null}

          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="lg:flex-no-wrap mb-10 flex flex-row flex-wrap bg-white lg:mb-0 lg:table-row lg:flex-row lg:hover:bg-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="relative block w-full border border-b p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto"
                >
                  <span className="absolute left-0 top-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                    ID
                  </span>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {isFetching ? "Loading..." : null}
      </div>
    </section>
  );
}

export default DonationTable;
