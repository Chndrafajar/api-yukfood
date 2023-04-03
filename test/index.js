const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const fs = require('fs-extra');

chai.use(chaiHttp);

describe('API ENDPOINT TESTING', () => {
  it('Get Landing Page', (done) => {
    chai
      .request(app)
      .get('/api/v1/member/landing-page')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.be.property('mostPopular');
        expect(res.body.mostPopular).to.have.an('array');
        expect(res.body).to.be.property('category');
        expect(res.body.category).to.have.an('array');
        done();
      });
  });

  it('GET Detail Page', (done) => {
    chai
      .request(app)
      .get('/api/v1/member/detail-page/6420a9ec192db12a78d7c709')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('isPopular');
        expect(res.body).to.have.property('unit');
        expect(res.body).to.have.property('sumOrder');
        expect(res.body).to.have.property('imageId');
        expect(res.body.imageId).to.have.an('array');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('price');
        expect(res.body).to.have.property('__v');
        done();
      });
  });

  it('Post Order Page', (done) => {
    const image = __dirname + '/bukti.jpeg';
    const dataSample = {
      image,
      idItem: '6420a9ec192db12a78d7c709',
      duration: 2,
      orderYukFood: 2,
      firstName: 'chandra',
      lastName: 'fajar',
      emailAdress: 'chandrafajar@gmail.com',
      phoneNumber: '08234567893',
      alamat: 'jln bali, rt02/rw01, desa kaligelang, kec taman',
      accountHolder: 'alfandi',
      bankFrom: 'BCA',
    };
    chai
      .request(app)
      .post('/api/v1/member/order-page')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('idItem', dataSample.idItem)
      .field('duration', dataSample.duration)
      .field('orderYukFood', dataSample.orderYukFood)
      .field('firstName', dataSample.firstName)
      .field('lastName', dataSample.lastName)
      .field('emailAdress', dataSample.emailAdress)
      .field('phoneNumber', dataSample.phoneNumber)
      .field('alamat', dataSample.alamat)
      .field('accountHolder', dataSample.accountHolder)
      .field('bankFrom', dataSample.bankFrom)
      .attach('image', fs.readFileSync(dataSample.image), 'bukti.jpeg')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.be.property('message');
        expect(res.body.message).to.equal('Sukses Order');
        expect(res.body).to.be.property('order');
        expect(res.body.order).to.have.all.keys('payments', '_id', 'invoice', 'orderYukFood', 'total', 'itemId', 'memberId', '__v');
        expect(res.body.order.payments).to.have.all.keys('status', 'proofPayment', 'bankFrom', 'accountHolder');
        expect(res.body.order.itemId).to.have.all.keys('_id', 'title', 'price', 'duration');
        console.log(res.body.order);
        done();
      });
  });
});
