import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Projects from "./pages/Projects";
import Sites from "./pages/Sites";
import Assets from "./pages/Assets";
import Forecast from "./pages/Forecast";
import Suitability from "./pages/Suitability";
import Investment from "./pages/Investment";
import Profile from "./pages/Profile";
import Report from "./pages/Report";
import LoadingAnalysis from "./pages/LoadingAnalysis";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analysis"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Analysis />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/loading"
        element={
          <ProtectedRoute>
            <MainLayout>
              <LoadingAnalysis />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/forecast"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Forecast />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/report"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Report />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Projects />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/sites"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Sites />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/assets"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Assets />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/suitability"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suitability />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/investment"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Investment />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;