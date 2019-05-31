const express = require('express');
const router = express.Router();
const ctrlThreads = require('../controllers/threads');
const ctrlOthers = require('../controllers/others');

/* GET home page. */
router.get('/', ctrlThreads.threadsList);

router
  .route('/thread/new')
  .get(ctrlThreads.threadNew)
  .post(ctrlThreads.threadAdd);

router
  .route('/thread/:threadid')
  .get(ctrlThreads.threadDisplay)
  .post(ctrlThreads.commentAdd);

router.get('/about', ctrlOthers.about);

module.exports = router;
