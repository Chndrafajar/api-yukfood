const Item = require('../models/Item');
const Category = require('../models/Category');

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPopular = await Item.find()
        .select('_id title price isPopular unit imageId')
        .limit(4)
        .populate({
          path: 'imageId',
          select: '_id imageUrl ',
          option: { sort: { sumOrder: -1 } },
        });

      const category = await Category.find()
        .select('_id name')
        .limit(4)
        .populate({
          path: 'itemId',
          select: '_id title unit price imageId',
          perDocumentLimit: 4,
          populate: {
            path: 'imageId',
            select: '_id imageUrl',
            perDocumentLimit: 1,
          },
        });

      for (let i = 0; i < category.length; i++) {
        for (let x = 0; x < category[i].itemId.length; x++) {
          const item = await Item.findOne({ _id: category[i].itemId[x]._id });
          item.isPopular = false;
          await item.save();
          if (category[i].itemId[0] === category[i].itemId[x]) {
            item.isPopular = true;
            await item.save();
          }
        }
      }

      res.status(200).json({ mostPopular, category });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'internal server error' });
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate({ path: 'imageId', select: '_id imageUrl' });

      res.status(200).json({
        item,
      });
    } catch (error) {
      res.status(500).json({ message: 'internal server error' });
    }
  },

  orderPage: async (req, res) => {
    const { idItem, duration, price, firstName, lastName, emailAddress, phoneNumber, alamat, accountHolder, bankFrom } = req.body;

    if (!req.file) {
      return res.status(404).json({ message: 'image not found' });
    }

    if (
      idItem === undefined ||
      duration === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      emailAddress === undefined ||
      phoneNumber === undefined ||
      alamat === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ) {
      return res.status(404).json({ message: 'Lengkapi semua field' });
    }

    res.status(201).json({ message: 'Sukses Order' });
  },
};
