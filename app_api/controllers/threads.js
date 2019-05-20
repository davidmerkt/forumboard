const mongoose = require('mongoose');
const mongooseModel = 'Thread';
const Thread = mongoose.model(mongooseModel);

const threadsListAll = (req, res) => {
  Thread
    .find()
    .exec((err, threads) => {
      if (!threads[0]) {
        return res
          .status(404)
          .json({message: "threads not found"});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      let threadsList = [];
      for (let i = 0, arrLen = threads.length; i < arrLen; i++) {
        let nextThread = { 
          _id: threads[i]._id, 
          title: threads[i].title
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
  Thread.create({
    title: req.body.title,
    comments: [{
      commentText: req.body.comment,
      createdOn: Date.now()
    }]
  }, (err, thread) => {
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      res
        .status(201)
        .json(thread);
    }
  });
};

const threadsReadOne = (req, res) => {
  Thread
    .findById(req.params.threadid)
    .exec((err, thread) => {
      if (!thread) {
        return res
          .status(404)
          .json({message: "thread not found"});
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
  if (!req.params.threadid) {
    return res
      .status(400)
      .json({message: "No threadid in request"});
  }
  Thread
    .findById(req.params.threadid)
    .select('-comments')
    .exec((err, thread) => {
      if (!thread) {
        return res
          .status(404)
          .json({message: "threadid not found"});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      thread.title = req.body.title;
      thread.save((err, thread) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          res
            .status(200)
            .json(thread);
        }
      });
    });
};

const threadsDeleteOne = (req, res) => {
  const threadid = req.params.threadid;
  if (threadid) {
    Thread
      .findByIdAndRemove(threadid)
      .exec((err, thread) => {
        if (!thread) {
          return res
            .status(404)
            .json({message: "No thread found"});
        } else if (err) {
          return res
            .status(400)
            .json(err);
        }
        res
          .status(200)
          .json({thread});
      });
  } else {
    res
      .status(400)
      .json({message: "No threadid in request"});
  }
};

module.exports = {
  threadsListAll, 
  threadsCreate, 
  threadsReadOne, 
  threadsUpdateOne, 
  threadsDeleteOne
};