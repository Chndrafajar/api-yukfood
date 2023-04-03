const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  unit: {
    type: String,
    default: 'yukfood',
  },
  sumOrder: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: ObjectId,
    ref: 'Category',
  },
  imageId: [
    {
      type: ObjectId,
      ref: 'Image',
    },
  ],
});

module.exports = mongoose.model('Item', itemSchema);
