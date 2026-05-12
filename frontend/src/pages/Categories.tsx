import { useEffect, useState } from "react";
import api from "../api/api";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api.get("/categories").then((response) => setCategories(response.data));
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Categories</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Organize your expenses</h2>
          </div>
          <button className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            Add category
          </button>
        </div>
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
