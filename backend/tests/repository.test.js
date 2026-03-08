process.env.NODE_ENV = 'test';

const bcrypt = require('bcryptjs');
const { sequelize } = require('../src/models');
const userRepository = require('../src/repositories/UserRepository');

describe('User repository tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('creates and reads a user', async () => {
    const passwordHash = await bcrypt.hash('Password123', 10);
    await userRepository.create({
      email: 'repo@test.com',
      passwordHash,
      firstName: 'Repo',
      lastName: 'User',
      role: 'client',
      isActive: true
    });

    const user = await userRepository.findByEmail('repo@test.com');
    expect(user).toBeTruthy();
    expect(user.email).toBe('repo@test.com');
  });

  it('stores password as hash, not plain text', async () => {
    const user = await userRepository.findByEmail('repo@test.com');
    expect(user.passwordHash).not.toBe('Password123');
    expect(user.passwordHash.length).toBeGreaterThan(20);
  });
});
