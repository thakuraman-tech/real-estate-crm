import React, { useState } from 'react';
import { User, Bell, Shield, Key, Moon, Globe, Loader2 } from 'lucide-react';

const SettingCard = ({ icon: Icon, title, description, active }) => (
  <div className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${active ? 'bg-brand-50/50 border-brand-200' : 'bg-white border-gray-100 hover:border-brand-200 hover:shadow-sm'}`}>
    <div className={`p-2.5 rounded-xl ${active ? 'bg-brand-100 text-brand-600' : 'bg-gray-50 text-gray-500'}`}>
      <Icon size={20} />
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-gray-900 mb-0.5">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export default function SettingsPage() {
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      window.alert('Settings successfully updated!');
    }, 800);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and system configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
        <div className="flex flex-col gap-3">
          <SettingCard icon={User} title="Profile Identity" description="Manage your personal information." active={true} />
          <SettingCard icon={Bell} title="Notifications" description="Configure email routing alerts." />
          <SettingCard icon={Shield} title="Security Options" description="Update passwords and setup 2FA." />
          <SettingCard icon={Globe} title="Regional Defaults" description="Set interface language and timezone." />
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Profile Details</h2>
          
          <div className="flex items-center gap-6 mb-10">
            <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-gray-50 shadow-sm object-cover" />
            <div>
              <label className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-none mb-2 cursor-pointer inline-block">
                Upload new picture
                <input type="file" className="hidden" accept="image/*" onChange={(e) => { 
                  if (e.target.files[0]) {
                    setAvatar(URL.createObjectURL(e.target.files[0]));
                  }
                }} />
              </label>
              <p className="text-xs text-gray-400">JPG, GIF or PNG. Maximum 1MB allowed.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
              <input type="text" defaultValue="Rahul" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
              <input type="text" defaultValue="Sharma" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input type="email" defaultValue="rahul.sharma@realsync.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title</label>
              <input type="text" defaultValue="Senior Agent" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-gray-500" disabled />
            </div>
          </div>
          
          <div className="mt-10 flex justify-end border-t border-gray-100 pt-6">
             <button onClick={handleSave} disabled={isSaving} className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 hover:-translate-y-0.5 flex items-center gap-2">
               {isSaving && <Loader2 size={16} className="animate-spin" />}
               {isSaving ? 'Saving...' : 'Save Changes'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
