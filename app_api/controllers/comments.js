const mongoose = require('mongoose');
const Thread = mongoose.model('Thread');

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
  res
    .status(200)
    .json({"status": "success"});
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