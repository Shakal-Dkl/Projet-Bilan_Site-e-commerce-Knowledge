process.env.NODE_ENV = 'test';
process.env.ENABLE_CSRF = 'false';

const request = require('supertest');
const app = require('../src/app');
const { sequelize, User } = require('../src/models');

describe('Auth flow', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('registers, activates and logs in a user', async () => {
    const registerResponse = await request(app).post('/api/auth/register').send({
      email: 'student@test.com',
      firstName: 'Student',
      lastName: 'One',
      password: 'Password123'
    });

    expect(registerResponse.status).toBe(201);

    const user = await User.findOne({ where: { email: 'student@test.com' } });
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
