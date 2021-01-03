"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../src/index"));
// assertion style
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe('test the users API', () => {
    // test login
    describe('GET /login', () => {
        it('authenticate user and sign him in', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const user = {
                username: 'admin',
                password: 'okay',
            };
            chai_1.default.request(index_1.default)
                .get('/login')
                .send(user)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('accessToken');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
                done();
            });
        });
        it('do not sign him in, empty password field', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const user = {
                username: 'admin',
            };
            chai_1.default.request(index_1.default)
                .get('/login')
                .send(user)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('username or password can not be empty');
                done();
            });
        });
        it('do not sign him in, empty username field', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const user = {
                password: 'okay',
            };
            chai_1.default.request(index_1.default)
                .get('/login')
                .send(user)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('username or password can not be empty');
                done();
            });
        });
        it('do not sign him in, username does not exist', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const user = {
                username: 'chii',
                password: 'okay',
            };
            chai_1.default.request(index_1.default)
                .get('/login')
                .send(user)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Incorrect username or password');
                done();
            });
        });
        it('do not sign him in, incorrect password', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const user = {
                username: 'admin',
                password: 'okay1',
            };
            chai_1.default.request(index_1.default)
                .get('/login')
                .send(user)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Incorrect username or password');
                done();
            });
        });
    });
});
