"use client";

import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { NextPage } from "next";

import useTxHistory from "~/hooks/useTxHistory";
import useUser from "~/lib/useUser";

const History: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { data: donations, isLoading } = useTxHistory(user?.id);
  // TODO render the data in a neat way
  console.log({
    donations,
    length: donations?.length,
    type: typeof Object.values(donations || {}),
  });

  if (isLoading) return <span>Loading</span>;

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="hidden border border-gray-300 bg-gray-200 p-3 font-bold uppercase text-gray-600 lg:table-cell">
              ID
            </th>
            <th className="hidden border border-gray-300 bg-gray-200 p-3 font-bold uppercase text-gray-600 lg:table-cell">
              Date
            </th>
            <th className="hidden border border-gray-300 bg-gray-200 p-3 font-bold uppercase text-gray-600 lg:table-cell">
              Donor
            </th>
            <th className="hidden border border-gray-300 bg-gray-200 p-3 font-bold uppercase text-gray-600 lg:table-cell">
              Message
            </th>
            <th className="hidden border border-gray-300 bg-gray-200 p-3 font-bold uppercase text-gray-600 lg:table-cell">
              Amount (XMR)
            </th>
            <th className="hidden border border-gray-300 bg-gray-200 p-3 font-bold uppercase text-gray-600 lg:table-cell">
              Paid
            </th>
          </tr>
        </thead>
        <tbody>
          {donations?.length ? (
            donations.map(
              ({ id, isPaid, amount, message, timestamp, donor }) => (
                <tr
                  key={id}
                  className="lg:flex-no-wrap mb-10 flex flex-row flex-wrap bg-white lg:mb-0 lg:table-row lg:flex-row lg:hover:bg-gray-100"
                >
                  <td className="relative block w-full border border-b p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                    <span className="absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                      ID
                    </span>
                    {id.slice(0, 4)}...{id.slice(-4)}
                  </td>
                  <td className="relative block w-full border border-b p-3 text-center text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                    <span className="absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                      Date
                    </span>
                    {new Date(timestamp ?? "").toLocaleString()}
                  </td>
                  <td className="relative block w-full border border-b p-3 text-center text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                    <span className="absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                      Donor
                    </span>
                    {donor}
                  </td>
                  <td className="relative block w-full border border-b p-3 text-center text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                    <span className="absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                      Message
                    </span>
                    {message}
                  </td>
                  <td className="relative block w-full border border-b p-3 text-center text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                    <span className="absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                      Amount (XMR)
                    </span>
                    {amount}
                  </td>
                  <td className="relative block w-full border border-b p-3 text-center text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                    <span className="absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                      Paid
                    </span>
                    {isPaid ? (
                      <CheckCircledIcon className="mx-auto" />
                    ) : (
                      <CrossCircledIcon className="mx-auto" />
                    )}
                  </td>
                </tr>
              )
            )
          ) : (
            <div className="flex grow">No donations received yet</div>
          )}
        </tbody>
      </table>
    </>
  );
};

export default History;
