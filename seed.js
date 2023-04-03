var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect(
  'mongodb://localhost:27017/db_yukfood',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels(['./models/Bank', './models/Member', './models/Order', './models/Users']);

    // Clear specified collections
    seeder.clearModels(['Bank', 'Member', 'Order', 'Users'], function () {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
    });
  }
);

var data = [
  {
    model: 'Order',
    documents: [
      {
        _id: mongoose.Types.ObjectId('641e254ce705a443a8a49860'),
        orderYukFood: '2',
        invoice: 1231231,
        itemId: {
          _id: mongoose.Types.ObjectId('6420a9ec192db12a78d7c709'),
          title: 'Ice Lemon',
          price: 5,
          duration: 2,
        },
        total: 10,
        memberId: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
        bankId: mongoose.Types.ObjectId('641ea0cefe3d311b0c7447ed'),
        payments: {
          proofPayment: 'images/bukti.jpg',
          bankFrom: 'BCA',
          status: 'Proses',
          accountHolder: 'alfan',
        },
      },
    ],
  },
  // end order
  // member
  {
    model: 'Member',
    documents: [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
        firstName: 'Alfandi',
        lastName: 'Fajar',
        email: 'alfandifajar@gmail.com',
        phoneNumber: '082377954008',
        alamat: 'desa kaligelang kec taman kab pemalang',
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903334'),
        firstName: 'Chandra',
        lastName: 'Fajar',
        email: 'chandrafajar@gmail.com',
        phoneNumber: '083426362737',
        alamat: 'jln bali desa kaligelang kec taman kab pemalang',
      },
    ],
  },
  {
    model: 'Bank',
    documents: [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903322'),
        nameBank: 'Mandiri',
        nomorRekening: '089898',
        name: 'Alfandhi',
        imageUrl: 'images/9999999999.png',
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903323'),
        nameBank: 'BCA',
        nomorRekening: '878678',
        name: 'Chandra fajar',
        imageUrl: 'images/9999999999.png',
      },
    ],
  },
  {
    model: 'Users',
    documents: [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        username: 'admin',
        password: 'rahasia',
      },
    ],
  },
];
