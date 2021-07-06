"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../src/index"));
const users_1 = __importDefault(require("../src/database/models/users"));
const mongodb_1 = require("mongodb");
// assertion style
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
let id;
let token;
describe('test the recipes API', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        // create a test user
        const password = bcrypt_1.default.hashSync('okay', 10);
        yield users_1.default.create({ username: 'admin', password });
        // get access token
        const res1 = yield chai_1.default.request(index_1.default).get('/login').send({ username: 'admin', password: 'okay' });
        token = res1.body.accessToken;
        // eslint-disable-next-line no-underscore-dangle
    }));
    // test create recipes
    describe('POST /recipes', () => {
        it('it should save new recipe to db', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const recipes = {
                name: 'Chicken Nuggets',
                difficulty: 2,
                vegetarian: true,
            };
            chai_1.default.request(index_1.default)
                .post('/recipes')
                .send(recipes)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
                // eslint-disable-next-line no-underscore-dangle
                id = new mongodb_1.ObjectId(res.body.data._id);
                done();
            });
        });
        it('it should not save new recipe to db, invalid vegetarian feild,', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const recipe = {
                name: 'Chicken Nuggets',
                difficulty: 3,
                vegetarian: 'true',
            };
            chai_1.default.request(index_1.default)
                .post('/recipes')
                .send(recipe)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Vegetarian field should be boolean');
                done();
            });
        });
        it('it should not save new users to db, empty name field', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const recipe = {
                difficulty: 2,
                vegetarian: true,
            };
            chai_1.default.request(index_1.default)
                .post('/recipes')
                .send(recipe)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Name field can not be empty');
                done();
            });
        });
        it('it should not save new users to db, invalid difficulty field', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const recipe = {
                name: 'Jollof Rice',
                difficulty: '2',
                vegetarian: true,
            };
            chai_1.default.request(index_1.default)
                .post('/recipes')
                .send(recipe)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Difficulty field should be a number');
                done();
            });
        });
        it('it should not save new recipe to db, invalid token', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const recipes = {
                name: 'Chicken Nuggets',
                difficulty: 2,
                vegetarian: true,
            };
            chai_1.default.request(index_1.default)
                .post('/recipes')
                .send(recipes)
                .set('Authorization', 'Bearer iuhbfwdfy65434567ub')
                .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('Unauthorized');
                done();
            });
        });
    });
    // test get all recipe
    describe('GET /recipes', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
        }));
        it('It should retrive first 10 recipes in db', (done) => {
            chai_1.default.request(index_1.default)
                .get('/recipes')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
        });
    });
    // test get a particular recipe
    describe('GET /recipes/:id', () => {
        it('Retrive a particular recipes in db', (done) => {
            chai_1.default.request(index_1.default)
                .get(`/recipes/${id}`)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
                done();
            });
        });
        it('It should not retrive any recipes from db, invalid id passed', (done) => {
            chai_1.default.request(index_1.default)
                .get('/recipes/5fb8f36031ea2a10a0ccd111')
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Recipe with id 5fb8f36031ea2a10a0ccd111 does not exist');
                done();
            });
        });
    });
    // Test update recipe
    describe('PATCH /recipes/:id', () => {
        it('update the recipe record in db', (done) => {
            // DATA YOU WANT TO UPDATE IN DB
            const recipes = {
                name: 'Chicken Nuggets',
            };
            chai_1.default.request(index_1.default)
                .patch(`/recipes/${id}`)
                .send(recipes)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
                done();
            });
        });
        it('it should not update recipe in db, invalid difficulty field', (done) => {
            // DATA YOU WANT TO UPDATE IN DB
            const recipe = {
                name: 'Jollof Rice',
                difficulty: '2',
            };
            chai_1.default.request(index_1.default)
                .patch(`/recipes/${id}`)
                .send(recipe)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Difficulty field should be a number not greater than 3');
                done();
            });
        });
        it('it should not update recipe in db, invalid vegetarian feild,', (done) => {
            // DATA YOU WANT TO UPDATE IN DB
            const recipe = {
                difficulty: 3,
                vegetarian: 'true',
            };
            chai_1.default.request(index_1.default)
                .patch(`/recipes/${id}`)
                .send(recipe)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Vegetarian field should be boolean');
                done();
            });
        });
        it('it should not update recipe in db, invalid id passed', (done) => {
            // DATA YOU WANT TO UPDATE IN DB
            const recipe = {
                difficulty: 3,
            };
            chai_1.default.request(index_1.default)
                .patch('/recipes/5fb8f36031ea2a10a0ccd111')
                .send(recipe)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Recipe with id 5fb8f36031ea2a10a0ccd111 does not exist');
                done();
            });
        });
        it('it should not update recipe in db, invalid token', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const recipes = {
                name: 'Chicken Nuggets',
            };
            chai_1.default.request(index_1.default)
                .patch(`/recipes/${id}`)
                .send(recipes)
                .set('Authorization', 'Bearer iuhbfwdfy65434567ub')
                .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('Unauthorized');
                done();
            });
        });
    });
    // test delete recipe
    describe('DELETE /recipes/:id', () => {
        it('Delete the identified recipe', (done) => {
            chai_1.default.request(index_1.default)
                .delete(`/recipes/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Recipe successfully deleted');
                done();
            });
        });
        it('Failed to delete the identified recipe, invalid ID passed', (done) => {
            chai_1.default.request(index_1.default)
                .delete(`/recipes/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Invalid ID');
                done();
            });
        });
        it('Failed to delete the identified recipe, invalid token', (done) => {
            chai_1.default.request(index_1.default)
                .delete(`/recipes/${id}`)
                .set('Authorization', 'Bearer iuhbfwdfy65434567ub')
                .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('Unauthorized');
                done();
            });
        });
    });
});
