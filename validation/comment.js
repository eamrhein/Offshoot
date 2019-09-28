const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function ValidateComment (data) {
  const errors = {};

  data.content = validText(data.content) ? data.content : '';
  data.username = validText(data.username) ? data.username : '';

  if (Validator.isEmpty(data.content)) {
    errors.content = "Comment body can't be empty";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Authors username must be included in comment';
  }

  if (Validator.isEmpty(data.authorId)) {
    errors.authorId = 'authorId must be included in content';
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
