const AuthController = require('../../app/controllers/authController');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const dbClient = require('../../app/utils/db');
const redisClient = require('../../app/utils/redis');
const { User } = require('../../app/models/User');
const Track = require('../../app/models/Track');


const { generateAccessToken, sendEmail, hashPassword } = require('../../app/utils/helper');

describe('AuthController', () => {
    describe('signUp', () => {
        it('should return an error if username is missing', async () => {
            const req = { body: { email: 'test@test.com', password: 'password@123', } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await AuthController.signUp(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing username' });
        });

        it('should return an error if email is missing', async () => {
            const req = { body: { username: 'test', password: 'password@123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await AuthController.signUp(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing email' });
        });

        it('should return an error if password is missing', async () => {
            const req = { body: { username: 'test', email: 'test@test.com' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await AuthController.signUp(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing password' });
        });
    })
})


jest.mock('../../app/utils/db');
jest.mock('../../app/models/User');
jest.mock('../../app/models/Track');
jest.mock('../../app/utils/helper');

describe('createUser function', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create new user and track if user does not already exist', async () => {
      const email = 'test@example.com';
      const username = 'testuser';
      const password = 'password@123';
  
      const userMock = {
        _id: 'user_id'
      };
      const trackMock = {};
  
      hashPassword.mockResolvedValue('hashed_password');
      dbClient.getSchemaOne.mockResolvedValue(null);
      User.create.mockResolvedValue(userMock);
      Track.create.mockResolvedValue(trackMock);
      
  
      const req = { body: { email, username, password } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await AuthController.signUp(req, res);
  
      expect(dbClient.getSchemaOne).toHaveBeenCalledWith(User, { email });
      expect(User.create).toHaveBeenCalledWith({
        username,
        email,
        hashed_password: expect.any(String),
      });
      expect(hashPassword).toHaveBeenCalledWith(password);
      expect(Track.create).toHaveBeenCalledWith({ userId: 'user_id' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });
  
    it('should return 400 error if user already exists', async () => {
      const email = 'test@example.com';
      const username = 'testuser';
      const password = 'password@123';
  
      const existingUserMock = { _id: 'existing_user_id' };
  
      dbClient.getSchemaOne.mockResolvedValue(existingUserMock);
  
      const req = { body: { email, username, password } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await AuthController.signUp(req, res);
  
      expect(dbClient.getSchemaOne).toHaveBeenCalledWith(User, { email });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
    });
  
    it('should return 400 error if there is an error creating user or track', async () => {
      const email = 'test@example.com';
      const username = 'testuser';
      const password = 'password@123';
  
      const createError = new Error('create error');
  
      dbClient.getSchemaOne.mockResolvedValue(null);
      User.create.mockRejectedValue(createError);
  
      const req = { body: { email, username, password } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await AuthController.signUp(req, res);
  
      expect(dbClient.getSchemaOne).toHaveBeenCalledWith(User, { email });
      expect(User.create).toHaveBeenCalledWith({
        username,
        email,
        hashed_password: expect.any(String),
      });
      expect(hashPassword).toHaveBeenCalledWith(password);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: createError.message });
    });
  });
  
describe('signIn function', () => {
  it('returns 400 if email is missing', async () => {
    const req = { body: { password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await AuthController.signIn(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing email' });
  });
  
  it('returns 400 if password is missing', async () => {
    const req = { body: { email: 'test@example.com' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await AuthController.signIn(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing password' });
  });

  it('returns 400 if email or password is invalid', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    dbClient.getSchemaOne = jest.fn().mockResolvedValue(null);

    await AuthController.signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  it('returns access token if email and password are valid', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const user = { _id: Types.ObjectId().toString(), email: 'test@example.com', hashed_password: 'hashedPassword' };

    dbClient.getSchemaOne = jest.fn().mockResolvedValue(user);
    compare.mockResolvedValue(true);
    generateAccessToken.mockReturnValue('accessToken');

    await AuthController.signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({ accessToken: 'accessToken' });
  });
})