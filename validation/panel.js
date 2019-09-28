const Validator = require('validator');
const validText = require("./valid-text");

module.exports = function ValidatePost(data) {
    const errors = {};

    data.title = validText(data.title) ? data.title : '';
    data.panelText = validText(data.panelText) ? data.panelText : '';
    data.photoURL = validText(data.photoURL) ? data.photoURL : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title can't be empty";
    }

    if (Validator.isEmpty(data.panelText) && Validator.isEmpty(data.photoURL)) {
        errors.input = "Must have image or text";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

}