const express = require('express');
const router = express.Router();
const ctrlThreads = require('../controllers/threads');
const ctrlComments = require('../controllers/comments');

router
  .route('/threads')
  .get(ctrlThreads.threadsListAll)
  .post(ctrlThreads.threadsCreate);

router
  .route('/threads/:threadid')
  .get(ctrlThreads.threadsReadOne)
  .put(ctrlThreads.threadsUpdateOne)
  .delete(ctrlThreads.threadsDeleteOne);

router
  .route('/threads/:threadid/comments')
  .get(ctrlComments.commentsListAll)
  .post(ctrlComments.commentsCreate);

router
  .route('/threads/:threadid/comments/:commentid')
  .get(ctrlComments.commentsReadOne)
  .put(ctrlComments.commentsUpdateOne)
  .delete(ctrlComments.commentsDeleteOne);

module.exports = router;