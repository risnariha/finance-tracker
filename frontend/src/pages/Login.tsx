import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("finance_token", response.data.token);
      localStorage.setItem("finance_name", response.data.name);
      navigate("/");
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-slate-100">
      <div className="w-full max-w-md space-y-6 rounded-[32px] border border-slate-700 bg-slate-900/95 p-8 shadow-soft">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Finance Tracker</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-3 text-slate-400">Log in to manage budgets, transactions, and financial insights.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-4 py-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full px-4 py-3"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button className="w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          New here? <Link className="text-sky-300 hover:text-sky-200" to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
