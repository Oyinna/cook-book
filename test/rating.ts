/* eslint-disable no-undef */
import chai from 'chai'; 
import chaiHttp from 'chai-http';
import app from '../src/index';
import RecipesM, {Recipes} from '../src/database/models/recipes';
import RateM, {Rate} from '../src/database/models/rating';
import {ObjectId} from 'mongodb';


// assertion style
chai.should();
chai.use(chaiHttp);
let id: ObjectId;

describe('test the rating API', () => {
  before(async () => {
    // create a test recipe
    const recipe = await RecipesM.create(<Recipes>{
      name: 'Meat pie',
      prepTime: new Date(),
      difficulty: 3,
      vegetarian: false,
    });
    // eslint-disable-next-line no-underscore-dangle
    id = recipe._id;
  });
  // test create recipes
  describe('POST /recipes/:id/rate', () => {
    it('it should save new rating to db', (done) => {
      // DATA YOU WANT TO SAVE TO DB
      const rating = {
        rate: 4,
      };
      chai.request(app)
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
      chai.request(app)
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
      chai.request(app)
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
      chai.request(app)
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
