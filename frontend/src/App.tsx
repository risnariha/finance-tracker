import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Budgets from "./pages/Budgets";
import Layout from "./components/Layout";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const authToken = localStorage.getItem("finance_token");
  return authToken ? element : <Navigate to="/login" replace />;
};

function App() {
  const authToken = localStorage.getItem("finance_token");

  return (
    <Routes>
      <Route path="/login" element={authToken ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={authToken ? <Navigate to="/" replace /> : <Register />} />
      <Route path="/" element={<PrivateRoute element={<Layout />} />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="categories" element={<Categories />} />
        <Route path="budgets" element={<Budgets />} />
      </Route>
      <Route path="*" element={<Navigate to={authToken ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App;
