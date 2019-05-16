const mongoose = require('mongoose');
const Thread = mongoose.model('Thread');

const threadsListAll = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

const threadsCreate = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};

const threadsReadOne = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
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