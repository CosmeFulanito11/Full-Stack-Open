import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';

interface AppRoutesProps {
  loggedUser: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ loggedUser, onLogin, onLogout }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={loggedUser ? <Navigate to="/dashboard" replace /> : <Login onLogin={onLogin} />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={loggedUser ? (
          <Dashboard userEmail={loggedUser} onLogout={onLogout} />
        ) : (
          <Navigate to="/" replace />
        )}
      />
    </Routes>
  );
};

export default AppRoutes;
