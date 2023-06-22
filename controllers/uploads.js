const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/errors');

const uploadFile = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No file uploaded!');
  }

  const adFile = req.files.file;
  console.log(adFile);

  const filePath = path.join(
    __dirname,
    '../public/uploads/' + `${adFile.name}`
  );

  await adFile.mv(filePath);

  return res
    .status(StatusCodes.OK)
    .json({ file: { src: `/uploads/${adFile.name}` } });
};

module.exports = { uploadFile };
