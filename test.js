// Import the necessary modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./app'); // path to your app file
const expect = chai.expect;

chai.use(chaiHttp);

describe('Server', () => {
    it('Main page content', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Main page status', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

