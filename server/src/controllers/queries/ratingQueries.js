const bd = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await bd.Ratings.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update mark on this offer');
  }
  return updatedRating.dataValues;
};

module.exports.createRating = async (data, transaction) => {
  const result = await bd.Ratings.create(data, { transaction });
  if (!result) {
    throw new ServerError('cannot mark offer');
  } else {
    return result.get({ plain: true });
  }
};

