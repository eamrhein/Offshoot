
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Panel = require('../../models/Panel');
const CommentSchema = require('../../models/Comment');
// const AWS = require('aws-sdk');
// const { aws } = require('../../config/keys');
const validatePanel = require('../../validation/panel');
const validateComment = require('../../validation/comment');
// const { aws_access_key_id, aws_secret_access_key, sw3_bucket } = aws;

// configure aws
// aws.config.region = 'us-west-2';

router
  .get('/:id', (req, res) => {
    Panel.findById(req.params.id).then((panel) => {
      const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = panel;

      res.json({
        id: _id,
        authorId,
        title,
        panelText,
        photoURL,
        parentId,
        rootId,
        childIds,
        comments
      });
    });
  })

  .post('/', (req, res) => {
    const { errors, isValid } = validatePanel(req.body);

    if (!isValid) {
      res.status(422).json(errors);
    } else {
      const { authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = req.body;

      const newPanel = new Panel({
        authorId,
        title,
        panelText,
        parentId,
        rootId,
        photoURL,
        childIds,
        comments
      });

      newPanel.save()
        .then(panel => {
          const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = panel;
          const payload = {
            id: _id,
            authorId,
            title,
            panelText,
            parentId,
            rootId,
            photoURL,
            childIds,
            comments
          };
          res.json(payload);
        })
        .catch(err => console.log(err));

      // const fileName = req.query['file-name'];
      // const fileType = req.query['file-type'];
      // const s3Params = {
      //     Bucket: sw3_bucket,
      //     Key: fileName,
      //     Expires: 60,
      //     ContenType: fileType,
      //     ACL: 'pubic-read'
      // };

      // s3Params.getSignedUrl('putObject', s3Params, (err, data) => {
      //     if (err) {
      //         console.log(err);
      //         return res.end();
      //     }
      //     const returnData = {
      //         signedRequest: data,
      //         url: `https://${sw3_bucket}.s3.amazonaws.com/${fileName}`
      //     };
      //     res.write(JSON.stringify(returnData));
      //     res.end();
      // });
    }
  })
  .patch('/:id', (req, res) => {
    const { errors, isValid } = validatePanel(req.body);

    if (!isValid) {
      res.status(422).json(errors);
    } else if (req.params.id === req.body.id) {
      Panel.findById(req.params.id).then(() => {
        const { id, authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = req.body;

        const updatedPanel = new Panel({
          _id: id,
          authorId,
          title,
          panelText,
          parentId,
          rootId,
          photoURL,
          childIds,
          comments
        });
        updatedPanel.isNew = false;
        updatedPanel.save()
          .then(panel => {
            const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds } = panel;
            const payload = {
              id: _id,
              authorId,
              title,
              panelText,
              parentId,
              rootId,
              photoURL,
              childIds,
              comments
            };
            res.json(payload);
          })
          .catch(err => console.log(err));
      });
      // check if it already exists
      // check if it already exists
      // save it
      // return it
    }
  })
  .get('/', (req, res) => {
    if (req.query.panelsArray) {
      Panel.find({ _id: { $in: req.query.panelsArray } }, (_err, panelsArray) => {
        const panelsToReturnPojo = {};
        panelsArray.forEach(panel => {
          const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = panel;
          const RestructuredPanel = {
            id: _id,
            authorId,
            title,
            panelText,
            parentId,
            rootId,
            photoURL,
            childIds,
            comments
          };
          panelsToReturnPojo[RestructuredPanel.id] = RestructuredPanel;
        });
        res.send(panelsToReturnPojo);
      });
    } else {
      Panel.find({}, (_err, panelsArray) => {
        const panelsToReturnPojo = {};
        panelsArray.forEach(panel => {
          const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = panel;
          const RestructuredPanel = {
            id: _id,
            authorId,
            title,
            panelText,
            parentId,
            rootId,
            photoURL,
            childIds,
            comments
          };
          panelsToReturnPojo[RestructuredPanel.id] = RestructuredPanel;
        });
        res.send(panelsToReturnPojo);
      });
    }
  });

//! create a comment

router.patch('/create-comment/:id', (req, res) => {
  const { errors, isValid } = validateComment(req.body);
  if (!isValid) {
    res.status(422).json(errors);
  }
  const { content, authorId, username } = req.body;
  const Comment = mongoose.model('comments', CommentSchema);
  const comment = new Comment({
    content,
    authorId,
    username
  });
  Panel.findById(req.params.id)
    .then((panel) => {
      panel.comments.push(comment);
      panel.save();
      res.json(panel);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
