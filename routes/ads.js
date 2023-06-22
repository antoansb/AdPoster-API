const express = require('express');
const router = express.Router();

const {
  getAllAds,
  getSingleAd,
  createAd,
  updateAd,
  deleteAd,
} = require('../controllers/ads');
const { uploadFile } = require('../controllers/uploads');

router.route('/').get(getAllAds).post(createAd);
router.route('/:id').get(getSingleAd).patch(updateAd).delete(deleteAd);
router.route('/uploads').post(uploadFile);

module.exports = router;
