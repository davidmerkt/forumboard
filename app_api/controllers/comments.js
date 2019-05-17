const mongoose = require('mongoose');
const mongooseModel = 'Thread';
const Thread = mongoose.model(mongooseModel);

const commentsListAll = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

const commentsCreate = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

const commentsReadOne = (req, res) => {
  Thread
    .findById(req.params.threadid)
    .select('title comments')
    .exec((err, thread) => {
      if (!thread) {
        return res
          .status(404)
          .json({"message":"thread not found"});
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
            .json({"message": "comment not found"});
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
            .json({"message": "no comments found"});
        }
      }
    );
};

const commentsUpdateOne = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

const commentsDeleteOne = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

module.exports = {
  commentsListAll, 
  commentsCreate, 
  commentsReadOne, 
  commentsUpdateOne, 
  commentsDeleteOne
};