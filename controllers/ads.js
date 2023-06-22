const Ad = require('../models/Ad');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/errors');

const getAllAds = async (req, res) => {
  const ads = await Ad.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ ads, totalAds: ads.length });
};

const getSingleAd = async (req, res) => {
  const {
    user: { userId },
    params: { id: adId },
  } = req;

  const ad = await Ad.findOne({
    _id: adId,
    createdBy: userId,
  });
  if (!ad) {
    throw new NotFoundError(`Ad with id ${adId} does not exist.`);
  }

  res.status(StatusCodes.OK).json({ ad });
};

const createAd = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const ad = await Ad.create(req.body);
  res.status(StatusCodes.CREATED).json({ ad });
};

const updateAd = async (req, res) => {
  const {
    body: { title, description },
    user: { userId },
    params: { id: adId },
  } = req;

  if (title === '' || description === '' || image === '') {
    throw new BadRequestError('Title, Description or Image cannot be empty');
  }

  const ad = await Ad.findByIdAndUpdate(
    { _id: adId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!ad) {
    throw new NotFoundError(`Ad with id ${adId} does not exist`);
  }

  res.status(StatusCodes.OK).json({ ad });
};

const deleteAd = async (req, res) => {
  const {
    user: { userId },
    params: { id: adId },
  } = req;

  const ad = await Ad.findOneAndRemove({
    _id: adId,
    createdBy: userId,
  });
  if (!ad) {
    throw new NotFoundError(`Ad with id ${adId} does not exist.`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: `Ad with id ${adId} successfully deleted.` });
};

module.exports = {
  getAllAds,
  getSingleAd,
  createAd,
  updateAd,
  deleteAd,
};
