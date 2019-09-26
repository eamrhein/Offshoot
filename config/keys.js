// module.exports = {
//     mongoURI: 'mongodb+srv://aA-Dev:WeZNBtsnsJwHJDcu@cluster0-eu8re.mongodb.net/offshoot?retryWrites=true&w=majority',
//     secretOrKey: 'y7gQCHWiZLarr7',
//     aws: {
//         aws_access_key_id: "AKIAZ3QJ4OZP4M5TIZ5B",
//         aws_secret_access_key: "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",
//         sw3_bucket: "offshoot-dev"
//     }
// };


if(process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}