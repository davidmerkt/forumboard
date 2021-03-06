const mongoose = require('mongoose');
const mongooseModel = 'Thread';
const Thread = mongoose.model(mongooseModel);

const doAddComment = (req, res, thread) => {
  if (!thread) {
    res
      .status(404)
      .json({message: "Thread not found"});
  } else {
    const {commentText} = req.body;
    thread.comments.push({commentText});
    thread.save((err, thread) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        const thisComment = thread.comments.slice(-1).pop();
        res
          .status(201)
          .json(thisComment);
      }
    });
  }
};

const commentsCreate = (req, res) => {
  const threadid = req.params.threadid;
  if (!threadid) {
    return res
      .status(404)
      .json({message: "Not found, threadid is required"});
  } else {
    Thread
      .findById(threadid)
      .select('comments')
      .exec((err, thread) => {
        if (!thread) {
          return res
            .status(404)
            .json({message:"thread not found"});
        } else if (err) {
          res
            .status(400)
            .json(err);
        } else {
          doAddComment(req, res, thread);
        }
      });
  }
};

const commentsReadOne = (req, res) => {
  Thread
    .findById(req.params.threadid)
    .select('title comments')
    .exec((err, thread) => {
      if (!thread) {
        return res
          .status(404)
          .json({message:"thread not found"});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      if (thread.comments && thread.comments.length > 0) {
        const comment = thread.comments.id(req.params.commentid);
        if (!comment) {
          return res
            .status(400)
            .json({message: "comment not found"});
        } else {
          response = {
            thread: {
              _id: req.params.threadid,
              title: thread.title
            },
            comment
          };
          return res
            .status(200)
            .json(response);
          }
        } else {
          return res
            .status(404)
            .json({message: "no comments found"});
        }
      }
    );
};

const commentsUpdateOne = (req, res) => {
  const {threadid, commentid} = req.params;
  if (!threadid || !commentid) {
    return res
      .status(404)
      .json({message: "Not found, threadid and commentid are both required"});
  }
  Thread
    .findById(threadid)
    .select('comments')
    .exec((err, thread) => {
      if (!thread) {
        return res
          .status(404)
          .json({message: "Thread not found"});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      if (thread.comments && thread.comments.length > 0) {
        const thisComment = thread.comments.id(commentid);
        if (!thisComment) {
          res
            .status(404)
            .json({message: "Comment not found"});
        } else {
          thisComment.commentText = req.body.commentText;
          thread.save((err, thread) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
              res
                .status(200)
                .json(thisComment);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({message: "No comment to update"});
      }
    });
};

const commentsDeleteOne = (req, res) => {
  const {threadid, commentid} = req.params;
  if (!threadid || !commentid) {
    return res
      .status(404)
      .json({message: "Not found, threadid and commentid are both required"});
  }
  Thread
    .findById(threadid)
    .select('comments')
    .exec((err, thread) => {
      if (!thread) {
        return res
          .status(404)
          .json({message: "Thread not found"});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      if (thread.comments && thread.comments.length > 0) {
        if (!thread.comments.id(commentid)) {
          return res
            .status(404)
            .json({message: "Comment not found"});
        } else {
          thread.comments.id(commentid).remove();
          thread.save(err => {
            if (err) {
              return res
                .status(500)
                .json(err);
            } else {
              res
                .status(204)
                .json(null);
            }
          })
        }
      } else {
        res
          .status(404)
          .json({message: "No comment to delete"});
      }
    });
};

module.exports = {
  commentsCreate, 
  commentsReadOne, 
  commentsUpdateOne, 
  commentsDeleteOne
};