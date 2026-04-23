import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, KanbanSquare, Building2, Settings } from 'lucide-react';
import DashboardPage from './pages/Dashboard';
import LeadsPage from './pages/Leads';
import DealsPipeline from './pages/DealsPipeline';
import PropertiesPage from './pages/Properties';
import SettingsPage from './pages/Settings';

const SidebarItem = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
      <Icon size={20} className={isActive ? 'text-white' : 'text-brand-500'} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = () => (
  <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-4 fixed left-0 top-0">
    <div className="flex items-center gap-2 mb-8 px-2 mt-4">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-blue-600 flex items-center justify-center shadow-lg text-white font-bold text-xl">R</div>
      <h1 className="text-xl font-bold tracking-tight text-gray-900">RealSync CRM</h1>
    </div>
    <nav className="flex-1 flex flex-col gap-2">
      <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" />
      <SidebarItem icon={Users} label="Leads" to="/leads" />
      <SidebarItem icon={Building2} label="Properties" to="/properties" />
      <SidebarItem icon={KanbanSquare} label="Deals Pipeline" to="/deals" />
    </nav>
    <div className="mt-auto border-t border-gray-100 pt-4 flex flex-col gap-2">
      <SidebarItem icon={Settings} label="Settings" to="/settings" />
      <div className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" alt="Agent" className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-100" />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold text-gray-900 truncate">Rahul Sharma</p>
          <p className="text-xs text-brand-600 font-medium truncate">Senior Agent</p>
        </div>
      </div>
    </div>
  </div>
);

const AppLayout = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50/50 font-outfit">
    <Sidebar />
    <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-8 justify-between z-10 sticky top-0">
        <h2 className="font-semibold text-gray-800 text-lg">Welcome back, <span className="text-brand-600 font-bold">Rahul!</span> 👋</h2>
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" alt="RS" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
      </header>
      <div className="p-8 flex-1 overflow-y-auto">
        {children}
      </div>
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/deals" element={<DealsPipeline />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
