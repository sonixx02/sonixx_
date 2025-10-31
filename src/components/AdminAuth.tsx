import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export const ADMIN_PIN = '0209'; // You can change this to your desired PIN

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [pin, setPin] = useState('');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      onAuthenticated();
    } else {
      alert('Incorrect PIN');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen px-8 py-16 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-emerald-400" size={24} />
          <h1 className="text-2xl font-semibold text-emerald-400">Admin Access</h1>
        </div>
        <form onSubmit={handlePinSubmit}>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-emerald-400 text-black rounded-lg font-semibold hover:bg-emerald-500 transition-colors duration-200"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;