process.env.NODE_ENV = 'test';
process.env.ENABLE_CSRF = 'false';
jest.setTimeout(180000);

const request = require('supertest');
const app = require('../src/app');
const { connectDatabase, clearDatabase, disconnectDatabase, User } = require('../src/models');

describe('Auth flow', () => {
  beforeAll(async () => {
    await connectDatabase();
    await clearDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it('registers, activates and logs in a user', async () => {
    const registerResponse = await request(app).post('/api/auth/register').send({
      email: 'student@test.com',
      firstName: 'Student',
      lastName: 'One',
      password: 'Password123'
    });

    expect(registerResponse.status).toBe(201);

    const user = await User.findOne({ email: 'student@test.com' });
    expect(user).toBeTruthy();
    expect(user.role).toBe('client');
    expect(user.isActive).toBe(false);

    const activationResponse = await request(app).get(`/api/auth/activate/${user.activationToken}`);
    expect(activationResponse.status).toBe(200);

    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'student@test.com',
      password: 'Password123'
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeTruthy();
  });
});
