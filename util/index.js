const { errorMsg } = require('../constants');

const checkValidation = (response) => {
  if (!response.country) {
    return { result: 'ng', msg: errorMsg.noneCountry };
  } else if (!['usim', 'transportaion', 'show', 'ticket', 'coupon', 'etc'].includes(response.category)) {
    return { result: 'ng', msg: errorMsg.invalidCategory };
  } else if (!response.name) {
    return { result: 'ng', msg: errorMsg.noneName };
  } else if (new Date() > new Date(Number(response.expiration))) {
    return { result: 'ng', msg: errorMsg.invalidExpiration };
  } else if (!response.latitude || !response.longitude) {
    return { result: 'ng', msg: errorMsg.noneLocation };
  } else if (!response.description) {
    return { result: 'ng', msg: errorMsg.noneDescription };
  }
  return { result: 'ok' };
};

module.exports = { checkValidation };
