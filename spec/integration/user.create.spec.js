require('rootpath')();
/* eslint  import/no-unresolved: "off" */

const request = require('supertest');
const random = require('random-world');
const app = require('app');
const mongoose = require('mongoose');

describe('POST /users', () => {
  beforeAll(() => {
    app.listen(3000);
    mongoose.connect('mongodb://localhost:27017/bibliotech', { useNewUrlParser: true });

    this.originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterAll(() => {
    mongoose.connection.close();

    jasmine.DEFAULT_TIMEOUT_INTERVAL = this.originalTimeout;
  });

  beforeAll(() => {
    const firstname = random.firstname();

    this.institution = {
      name: random.word(),
      url: `${random.word()}.com`,
      domain: `${random.word()}.com`,
    };

    this.user = {
      name: firstname,
      username: firstname,
      password: random.word(),
      email: `${firstname}@${this.institution.domain}`,
    };
  });

  it('should create user linked to an institution', (done) => {
    request(app)
      .post('/institutions')
      .send(this.institution)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(({ body }) => {
        expect(body).toEqual(jasmine.objectContaining({
          status: 'success',
          data: jasmine.objectContaining(this.institution),
        }));
      })
      .expect(200)
      .end(() => {});

    request(app)
      .post('/users')
      .send(this.user)
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body.data.institution).toBeDefined();
        expect(body).toEqual(jasmine.objectContaining({
          status: 'success',
          data: jasmine.objectContaining(this.user),
        }));
      })
      .expect(200, done);
  });
});
