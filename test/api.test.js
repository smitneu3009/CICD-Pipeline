import request from 'supertest';
import fs from 'fs';
import { app, server } from '../server.js';

describe('Users API', () => {
    before(() => {
        // Create or reset the data file before each test
        fs.writeFileSync('data.json', JSON.stringify({ users: [] }));
    });

    it('should create a new user', (done) => {
        request(app)
            .post('/api/users')
            .send({ name: 'John D', email: 'yt@example.com' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should get all users', (done) => {
        request(app)
            .get('/api/users')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                console.log(res.body); // Log the response body
                // Ensure response body contains the created user
                if (!res.body.users.some(user => user.name === 'John D')) {
                    return done(new Error('User not found'));
                }
                done();
            });
    });

    after(() => {
        // Stop the server after all tests are complete
        server.close();
    });
});
