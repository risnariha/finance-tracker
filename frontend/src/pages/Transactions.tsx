import { useEffect, useState } from "react";
import api from "../api/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    api.get("/transactions").then((response) => setTransactions(response.data));
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Transactions</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Manage every entry</h2>
          </div>
          <button className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            Add transaction
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/95 shadow-soft">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="border-t border-slate-800 hover:bg-slate-900/80">
                <td className="px-5 py-4">{transaction.title}</td>
                <td className="px-5 py-4">{transaction.category?.name || "Uncategorized"}</td>
                <td className="px-5 py-4">${transaction.amount.toFixed(2)}</td>
                <td className="px-5 py-4 capitalize text-slate-200">{transaction.type}</td>
                <td className="px-5 py-4">{new Date(transaction.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
