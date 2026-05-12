import { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0, transactions: [] as any[] });

  useEffect(() => {
    api.get("/dashboard/summary").then((response) => setSummary(response.data));
  }, []);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Income</p>
          <p className="mt-4 text-3xl font-semibold text-emerald-300">${summary.totalIncome.toFixed(2)}</p>
          <p className="mt-2 text-sm text-slate-400">Total income recorded this month.</p>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Expenses</p>
          <p className="mt-4 text-3xl font-semibold text-rose-300">${summary.totalExpenses.toFixed(2)}</p>
          <p className="mt-2 text-sm text-slate-400">Total expenses tracked this month.</p>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Balance</p>
          <p className="mt-4 text-3xl font-semibold text-sky-300">${summary.balance.toFixed(2)}</p>
          <p className="mt-2 text-sm text-slate-400">Your current spending balance.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
            <p className="mt-2 text-sm text-slate-400">Your latest income and expense activity.</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
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
              {summary.transactions.slice(0, 5).map((transaction) => (
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
      </section>
    </div>
  );
};

export default Dashboard;
