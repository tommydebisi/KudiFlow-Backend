const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('POST /account/register', function () {
  it('POST /account/register', function (done) {
    chai.request('http://localhost:5000')
      .get('/account/register')
      .send({ email: 'foo@xyz.com' , password: 'good'})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);

        // call done to make the assertion library run end
        done();
      });
  });
});

