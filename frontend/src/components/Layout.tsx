import { Link, Outlet, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", to: "/" },
  { name: "Transactions", to: "/transactions" },
  { name: "Categories", to: "/categories" },
  { name: "Budgets", to: "/budgets" },
];

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("finance_token");
    localStorage.removeItem("finance_name");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1400px] gap-6 p-6 lg:p-10">
        <aside className="w-full max-w-[280px] rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-soft backdrop-blur-lg lg:block">
          <div className="mb-10 flex items-center gap-3 rounded-3xl bg-slate-800 p-4 shadow-lg shadow-slate-900/40">
            <div className="h-12 w-12 rounded-2xl bg-sky-500/15 text-2xl leading-12 text-sky-300">F</div>
            <div>
              <p className="text-sm text-slate-400">Finance Tracker</p>
              <p className="font-semibold text-white">Smart money dashboard</p>
            </div>
          </div>

          <nav className="space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700/70"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={logout}
            className="mt-10 w-full rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
          >
            Sign out
          </button>
        </aside>

        <main className="flex-1 rounded-[32px] border border-slate-700 bg-slate-900/90 p-6 shadow-soft backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Welcome back</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Financial insights and controls</h1>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
