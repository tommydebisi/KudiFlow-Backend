const AuthController = require('../../app/controllers/authController');

describe('AuthController', () => {
    describe('signUp', () => {
        it('should return 400 if username is missing', async () => {
            const req = { body: { email: 'test@test.com', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await AuthController.signUp(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing username' });
        });

        it('should return 400 if email is missing', async () => {
            const req = { body: { username: 'test', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await AuthController.signUp(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing email' });
        });

        it('should return 400 if password is missing', async () => {
            const req = { body: { username: 'test', email: 'test@test.com' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await AuthController.signUp(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing password' });
        });

        // Add more tests for createUserSchema validation, existing user check, user creation, track creation, etc.
    });

    describe('signIn', () => {
        it('should return 400 if email is missing', async () => {
            const req = { body: { password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await AuthController.signIn(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing email' });
        });

        it('should return 400 if password is missing', async () => {
            const req = { body: { email: 'test@test.com' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await AuthController.signIn(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing password' });
        });

        // Add more tests for loginUserSchema validation, user retrieval, password comparison, token generation, etc.
    });

    describe('getNewToken', () => {
        it('should return 400 if token is missing', async () => {
            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await AuthController.getNewToken(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing Token' });
        });

        // Add more tests for token verification, access token generation, Redis operations, etc.
    });

})

