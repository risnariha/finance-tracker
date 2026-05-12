import { FormEvent, useEffect, useState } from "react";
import api from "../api/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const loadData = async (params = {}) => {
    const [transactionRes, categoryRes] = await Promise.all([
      api.get("/transactions", { params }),
      api.get("/categories"),
    ]);
    setTransactions(transactionRes.data);
    setCategories(categoryRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const applyFilters = () => {
    loadData({
      type: filterType || undefined,
      category: filterCategory || undefined,
      startDate: filterStartDate || undefined,
      endDate: filterEndDate || undefined,
    });
  };

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const payload = {
        title,
        amount,
        category,
        type,
        date,
        note,
      };
      const response = await api.post("/transactions", payload);
      setTransactions((prev) => [response.data, ...prev]);
      setOpenForm(false);
      setTitle("");
      setAmount(0);
      setCategory("");
      setType("expense");
      setDate(new Date().toISOString().slice(0, 10));
      setNote("");
      setError("");
    } catch (err) {
      setError("Unable to create transaction. Please check the fields.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Transactions</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Manage every entry</h2>
          </div>
          <button
            onClick={() => setOpenForm((value) => !value)}
            className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            {openForm ? "Close form" : "Add transaction"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-200 sm:grid-cols-4">
          <div>
            <label className="mb-2 block text-slate-400">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3"
            >
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-slate-400">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-3"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-slate-400">From</label>
            <input
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              className="w-full px-4 py-3"
            />
          </div>
          <div>
            <label className="mb-2 block text-slate-400">To</label>
            <input
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              className="w-full px-4 py-3"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={applyFilters}
            className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            Apply filters
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterType("");
              setFilterCategory("");
              setFilterStartDate("");
              setFilterEndDate("");
              loadData();
            }}
            className="rounded-2xl bg-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-600"
          >
            Reset
          </button>
        </div>

        {openForm && (
          <form onSubmit={handleAdd} className="mt-8 grid gap-5 rounded-3xl border border-slate-700 bg-slate-900/90 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3"
                  placeholder="Salary, Grocery, Rent"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3"
                  required
                >
                  <option value="">Select category</option>
                  {categories.length === 0 ? (
                    <option value="" disabled>
                      No categories available
                    </option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
                {categories.length === 0 && (
                  <p className="mt-2 text-sm text-slate-400">Create a category first on the Categories page.</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3"
                placeholder="Optional note"
                rows={3}
              />
            </div>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button className="w-full rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
              Save transaction
            </button>
          </form>
        )}
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
