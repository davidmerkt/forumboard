const request = require('request');
const apiOptions = {
  server: "http://localhost:3000"
};

const showError = (req, res, status) => {
  let title = '';
  let content = '';
  if (status === 404) {
    title = '404, page not found';
    content = 'Oh dear. Looks like we can\'t find this page. Sorry.';
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title,
    content
  });
};

const renderHomepage = (req, res, responseBody) => {
  res.render('threads-list', { 
    title: 'ForumBoard',
    pageHeader: { title: 'ForumBoard'},
    threads: responseBody
  });
};

const threadsList = (req, res, next) => {
  const path = '/api/threads';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        renderHomepage(req, res, body);
      } else {
        console.log(response.statusCode);
      }
    }
  );
};

const renderThreadPage = (req, res, thread) => {
  res.render('thread-display', {
    title: `${thread.title} - ForumBoard`,
    pageHeader: { title: thread.title },
    thread, 
    error: req.query.err
  });
}

const getThreadInfo = (req, res, callback) => {
  const path = `/api/threads/${req.params.threadid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      let data = body;
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        showError(req, res, response.statusCode);
      }
    }
  );
};

const threadDisplay = (req, res, next) => {
  getThreadInfo(req, res, 
    (req, res, responseData) => renderThreadPage(req, res, responseData)  
  );
};

const threadAdd = (req, res, next) => {
  res.render('thread-createnew-form', { title: 'Create New Thread' });
};

const commentAdd = (req, res, next) => {
  const threadid = req.params.threadid;
  const path = `/api/threads/${threadid}/comments`;
  const postdata = {commentText: req.body.comment};
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  if (!postdata.commentText) {
    res.redirect(`/thread/${threadid}?err=val#addComment`);
  } else {
    request(
      requestOptions,
      (err, response, body) => {
        if (response.statusCode === 201) {
          res.redirect(`/thread/${threadid}`);
        } else if (response.statusCode === 400 && body.name && body.name === 'ValidationError') {
          res.redirect(`/thread/${threadid}?err=val#addComment`);
        } else {
          showError(req, res, response.statusCode);
        }
      }
    );
  }
};

module.exports = {
  threadsList, 
  threadDisplay, 
  threadAdd,
  commentAdd
};