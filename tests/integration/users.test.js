const request = require('supertest');
const { User } = require('../../models/user');
let server;

describe('/api/users', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });
  describe('GET /getallusersbyteamid/:id', () => {
    it('should return all users if valid team id is passed', async () => {
      const user = User({
        name: 'user1',
        email: 'user1@gmail.com',
        password: 'password1',
        team: 1,
      });
      user.save();
      const res = await request(server).get(
        '/api/users/getallusersbyteamid/' + user.team
      );
      expect(res.status).toBe(200);
    });
  });
  describe('POST /', () => {
    it('should return 200 if user info is correct and gets registered', async () => {
      const res = await request(server)
        .post('/api/users')
        .send({ name: 'user1', email: 'user1@gmail.com', password: '123456' });
      expect(res.status).toBe(200);
    });
  });
});
