const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    // Try to connect to the provided URI first (local or Atlas)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 2000, // Fast timeout (2s) instead of 30s
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Original DB Connection Failed: ${error.message}`);
    console.log('Starting MongoDB Memory Server as fallback...');
    
    try {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      const conn = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Fallback InMemory MongoDB Connected: ${conn.connection.host}`);
    } catch (memError) {
      console.error(`Memory Server Error: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
