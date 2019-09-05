const app = require('./server');
const request = require('supertest');
const expect = require('chai').expect;
require('colors');

describe('[ORDERS]'.yellow, function(){

    it('should get all orders', function(done) {
        request(app)
            .get('/api/orders')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                expect(resp.body).to.be.an('array');
                done();
            })
    });

    it('should get an order', function(done) {
        request(app)
            .post('/api/orders')
            .send({
                name: 'name',
                surname: 'surname',
                start_date: Date.now(),
                end_date: Date.now(),
                confirmed: false
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                const order = resp.body;
                expect(resp.body).to.be.an('object');
                request(app)
                    .get('/api/orders/' + order._id)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, resp) {
                        expect(resp.body).to.be.an('object');
                        done();
                    })
            })
    });

    it('should create an order', function(done) {
        const order = {
            name: 'name',
            surname: 'surname',
            start_date: Date.now(),
            end_date: Date.now(),
            confirmed: false
        };
        request(app)
            .post('/api/orders')
            .send(order)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(201)
            .end(function(err, resp) {
                const newOrder = resp.body;
                expect(newOrder).to.be.an('object');
                done()
            })
    });

    it('should delete an order', function(done) {
        request(app)
            .post('/api/orders')
            .send({
                name: 'name',
                surname: 'surname',
                start_date: Date.now(),
                end_date: Date.now(),
                confirmed: false
            })
            .set('Accept', 'application/json')
            .end(function(err, resp) {
                const order = resp.body;
                request(app)
                    .delete('/api/orders/' + order._id)
                    .end(function(err, resp) {
                        expect(resp.body).to.eql(order);
                        done();
                    })
            })
    });

    it('should update an order', function(done) {
        request(app)
            .post('/api/orders')
            .send({
                name: 'name',
                surname: 'surname',
                start_date: Date.now(),
                end_date: Date.now(),
                confirmed: false
            })
            .set('Accept', 'application/json')
            .end(function(err, resp) {
                const order = resp.body;
                request(app)
                    .put('/api/orders/' + order._id)
                    .send({
                        confirmed: true
                    })
                    .end(function(err, resp) {
                        expect(resp.body.confirmed).to.be.equal(true);
                        done()
                    })
            })
    });
});
