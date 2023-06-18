const getAllAds = async (req, res) => {
  res.send('Get all ads');
};

const getSingleAd = async (req, res) => {
  res.send('Get single ad');
};

const createAd = async (req, res) => {
  res.json(req.user);
};

const updateAd = async (req, res) => {
  res.send('Update ad');
};

const deleteAd = async (req, res) => {
  res.send('Delete ad');
};

module.exports = {
  getAllAds,
  getSingleAd,
  createAd,
  updateAd,
  deleteAd,
};
