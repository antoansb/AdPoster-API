const express = require('express');
const router = express.Router();

const {
  getAllAds,
  getSingleAd,
  createAd,
  updateAd,
  deleteAd,
} = require('../controllers/ads');

router.route('/').get(getAllAds).post(createAd);
router.route('/:id').get(getSingleAd).patch(updateAd).delete(deleteAd);

module.exports = router;
