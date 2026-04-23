// Mock API using LocalStorage to make the GitHub Pages deploy fully functional without a backend server

const initialData = {
  users: [{ id: 'user-1', name: 'Rahul Sharma', email: 'rahul@example.com', password: 'password', role: 'Agent' }],
  leads: [
    { _id: 'lead-1', name: 'Amit Singh', email: 'amit.singh@gmail.com', phone: '+91 9876543210', budget: '2.5 Cr', status: 'New', priority: 'High', source: 'Website', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' },
    { _id: 'lead-2', name: 'Priya Patel', email: 'priya.p@yahoo.in', phone: '+91 9876512345', budget: '1.2 Cr', status: 'Contacted', priority: 'Medium', source: 'Referral', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { _id: 'lead-3', name: 'Vikram Malhotra', email: 'vikram@enterprise.com', phone: '+91 9123456789', budget: '5 Cr', status: 'Qualified', priority: 'High', source: 'Direct', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
    { _id: 'lead-4', name: 'Sneha Desai', email: 'sneha.d@gmail.com', phone: '+91 9988776655', budget: '80 L', status: 'Converted', priority: 'Low', source: 'Social Media', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' }
  ],
  properties: [
    { _id: 'prop-1', title: 'Luxury Villa in DLF Phase 5', price: 45000000, status: 'Available', location: { address: 'DLF Phase 5, Gurgaon' }, features: { beds: 4, baths: 5, areaSqFt: 5000 }, images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'] },
    { _id: 'prop-2', title: 'Modern 3BHK in Andheri West', price: 21000000, status: 'Available', location: { address: 'Andheri West, Mumbai' }, features: { beds: 3, baths: 3, areaSqFt: 1800 }, images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'] },
    { _id: 'prop-3', title: 'Beachfront Penthouse', price: 85000000, status: 'Sold', location: { address: 'Juhu Tara Road, Mumbai' }, features: { beds: 5, baths: 6, areaSqFt: 6500 }, images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'] }
  ],
  deals: [
    { _id: 'deal-1', title: 'DLF Villa Negotiation', leadId: { name: 'Amit Singh' }, amount: 45000000, stage: 'Negotiation', createdAt: new Date(Date.now() - 2*86400000).toISOString() },
    { _id: 'deal-2', title: 'Andheri Flat Agreement', leadId: { name: 'Priya Patel' }, amount: 21000000, stage: 'Agreement', createdAt: new Date(Date.now() - 5*86400000).toISOString() },
    { _id: 'deal-3', title: 'Juhu Penthouse Closed', leadId: { name: 'Sneha Desai' }, amount: 85000000, stage: 'Closed', createdAt: new Date(Date.now() - 10*86400000).toISOString() }
  ]
};

// Initialize DB if empty
if (!localStorage.getItem('realestate_db')) {
  localStorage.setItem('realestate_db', JSON.stringify(initialData));
}

const getDB = () => JSON.parse(localStorage.getItem('realestate_db'));
const saveDB = (db) => localStorage.setItem('realestate_db', JSON.stringify(db));

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  defaults: { headers: { common: {} } },
  get: async (url) => {
    await delay(300);
    const db = getDB();
    if (url === '/leads') return { data: { success: true, data: db.leads } };
    if (url === '/properties') return { data: { success: true, data: db.properties } };
    if (url === '/deals') return { data: { success: true, data: db.deals } };
    throw new Error('Not found');
  },
  post: async (url, data) => {
    await delay(400);
    const db = getDB();
    const newId = 'id-' + Math.random().toString(36).substr(2, 9);
    
    if (url === '/auth/login') {
      const user = db.users.find(u => u.email === data.email && u.password === data.password);
      if (user) return { data: { token: 'mock-jwt-token-123', user } };
      
      // If user doesn't exist, just auto-create them to make testing easier
      const autoUser = { id: newId, name: data.email.split('@')[0], email: data.email, role: 'Agent' };
      db.users.push(autoUser);
      saveDB(db);
      return { data: { token: 'mock-jwt-token-123', user: autoUser } };
    }
    if (url === '/auth/register') {
      const newUser = { id: newId, ...data, role: 'Agent' };
      db.users.push(newUser);
      saveDB(db);
      return { data: { token: 'mock-jwt-token-123', user: newUser } };
    }
    if (url === '/leads') {
      const newItem = { _id: newId, ...data, createdAt: new Date().toISOString() };
      db.leads.unshift(newItem);
      saveDB(db);
      return { data: { success: true, data: newItem } };
    }
    if (url === '/properties') {
      const newItem = { _id: newId, ...data, createdAt: new Date().toISOString() };
      db.properties.unshift(newItem);
      saveDB(db);
      return { data: { success: true, data: newItem } };
    }
    if (url === '/deals') {
      const newItem = { _id: newId, ...data, createdAt: new Date().toISOString() };
      db.deals.unshift(newItem);
      saveDB(db);
      return { data: { success: true, data: newItem } };
    }
    throw new Error('Route not matched');
  },
  put: async (url, data) => {
    await delay(200);
    const db = getDB();
    if (url.startsWith('/deals/')) {
      const id = url.split('/')[2];
      const index = db.deals.findIndex(d => d._id === id || d.id === id);
      if (index !== -1) {
        db.deals[index] = { ...db.deals[index], ...data };
        saveDB(db);
        return { data: { success: true, data: db.deals[index] } };
      }
    }
    throw new Error('Not found');
  }
};

export default api;
