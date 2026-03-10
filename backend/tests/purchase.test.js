process.env.NODE_ENV = 'test';
process.env.ENABLE_CSRF = 'false';
jest.setTimeout(180000);

const bcrypt = require('bcryptjs');
const request = require('supertest');
const app = require('../src/app');
const { connectDatabase, clearDatabase, disconnectDatabase, Theme, Curriculum, Lesson, User } = require('../src/models');

describe('Purchase flow', () => {
  let token;
  let lesson;

  beforeAll(async () => {
    await connectDatabase();
    await clearDatabase();

    const theme = await Theme.create({ name: 'Informatique' });
    const curriculum = await Curriculum.create({ title: 'Web', price: 60, themeId: theme.id });
    lesson = await Lesson.create({
      title: 'HTML CSS',
      price: 32,
      content: 'Lorem ipsum',
      videoUrl: 'https://video.local',
      curriculumId: curriculum.id
    });

    const passwordHash = await bcrypt.hash('Password123', 10);
    await User.create({
      email: 'buyer@test.com',
      passwordHash,
      firstName: 'Buyer',
      lastName: 'One',
      role: 'client',
      isActive: true
    });

    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'buyer@test.com',
      password: 'Password123'
    });
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it('allows buying a lesson and then validating it', async () => {
    const purchaseResponse = await request(app)
      .post(`/api/purchase/lessons/${lesson.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(purchaseResponse.status).toBe(201);

    const accessResponse = await request(app)
      .get(`/api/lessons/${lesson.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(accessResponse.status).toBe(200);

    const validationResponse = await request(app)
      .post(`/api/lessons/${lesson.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(validationResponse.status).toBe(200);
    expect(validationResponse.body.lessonValidated).toBe(true);
  });
});
