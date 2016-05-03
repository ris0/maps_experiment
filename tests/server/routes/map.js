var app = require('../../../server/app/index.js');
var expect = require('chai').expect;
var supertest = require('supertest');
var agent = supertest.agent(app);

describe('/api/map/zip', function() {

        it('GET request should return an Array of ZIP codes', function(done) {
            agent
                .get('/api/map/zip')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length.above(200);
                    done();
                });
        });

        // error handling tested
        it('GET one that doesn\'t exist', function(done) {
            agent
                .get('/api/map/map')
                .expect(404)
                .end(done);
        });

})

