const mongoose = require('mongoose');
const env = require('./env');

let memoryServer;

async function resolveMongoUri() {
  if (process.env.NODE_ENV !== 'test') {
    return env.MONGODB_URI;
  }

  if (process.env.TEST_MONGODB_URI) {
    return process.env.TEST_MONGODB_URI;
  }

  const { MongoMemoryServer } = require('mongodb-memory-server');
  memoryServer = await MongoMemoryServer.create();
  return memoryServer.getUri();
}

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const uri = await resolveMongoUri();
  await mongoose.connect(uri);
}

async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}

async function clearDatabase() {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  const collections = mongoose.connection.collections;
  const tasks = Object.values(collections).map((collection) => collection.deleteMany({}));
  await Promise.all(tasks);
}

module.exports = {
  mongoose,
  connectDatabase,
  disconnectDatabase,
  clearDatabase
};
