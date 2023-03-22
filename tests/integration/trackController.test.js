const request = require('supertest');
const { Types } = require('mongoose');
const app = require('../../app/server');
const dbClient = require('../../app/utils/db');
const Track = require('../../app/models/Track');



  describe('POST /income', () => {
    // before(() => {

    // });

    it('should add a new income record', async () => {
      // create a new user
      const user = await dbClient.getSchemaOne(Track, {
        userId: new Types.ObjectId(),
        currentBalance: 0,
        totalIncome: 0,
        totalExpenses: 0,
        income: [],
        expense: [],
      });

      // make a POST request to add income
      const res = await request(app)
        .post('/income')
        .set('Authorization', `Bearer ${user.token}`) //token-based auth from middleware
        .send({
          amount: 1000,
          description: 'Salary',
        });

      // assert that the response is successful
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: 'success' });

      // assert that the income record was added to the database
      const track = await dbClient.getSchemaOne(Track, { userId: user.userId });
      expect(track.income).toHaveLength(1);
      expect(track.income[0]).toMatchObject({
        type: 'Income',
        amount: 1000,
        description: 'Salary',
        currentBalance: 1000,
      });
      expect(track.totalIncome).toBe(1000);
      expect(track.currentBalance).toBe(1000);
    });

    it('should return an error if amount is missing', async () => {
      // create a new user
      const user = await dbClient.getSchemaOne(Track, {
        userId: new Types.ObjectId(),
        currentBalance: 0,
        totalIncome: 0,
        totalExpenses: 0,
        income: [],
        expense: [],
      });

      // make a POST request to add income without an amount
      const res = await request(app)
        .post('/income')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          description: 'Salary',
        });

      // assert that the response is a bad request with an error message
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Missing Amount' });

      // assert that no income record was added to the database
      const track = await dbClient.getSchemaOne(Track, { userId: user.userId });
      expect(track.income).toHaveLength(0);
      expect(track.totalIncome).toBe(0);
      expect(track.currentBalance).toBe(0);
    });
  });
