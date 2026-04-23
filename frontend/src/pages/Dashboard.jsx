import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Home } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 7500 },
];

const recentActivity = [
  { id: 1, type: 'deal', text: 'Deal closed: Palm Villa', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
  { id: 2, type: 'lead', text: 'New lead: Amit Singh', time: '4 hours ago', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' },
  { id: 3, type: 'showing', text: 'Showing scheduled for Downtown Penthouse', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
  { id: 4, type: 'deal', text: 'Negotiating: Suburb Home', time: '2 days ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
];

const StatCard = ({ title, value, trend, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex items-start justify-between cursor-pointer group">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{value}</h3>
      <div className="flex items-center gap-1 mt-2 text-sm">
        <TrendingUp size={16} className={trend >= 0 ? 'text-green-500' : 'text-red-500'} />
        <span className={trend >= 0 ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
          {Math.abs(trend)}%
        </span>
        <span className="text-gray-400">vs last month</span>
      </div>
    </div>
    <div className={`p-4 rounded-xl shadow-md ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeLeads: 0,
    propertiesSold: 0,
    conversionRate: 0,
    recentActivity: recentActivity // Keep mock for now unless we build an activity endpoint
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [leadsRes, propsRes, dealsRes] = await Promise.all([
          api.get('/leads'),
          api.get('/properties'),
          api.get('/deals')
        ]);

        const leads = leadsRes.data;
        const properties = propsRes.data;
        const deals = dealsRes.data;

        const activeLeads = leads.filter(l => l.status !== 'Converted' && l.status !== 'Lost').length;
        const propertiesSold = properties.filter(p => p.status === 'Sold').length;
        const closedDeals = deals.filter(d => d.stage === 'Closed');
        const totalRevenue = closedDeals.reduce((sum, d) => sum + (d.amount || 0), 0);
        
        const conversionRate = leads.length > 0 ? ((closedDeals.length / leads.length) * 100).toFixed(1) : 0;

        setStats(prev => ({
          ...prev,
          activeLeads,
          propertiesSold,
          totalRevenue,
          conversionRate
        }));
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
    return `$${val}`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your deals today.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={formatCurrency(stats.totalRevenue)} trend={12.5} icon={DollarSign} color="bg-gradient-to-br from-brand-400 to-brand-600 shadow-brand-500/20" />
        <StatCard title="Active Leads" value={stats.activeLeads.toLocaleString()} trend={8.2} icon={Users} color="bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/20" />
        <StatCard title="Properties Sold" value={stats.propertiesSold.toLocaleString()} trend={-2.4} icon={Home} color="bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/20" />
        <StatCard title="Conversion Rate" value={`${stats.conversionRate}%`} trend={4.1} icon={TrendingUp} color="bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue Chart</h3>
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all cursor-pointer">
              <option>Last 6 months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis tickFormatter={(val) => `$${val}`} axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <button onClick={() => window.alert('Navigating to full activity log...')} className="text-brand-500 text-sm font-medium hover:text-brand-600 transition-colors">View All</button>
          </div>
          <div className="space-y-5">
             {recentActivity.map(activity => (
                <div key={activity.id} className="flex gap-4 items-center group cursor-pointer">
                  <img src={activity.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
