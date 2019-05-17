const mongoose = require('mongoose');
const mongooseModel = 'Thread';
const Thread = mongoose.model(mongooseModel);

//TODO return just the first comment for each thread
const threadsListAll = (req, res) => {
  Thread
    .find()
    .exec((err, threads) => {
      if (!threads[0]) {
        return res
          .status(404)
          .json({"message": "threads not found"});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      let threadsList = [];
      for (let i = 0, arrLen = threads.length; i < arrLen; i++) {
        let nextThread = { 
          "_id": threads[i]._id, 
          "title": threads[i].title
        };
        if (threads[i].comments[0]) {
          nextThread.comment = threads[i].comments[0].commentText;
          nextThread.createdOn = new Date(threads[i].comments[0].createdOn);
        }
        threadsList.push(nextThread);
      }
      res
        .status(200)
        .json(threadsList);
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