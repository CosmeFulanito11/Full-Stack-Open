import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { getCurrentUser } from './utils/storage';

const App: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<string | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) setLoggedUser(user.email);
  }, []);

  const handleLogin = (email: string) => {
    setLoggedUser(email);
  };

  const handleLogout = () => {
    setLoggedUser(null);
  };

  return (
    <Router>
      <AppRoutes loggedUser={loggedUser} onLogin={handleLogin} onLogout={handleLogout} />
    </Router>
  );
};

export default App;