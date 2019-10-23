
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Panel = require('../../models/Panel');
const CommentSchema = require('../../models/Comment');
const validatePanel = require('../../validation/panel');
const validateComment = require('../../validation/comment');

router
  .get('/:id', (req, res) => {
    Panel.findById(req.params.id).populate('authorId').then((panel) => {
      const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, likes, comments } = panel;
      res.json({
        id: _id,
        authorId: authorId._id,
        authorUsername: authorId.username,
        title,
        panelText,
        photoURL,
        parentId,
        rootId,
        childIds,
        likes,
        comments
      });
    }).catch(err => console.log(err));
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
        likes: 0,
        comments
      });

      newPanel.save((err, panel) => {
        if (err) console.log(err);
        Panel.findById(panel._id)
          .populate('authorId')
          .then(panel => {
            const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, likes, comments } = panel;
            const RestructuredPanel = {
              id: _id,
              authorId: authorId._id,
              authorUsername: authorId.username,
              title,
              panelText,
              parentId,
              rootId,
              photoURL,
              childIds,
              likes,
              comments
            };
            res.json(RestructuredPanel);
          });
      });
    }
  })
  .patch('/:id', (req, res) => {
    const { errors, isValid } = validatePanel(req.body);

    if (!isValid) {
      res.status(422).json(errors);
    } else if (req.params.id === req.body.id) {
      Panel.findById(req.params.id).then(() => {
        const { id, authorId, title, panelText, photoURL, parentId, rootId, childIds, likes, comments } = req.body;

        const updatedPanel = new Panel({
          _id: id,
          authorId,
          title,
          panelText,
          parentId,
          rootId,
          photoURL,
          childIds,
          likes,
          comments
        });
        updatedPanel.isNew = false;
        updatedPanel
          .save((err, panel) => {
            if (err) console.log(err);
            Panel.findById(panel._id)
              .populate('authorId')
              .then(panel => {
                const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = panel;
                const RestructuredPanel = {
                  id: _id,
                  authorId: authorId._id,
                  authorUsername: authorId.username,
                  title,
                  panelText,
                  parentId,
                  rootId,
                  photoURL,
                  childIds,
                  likes,
                  comments
                };
                res.json(RestructuredPanel);
              });
          });
      });
      // check if it already exists
      // check if it already exists
      // save it
      // return it
    }
  })
  .get('/', (req, res) => {
    if (req.query.panelsArray) {
      if (req.query.panelsArray[0] === 'CHILDREN') {
        
        const childrenOBJ = {childrenToReturn: [], rootDesc: {}}
        function getTheChildren(arr, depth = 0){
          if (arr.length === 0) {
              const panelsToReturnPojo = {};
              childrenOBJ.childrenToReturn.forEach(panel => {
                const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = panel;
                const RestructuredPanel = {
                  id: _id,
                  authorId: authorId._id,
                  authorUsername: authorId.username,
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
              delete childrenOBJ.childrenToReturn
              childrenOBJ["children"] = panelsToReturnPojo
              return res.send(childrenOBJ);
          }
          Panel.find({ _id: { $in: arr } }).populate('authorId').then(panelsArray => {
            childrenOBJ.childrenToReturn = childrenOBJ.childrenToReturn.concat(panelsArray);
            let recursiveArr = []
            panelsArray.forEach(panel => {
              const {rootId, title, _id} = panel;
              if (childrenOBJ.rootDesc[_id] === undefined && rootId === null){
                childrenOBJ.rootDesc[_id] = {depth: 0, branchCount: 1};
              } else if (childrenOBJ.rootDesc[rootId] !== undefined){
                if (childrenOBJ.rootDesc[rootId].depth < depth) childrenOBJ.rootDesc[rootId].depth = depth;
                childrenOBJ.rootDesc[rootId].branchCount += 1;
              }
              recursiveArr = recursiveArr.concat(panel.childIds)
            });
            getTheChildren(recursiveArr, depth + 1)
            
          }).catch(err => console.log(err));
        }
        getTheChildren(req.query.panelsArray.slice(1));
      } else {
        Panel.find({ _id: { $in: req.query.panelsArray } }).populate('authorId').then(panelsArray => {
          const panelsToReturnPojo = {};
          panelsArray.forEach(panel => {
            const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, comments } = panel;
            const RestructuredPanel = {
              id: _id,
              authorId: authorId._id,
              authorUsername: authorId.username,
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
    } else {
      Panel.find({}).populate('authorId').then(panelsArray => {
        const panelsToReturnPojo = {};
        panelsArray.forEach(panel => {
          const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, likes, comments } = panel;
          
          const RestructuredPanel = {
            id: _id,
            authorId: authorId._id,
            authorUsername: authorId.username,
            title,
            panelText,
            parentId,
            rootId,
            photoURL,
            childIds,
            likes,
            comments
          };
          
          if (RestructuredPanel.parentId === null) {
            panelsToReturnPojo[RestructuredPanel.id] = RestructuredPanel;
          }
        });
        res.send(panelsToReturnPojo);
      })
        .catch(err => console.log(err));
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
    .then(panel => {
      panel.comments.push(comment);
      panel.save((err, panel) => {
        if (err) console.log(err);
        Panel.findById(panel._id)
          .populate('authorId')
          .then(panel => {
            const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, likes, comments } = panel;
            const RestructuredPanel = {
              id: _id,
              authorId: authorId._id,
              authorUsername: authorId.username,
              title,
              panelText,
              parentId,
              rootId,
              photoURL,
              childIds,
              likes,
              comments
            };
            res.json(RestructuredPanel);
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json({ comment: "panel can't be found to add comment " });
    });
});

//! delete comments
router.patch('/delete-comment/:id', (req, res) => {
  Panel.findById(req.params.id)
    .then((panel) => {
      const rest = [];
      panel.comments.forEach((comment) => {
        if (comment._id != req.body.commentId) {
          rest.push(comment);
        }
      });
      panel.comments = rest;
      panel.save((err, panel) => {
        if (err) console.log(err);
        Panel.findById(panel._id)
          .populate('authorId')
          .then(panel => {
            const { _id, authorId, title, panelText, photoURL, parentId, rootId, childIds, likes, comments } = panel;
            const RestructuredPanel = {
              id: _id,
              authorId: authorId._id,
              authorUsername: authorId.username,
              title,
              panelText,
              parentId,
              rootId,
              photoURL,
              childIds,
              likes,
              comments
            };
            res.json(RestructuredPanel);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
