import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

import OverviewPage from "./pages/app/OverviewPage";
import ProductsPage from "./pages/app/ProductsPage";
import SalesPage from "./pages/app/SalesPage";
import DebtsPage from "./pages/app/DebtsPage";
import CustomersPage from "./pages/app/CustomersPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* APP protégée + layout */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="debts" element={<DebtsPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
