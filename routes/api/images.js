const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const keys = require('../../config/keys');
const S3_BUCKET = keys.s3_bucket;
const uuid3 = require('uuid/v3');
aws.config.region = "us-west-1"

router.get('/download/:url', (req, res) => {
    const url = req.params.url;
    if (!url) return res.status(400).end("missing file");
    // let options = {
    //     Bucket: S3_BUCKET,
    //     Key:
    // };
})


.get('/', (req, res) => {
    const s3 = new aws.S3({
        accessKeyId: keys.aws_access_key_id,
        secretAccessKey: keys.aws_secret_access_key
    });

    const fileName = req.query['file-name']  + uuid3.URL;
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        } else {
            const uniqueURL = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
            const returnData = {
                signedRequest: data,
                url: uniqueURL
            };
            res.write(JSON.stringify(returnData));
            res.end();
        }
    });
});

module.exports = router;