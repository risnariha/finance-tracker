import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import api from "../api/api";

const COLORS = ["#38bdf8", "#7dd3fc", "#0ea5e9", "#9333ea", "#fb7185", "#f97316"];

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactions: [] as any[],
    expenseDistribution: [] as any[],
    monthlySummary: [] as any[],
    budgetDetails: [] as any[],
  });

  useEffect(() => {
    api.get("/dashboard/summary").then((response) => setSummary(response.data));
  }, []);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Income</p>
            <p className="mt-4 text-3xl font-semibold text-emerald-300">${summary.totalIncome.toFixed(2)}</p>
            <p className="mt-2 text-sm text-slate-400">Total income recorded.</p>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Expenses</p>
            <p className="mt-4 text-3xl font-semibold text-rose-300">${summary.totalExpenses.toFixed(2)}</p>
            <p className="mt-2 text-sm text-slate-400">Total expenses recorded.</p>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Balance</p>
            <p className="mt-4 text-3xl font-semibold text-sky-300">${summary.balance.toFixed(2)}</p>
            <p className="mt-2 text-sm text-slate-400">Net cash flow overview.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Budget usage</h2>
              <p className="mt-2 text-sm text-slate-400">Track budgets against actual spending.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {summary.budgetDetails.map((budget) => (
              <div key={budget._id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{budget.month}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{budget.category?.name || "Category"}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm ${budget.exceeded ? "bg-rose-500/15 text-rose-300" : "bg-emerald-500/15 text-emerald-200"}`}>
                    {budget.exceeded ? "Over budget" : "On track"}
                  </span>
                </div>
                <div className="mt-4 rounded-3xl bg-slate-800 p-3">
                  <div className="h-3 rounded-full bg-slate-700">
                    <div className="h-3 rounded-full bg-sky-500" style={{ width: `${budget.usage}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                    <span>${budget.spent.toFixed(2)} spent</span>
                    <span>{budget.usage.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Monthly trends</h2>
              <p className="mt-2 text-sm text-slate-400">Income vs expenses by month.</p>
            </div>
          </div>

          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.monthlySummary}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip wrapperStyle={{ backgroundColor: "#0f172a", borderRadius: 12 }} />
                <Legend formatter={(value) => <span className="text-slate-200">{value}</span>} />
                <Bar dataKey="income" fill="#38bdf8" radius={[12, 12, 0, 0]} />
                <Bar dataKey="expenses" fill="#fb7185" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft">
          <div>
            <h2 className="text-xl font-semibold text-white">Expense breakdown</h2>
            <p className="mt-2 text-sm text-slate-400">Top categories by spend.</p>
          </div>

          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary.expenseDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  innerRadius={50}
                  paddingAngle={3}
                >
                  {summary.expenseDistribution.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip wrapperStyle={{ backgroundColor: "#0f172a", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
