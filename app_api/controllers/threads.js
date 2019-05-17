const mongoose = require('mongoose');
const Thread = mongoose.model('Thread');

//TODO return just the first comment for each thread
const threadsListAll = (req, res) => {
  Thread
    .find()
    .exec((err, threads) => {
      res
        .status(200)
        .json(threads);
    });
};

const threadsCreate = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

const threadsReadOne = (req, res) => {
  Thread
    .findById(req.params.threadid)
    .exec((err, thread) => {
      if (!thread) {
        return res
          .status(404)
          .json({"message": "thread not found"});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      res
        .status(200)
        .json(thread);
    });
};

const threadsUpdateOne = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

const threadsDeleteOne = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

module.exports = {
  threadsListAll, 
  threadsCreate, 
  threadsReadOne, 
  threadsUpdateOne, 
  threadsDeleteOne
};