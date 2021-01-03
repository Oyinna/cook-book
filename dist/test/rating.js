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
const index_1 = __importDefault(require("../src/index"));
const recipes_1 = __importDefault(require("../src/database/models/recipes"));
// assertion style
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
let id;
describe('test the rating API', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        // create a test recipe
        const recipe = yield recipes_1.default.create({
            name: 'Meat pie',
            prepTime: new Date(),
            difficulty: 3,
            vegetarian: false,
        });
        // eslint-disable-next-line no-underscore-dangle
        id = recipe._id;
    }));
    // test create recipes
    describe('POST /recipes/:id/rate', () => {
        it('it should save new rating to db', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const rating = {
                rate: 4,
            };
            chai_1.default.request(index_1.default)
                .post(`/recipes/${id}/rate`)
                .send(rating)
                .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
                done();
            });
        });
        it('it should not save new rating in db, invalid id passed', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const rating = {
                rate: 4,
            };
            chai_1.default.request(index_1.default)
                .post('/recipes/5fb8f36031ea2a10a0ccd111/rate')
                .send(rating)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Recipe with id 5fb8f36031ea2a10a0ccd111 does not exist');
                done();
            });
        });
        it('it should not save new rating in db, invalid Rate field', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const rating = {
                Rate: '4',
            };
            chai_1.default.request(index_1.default)
                .post(`/recipes/${id}/rate`)
                .send(rating)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Rate should be a number between 1 and 5');
                done();
            });
        });
        it('it should not save new rating in db, invalid Rate field', (done) => {
            // DATA YOU WANT TO SAVE TO DB
            const rating = {
                Rate: 7,
            };
            chai_1.default.request(index_1.default)
                .post(`/recipes/${id}/rate`)
                .send(rating)
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Rate should be a number between 1 and 5');
                done();
            });
        });
    });
});
