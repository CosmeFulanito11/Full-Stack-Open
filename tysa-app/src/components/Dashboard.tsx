import React from 'react';
import Breadcrumb from './ui/BreadCrum';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail, onLogout }) => {
  return (
    <div className="w-full mt-5">
      <div className='px-6 py-3'>
        <Breadcrumb items={[
          { label: 'Home', path: '/Dashboard' }
        ]} onLogout={onLogout} />
      </div>
      <div className='w-full h-screen bg-gray-100 p-4'>
        <h1>Bienvenido, {userEmail}!</h1>
        <p>Esta es tu pantalla de inicio.</p>
      </div>
    </div>
  );
};

export default Dashboard;
