const chai = require('chai');
const http = require('chai-http');
const supertest = require('supertest');
const should = chai.should();
const mainRoute = require('../routes/index');
const app = require('../index');

chai.use(http);

describe('App', () => {
  it('GET / should return 200', (done) => {
    supertest(app).get('/')
      .then(res => {
        res.should.have.status(200);
        done();
      }).catch(err => console.log(err.message));
  });
});
  
describe('Main Route', () => {
  it('Should be executable', () => {
    mainRoute.should.be.a('function');
  });
});

describe('Memories', () => {
  describe('Get all memories', () => {
    it('GET /memories should return 200 and render all-memories view', (done) => {
      supertest(app).get('/memories')
        .then(res => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        }).catch(err => console.log(err.message));
    });
  });

  describe('Add a new memory', () => {
    it('POST /memories/new should return 302 and redirect to all-memories view', (done) => {
      supertest(app).post('/memories/new')
      .send({title: 'Mock', description: 'Mock memory'})
      .set('content-type', 'application/x-www-form-urlencoded')
      .then(res => {
        res.header['location'].should.include('/memories');
        res.should.have.status(302);
        memories.find(memory => memory.title === 'Mock').should.be.a('object');
        done();
      }).catch(err => console.log(err.message));
    });
  });

  describe('Edit a memory', () => {
    memories.push({ id: '999', title: 'Not-edited title', description: 'Not-edited description' });
    it('PUT /memories/:id should return 302 and redirect to all-memories view', (done) => {
      supertest(app).put('/memories/999')
      .send({title: 'Edited title', description: 'Edited description'})
      .set('content-type', 'application/x-www-form-urlencoded')
      .then(res => {
        res.header['location'].should.include('/memories');
        res.should.have.status(302);
        memories.find(memory => memory.title === 'Edited title').should.be.a('object');
        memories.find(memory => memory.title === 'Edited title').should.have.property('description').eql('Edited description')
        done();
      }).catch(err => console.log(err.message));
    });
  });

  describe('Delete a memory', () => {
    memories.push({ id: '1099', title: 'To-be-deleted title', description: 'To-be-deleted description' });
    it('DELETE /memories/:id should return 302 and redirect to all-memories view', (done) => {
      supertest(app).delete('/memories/1099')
      .then(res => {
        res.header['location'].should.include('/memories');
        res.should.have.status(302);
        memories.filter(memory => memory.id === '1099').length.should.be.eql(0);
        done();
      }).catch(err => console.log(err.message));
    });
  });
});
