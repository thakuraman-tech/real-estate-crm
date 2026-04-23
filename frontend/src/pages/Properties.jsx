import React, { useState, useEffect } from 'react';
import { MapPin, Bed, Bath, Square, Plus, Building, X } from 'lucide-react';
import api from '../api';

// Removed mockProperties
const PropertyCard = ({ property }) => {
  const price = property.price ? `$${property.price.toLocaleString()}` : '$0';
  const address = property.location?.address || 'No Address';
  const beds = property.features?.beds || 0;
  const baths = property.features?.baths || 0;
  const sqft = property.features?.areaSqFt || 0;
  const image = (property.images && property.images.length > 0) ? property.images[0] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';
  const agentName = 'Rahul Sharma';
  const agentAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80';

  return (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer">
    <div className="relative h-60 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <img src={image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm z-20">
        {property.status}
      </div>
      <div className="absolute bottom-4 left-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <button onClick={(e) => { e.stopPropagation(); window.alert(`Opening details for ${property.title}...`); }} className="bg-brand-500 hover:bg-brand-600 text-white text-sm px-4 py-2 rounded-lg font-semibold shadow-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2 gap-4">
        <div>
          <div className="text-brand-600 font-extrabold text-2xl tracking-tight mb-1">{price}</div>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 leading-snug group-hover:text-brand-600 transition-colors">{property.title}</h3>
        </div>
        <img src={agentAvatar} alt={agentName} title={`Managed by ${agentName}`} className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover flex-shrink-0 relative -top-8 bg-gray-100 group-hover:scale-110 transition-transform" />
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-5 font-medium">
        <MapPin size={14} className="mr-1.5 shrink-0 text-gray-400" />
        <span className="truncate">{address}</span>
      </div>
      
      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2 gap-1 group-hover:bg-brand-50 transition-colors">
          <Bed size={16} className="text-gray-400 group-hover:text-brand-500" />
          <span className="text-xs font-bold text-gray-700">{beds} <span className="text-gray-400 font-medium">Beds</span></span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2 gap-1 group-hover:bg-brand-50 transition-colors">
          <Bath size={16} className="text-gray-400 group-hover:text-brand-500" />
          <span className="text-xs font-bold text-gray-700">{baths} <span className="text-gray-400 font-medium">Baths</span></span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2 gap-1 group-hover:bg-brand-50 transition-colors">
          <Square size={16} className="text-gray-400 group-hover:text-brand-500" />
          <span className="text-xs font-bold text-gray-700">{sqft} <span className="text-gray-400 font-medium">Sqft</span></span>
        </div>
      </div>
    </div>
  </div>
)};

const AddPropertyModal = ({ isOpen, onClose, onPropertyAdded }) => {
  const [formData, setFormData] = useState({ title: '', address: '', price: '', status: 'Available', beds: '', baths: '', sqft: '' });

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const payload = {
        title: formData.title,
        price: Number(formData.price),
        status: formData.status,
        location: { address: formData.address },
        features: {
          beds: Number(formData.beds),
          baths: Number(formData.baths),
          areaSqFt: Number(formData.sqft)
        }
      };
      await api.post('/properties', payload);
      onPropertyAdded();
      onClose();
      setFormData({ title: '', address: '', price: '', status: 'Available', beds: '', baths: '', sqft: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add property');
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Add New Property</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-lg transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Luxury Villa" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all placeholder:text-gray-400" placeholder="123 Main St..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all placeholder:text-gray-400" placeholder="$..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all text-gray-700">
                <option>Available</option>
                <option>Under Contract</option>
                <option>Sold</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
               <input type="number" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
               <input type="number" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Sqft</label>
               <input type="number" value={formData.sqft} onChange={e => setFormData({...formData, sqft: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              Save Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PropertiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const { data } = await api.get('/properties');
      setProperties(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => filter === 'All' || p.status === filter);

  return (
    <>
      <AddPropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPropertyAdded={fetchProperties} />
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Properties Portfolio</h1>
            <p className="text-gray-500 mt-1">Manage and track your listed properties.</p>
          </div>
          <div className="flex gap-3">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 pr-8 pl-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm outline-none cursor-pointer appearance-none">
              <option value="All">All Properties</option>
              <option value="Available">Available</option>
              <option value="Under Contract">Under Contract</option>
              <option value="Sold">Sold</option>
            </select>
            <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 hover:-translate-y-0.5">
              <Plus size={18} /> Add Property
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map(p => <PropertyCard key={p._id || p.id} property={p} />)}
        </div>
      </div>
    </>
  );
}
