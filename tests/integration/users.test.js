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
});
