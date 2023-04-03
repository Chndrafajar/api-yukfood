const router = require('express').Router();
const apiController = require('../controller/apiController');
const { uploadSingle } = require('../middlewares/multer');

router.get('/landing-page', apiController.landingPage);
router.get('/detail-page/:id', apiController.detailPage);
router.post('/order-page', uploadSingle, apiController.orderPage);

module.exports = router;
