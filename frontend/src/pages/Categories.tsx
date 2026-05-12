import { FormEvent, useEffect, useState } from "react";
import api from "../api/api";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");

  const loadCategories = async () => {
    const response = await api.get("/categories");
    setCategories(response.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/categories", { name, type });
      setCategories((prev) => [response.data, ...prev]);
      setName("");
      setType("expense");
      setOpenForm(false);
      setError("");
    } catch (err) {
      setError("Unable to create category. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Categories</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Organize your expenses</h2>
          </div>
          <button
            onClick={() => setOpenForm((value) => !value)}
            className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            {openForm ? "Close form" : "Add category"}
          </button>
        </div>

        {openForm && (
          <form onSubmit={handleAdd} className="mt-8 grid gap-5 rounded-3xl border border-slate-700 bg-slate-900/90 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3"
                placeholder="Food, Salary, Rent"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button className="w-full rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
              Save category
            </button>
          </form>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category._id} className="rounded-3xl border border-slate-700 bg-slate-900/95 p-6 shadow-soft">
            <p className="text-sm text-slate-400">{category.type}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
