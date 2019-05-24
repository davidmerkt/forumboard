const express = require('express');
const router = express.Router();
const ctrlThreads = require('../controllers/threads');
const ctrlOthers = require('../controllers/others');

/* GET home page. */
router.get('/', ctrlThreads.threadsList);
router.get('/thread/:threadid', ctrlThreads.threadDisplay);
router.get('/thread/new', ctrlThreads.threadAdd);

router.get('/about', ctrlOthers.about);

module.exports = router;
