const { createUserSchema, loginUserSchema } = require('../../app/validators/Validate');
const AuthController = require('../../app/controllers/authController');
const dbClient = require('../../app/utils/db');
const { User } = require('../../app/models/User');
const Track = require('../../app/models/Track');
const { generateAccessToken, sendEmail, hashPassword } = require('../../app/utils/helper');
const bcrypt = require('bcrypt');



describe('AuthController', () => {
    describe('signUp', () => {
        it('should return 400 error if username is missing', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await AuthController.signUp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing username' });
        });

        it('should return 400 error if email is missing', async () => {
            const req = { body: { username: 'testuser', password: 'password123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await AuthController.signUp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing email' });
        });

        it('should return 400 error if password is missing', async () => {
            const req = { body: { username: 'testuser', email: 'test@example.com' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await AuthController.signUp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing password' });
        });

        it('should return 201 if user is created successfully', async () => {
            const req = { body: { username: 'testuser', email: 'test@example.com', password: 'password123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const createMock = jest.fn().mockReturnValue({ _id: '123' });
            const trackCreateMock = jest.fn();
        
    
                // ...

            jest.spyOn(createUserSchema, 'validateAsync').mockResolvedValue();
            jest.spyOn(dbClient, 'getSchemaOne').mockResolvedValue(null);
            jest.spyOn(User, 'create').mockImplementation(createMock);
            jest.spyOn(Track, 'create').mockImplementation(trackCreateMock);
        

            await AuthController.signUp(req, res);
    
      
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
            expect(createMock).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com', hashed_password: 'hashedpassword' });
            expect(trackCreateMock).toHaveBeenCalledWith({ userId: '123' });
            expect(hashMock).toHaveBeenCalledWith('password123');
        });

        test('hashPassword hashes password correctly', () => {
            const password = 'mypassword';
            const hashMock = 'hashedpassword';
            jest.spyOn(hashPassword, 'hash', 'get').mockReturnValue(jest.fn(() => hashMock));

          
            const result = hashPassword.hashPassword(password);
          
            expect(hashPassword.hash).toHaveBeenCalledTimes(1);
            expect(hashPassword.hash).toHaveBeenCalledWith(password);
            expect(result).toBe(hashMock);
          });
          
        
    

    })
   
    test('hashPassword should return an object with a hashed_password property', async () => {
        const password = 'mypassword';
        const result = await hashPassword(password);
      
        expect(result).toHaveProperty('hashPassword');
        
      });
      
      
    
    
})
