import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NavBar } from "./components/NavBar";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { SettingPage } from "./pages/SettingPage";
import { PiSpinnerBold } from "react-icons/pi";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { EmployeeDashboard } from "./dashboard/EmployeeDashboard";
import { AdminDashboard } from "./dashboard/AdminDashboard";
function App() {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const role = authUser?.user?.role;

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-[calc(100vh-var(--navbar-height))] flex justify-center items-center">
        <PiSpinnerBold className="text-4xl animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            role ? <Navigate to={`/${role}`} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route path="/setting" element={<SettingPage />} />
        <Route
          path="/admin"
          element={authUser ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/employee"
          element={authUser ? <EmployeeDashboard /> : <Navigate to="/" />}
        />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
