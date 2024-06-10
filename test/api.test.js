import request from 'supertest';
import { app } from '../server.js';
import assert from 'assert';

describe('Users API', () => {
    it('should create a new user', async () => {
        const user = {
            name: 'Joh Doe',
            email: 'joh.doe@example.com',
            password: 'password1234'
        };

        const response = await request(app)
            .post('/api/users')
            .send(user);

        assert.strictEqual(response.status, 201);
        assert.strictEqual(typeof response.body, 'object');
        assert.strictEqual(response.body.name, 'Joh Doe');
        assert.strictEqual(response.body.email, 'joh.doe@example.com');
    });
});
