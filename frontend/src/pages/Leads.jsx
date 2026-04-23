import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Hash, Mail, Phone, ExternalLink, X } from 'lucide-react';

const mockLeads = [
  { id: 1, name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', email: 'priya@example.com', phone: '+91 98765 43210', status: 'New', priority: 'High', source: 'Website', budget: '$500K' },
  { id: 2, name: 'Rohit Kumar', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80', email: 'rohit@techco.in', phone: '+91 91234 56789', status: 'Contacted', priority: 'Medium', source: 'Referral', budget: '$1.2M' },
  { id: 3, name: 'Anil Gupta', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80', email: 'anil@guptacorp.com', phone: '+91 98888 77777', status: 'Qualified', priority: 'High', source: 'Ads', budget: '$800K' },
  { id: 4, name: 'Kavita Verma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', email: 'kavi@verma.com', phone: '+91 99999 11111', status: 'Converted', priority: 'Low', source: 'Direct', budget: '$2.5M' },
  { id: 5, name: 'Vinay Reddy', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', email: 'vinay@reddyrealty.in', phone: '+91 88888 22222', status: 'New', priority: 'Medium', source: 'Website', budget: '$3.1M' },
];

const StatusBadge = ({ status }) => {
  const styles = {
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Qualified': 'bg-purple-100 text-purple-700 border-purple-200',
    'Converted': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const dots = {
    'High': 'bg-red-500',
    'Medium': 'bg-yellow-500',
    'Low': 'bg-gray-400',
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full shadow-sm ${dots[priority]}`}></div>
      <span className="text-sm font-medium text-gray-700">{priority}</span>
    </div>
  );
};

const AddLeadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-lg transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Ramesh Kumar" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-gray-400" placeholder="ramesh@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-gray-400" placeholder="+91..." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-gray-400" placeholder="e.g. $500K or 4 Cr" />
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              Save Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LeadsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = mockLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col">
         <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage, track, and convert your incoming prospects.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 flex items-center gap-2 hover:-translate-y-0.5">
            <Plus size={18} /> Add Lead
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search leads..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 w-72 transition-all bg-white shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-medium text-gray-500">Total:</span>
              <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">{filteredLeads.length} leads</span>
            </div>
          </div>
          
          <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white shadow-sm z-10">
                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold">Lead Details</th>
                  <th className="px-6 py-4 font-semibold">Contact Info</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Priority</th>
                  <th className="px-6 py-4 font-semibold">Source</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-brand-50/30 transition-colors group text-sm cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:ring-2 ring-brand-500/30 transition-all" />
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{lead.name}</p>
                          <p className="text-gray-500 text-xs mt-0.5 font-medium">{lead.budget} Budget</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center text-gray-600 font-medium text-xs gap-2 hover:text-brand-600 transition-colors">
                          <Mail size={13} className="text-gray-400 group-hover:text-brand-500" /> {lead.email}
                        </div>
                        <div className="flex items-center text-gray-600 font-medium text-xs gap-2">
                          <Phone size={13} className="text-gray-400 group-hover:text-brand-500" /> {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                    <td className="px-6 py-4"><PriorityBadge priority={lead.priority} /></td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                        {lead.source} <ExternalLink size={12} className="text-gray-400"/>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={(e) => { e.stopPropagation(); window.alert('Opening lead options menu...'); }} className="p-2 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
