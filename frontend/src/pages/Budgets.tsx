import { FormEvent, useEffect, useState } from "react";
import api from "../api/api";

const Budgets = () => {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [error, setError] = useState("");

  const loadData = async () => {
    const [budgetRes, categoryRes] = await Promise.all([
      api.get("/budgets"),
      api.get("/categories"),
    ]);
    setBudgets(budgetRes.data);
    setCategories(categoryRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/budgets", {
        category,
        amount,
        month,
      });
      setBudgets((prev) => [response.data, ...prev]);
      setCategory("");
      setAmount(0);
      setMonth(new Date().toISOString().slice(0, 7));
      setOpenForm(false);
      setError("");
    } catch (err) {
      setError("Unable to create budget. Please verify the fields.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Budgets</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Stay in control</h2>
          </div>
          <button
            onClick={() => setOpenForm((value) => !value)}
            className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            {openForm ? "Close form" : "Add budget"}
          </button>
        </div>

        {openForm && (
          <form onSubmit={handleAdd} className="mt-8 grid gap-5 rounded-3xl border border-slate-700 bg-slate-900/90 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-3">
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Month</label>
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                  className="w-full px-4 py-3"
                />
              </div>
            </div>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button className="w-full rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
              Save budget
            </button>
          </form>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {budgets.map((budget) => (
          <div key={budget._id} className="rounded-3xl border border-slate-700 bg-slate-900/95 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{budget.month}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{budget.category?.name || "Category"}</h3>
              </div>
              <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sm text-sky-200">Budget</span>
            </div>
            <p className="mt-5 text-3xl font-semibold text-white">${budget.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budgets;
