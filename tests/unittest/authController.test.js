const AuthController = require('../../app/controllers/authController');
const request = require('supertest');
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbClient = require('../../app/utils/db');
const redisClient = require('../../app/utils/redis');
const { User } = require('../../app/models/User');
const Track = require('../../app/models/Track');
const mongoose = require('mongoose');
const { Types } = mongoose;
const redisMock = require('redis-mock');
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
  
  jest.mock('../../app/utils/db');
  jest.mock('../../app/models/User');
  jest.mock('../../app/models/Track');
  jest.mock('../../app/utils/helper');
  jest.mock('../../app/utils/redis')

  

    
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
      expect(res.json).toHaveBeenCalledWith({ message: 'success' });
    });
      
    it('should return 400 error if user already exists', async () => {
      const email = 'test@example.com';
      const username = 'testuser';
      const password = 'password@123';
      
      const existingUserMock = { _id: 'existing_user_id' };
      
      dbClient.getSchemaOne = jest.fn().mockResolvedValue(existingUserMock);
      
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
      
      dbClient.getSchemaOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockRejectedValue(createError);
      hashPassword.mockReturnValue('hashed_password');
 
      const req = { body: { email, username, password } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      await AuthController.signUp(req, res);
      
      expect(dbClient.getSchemaOne).toHaveBeenCalledWith(User, { email });
      expect(User.create).toHaveBeenCalledWith({
        username,
        email,
        hashed_password: 'hashed_password',
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
      const req = { body: { email: 'test@example.com', password: 'password@123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    
      const user = { _id: new Types.ObjectId().toString(), email: 'test@example.com', hashed_password: 'hashedPassword' };
        
      dbClient.getSchemaOne = jest.fn().mockResolvedValue(user);
      //compare.mockResolvedValue(true);
      await AuthController.signIn(req, res);
    
      // expect(res.status).toHaveBeenCalledWith(202);
      // expect(res.json).toHaveBeenCalledWith({ accessToken: 'accessToken' });
        
    });
  })

  jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
  }));
  

  jest.mock('../../app/utils/helper', () => ({
    hashPassword: jest.fn(),
    generateAccessToken: jest.fn(),
    sendEmail: jest.fn(),
  }));
  
  describe('getNewToken', () => {
  beforeEach(() => {
    jest.resetModules() 
    
  });
    
    it('should verify refresh token and return new access token', async () => {
      const mockRefreshToken = 'mockRefreshToken';
      const mockAccessToken = 'mockAccessToken';
      const jwtVerifyMock = jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        if (token === mockRefreshToken && secret === process.env.API_SECRET_REFRESH) {
          callback(null, { id: '123' });
        } else {
          callback(new Error('Invalid token'));
        }
      });
      const req = { body: { token: mockRefreshToken } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const redisClientGetMock = jest.spyOn(redisClient, 'get').mockResolvedValue(mockRefreshToken);
      const redisClientDelMock = jest.spyOn(redisClient, 'del').mockResolvedValue();
      const redisClientSetMock = jest.spyOn(redisClient, 'set').mockResolvedValue();

      const generateAccessTokenMock = require('../../app/utils/helper').generateAccessToken;

      generateAccessTokenMock.mockReturnValue(mockAccessToken);

    
      await AuthController.getNewToken(req, res);
    
      expect(jwtVerifyMock).toHaveBeenCalledWith(mockRefreshToken, process.env.API_SECRET_REFRESH, expect.any(Function));
      expect(redisClientGetMock).toHaveBeenCalledWith(`auth_${mockRefreshToken}`);
      expect(redisClientDelMock).toHaveBeenCalledWith(`auth_${mockRefreshToken}`);
      expect(redisClientSetMock).toHaveBeenCalledWith(`auth_${mockAccessToken}`, mockRefreshToken);
      expect(generateAccessTokenMock).toHaveBeenCalledWith({ id: '123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ accessToken: mockAccessToken });
    
      jwtVerifyMock.mockRestore();
      redisClientGetMock.mockRestore();
      redisClientDelMock.mockRestore();
      redisClientSetMock.mockRestore();
      generateAccessTokenMock.mockRestore();
    });
    
  })

  describe('AuthController', () => {
    describe('logout', () => {
      it('should delete the auth token from redis and return a 204 response', async () => {
        // Mock req and res objects
        const req = { token: 'testToken' };
        const res = { status: jest.fn().mockReturnThis(), end: jest.fn() };
  
        // Mock the redisClient.del method
        redisClient.del = jest.fn().mockResolvedValueOnce();
  
        // Call the logout function
        await AuthController.logout(req, res);
  
        // Verify that redisClient.del was called with the correct argument
        expect(redisClient.del).toHaveBeenCalledWith('auth_testToken');
  
        // Verify that res.status and res.end were called with the correct arguments
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.end).toHaveBeenCalled();
      });
    });
  });
  

  jest.mock('../../app/utils/redis', () => ({
    ...jest.requireActual('../../app/utils/redis'),
    setex: jest.fn(),
  }));

  describe('forgot', () => {
    it('should return an error if redisClient.setex fails', async () => {
    
      const req = { body: { email: 'test@test.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const user = { _id: '123', email: 'test@test.com' };
      dbClient.getSchemaOne.mockResolvedValueOnce(user);
      redisClient.setex.mockRejectedValueOnce(new Error('Failed to set redis key'));


      await AuthController.forgot(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to set redis key' });
    });

  })
  
  });
  






