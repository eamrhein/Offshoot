const Validator = require('validator');

module.exports = function ValidateFollowUser (data) {
  const errors = {};
  if (Validator.isEmpty(data.userId)) {
    errors.userId = "userId can't be empty";
  }

  if (Validator.isEmpty(data.rootId)) {
    errors.rootId = "rootId can't be empty";
  }

  if (!Validator.isHexadecimal(data.userId)) {
    errors.userId = 'userId is invalid, must be a hexidecimal';
  }

  if (!Validator.isHexadecimal(data.rootId)) {
    errors.rootId = 'rootId is invalid, must be a hexidecimal';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
