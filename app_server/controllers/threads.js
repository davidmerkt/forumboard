const request = require('request');
const apiOptions = {
  server: "http://localhost:3000"
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
      console.log('statusCode:', response && response.statusCode);
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        console.log(body);
        renderHomepage(req, res, body);
      } else {
        console.log(response.statusCode);
      }
    }
  );
};

const renderThreadPage = (req, res, thread) => {
  console.log(thread);
  res.render('thread-display', {
    title: `${thread.title} - ForumBoard`,
    pageHeader: { title: thread.title },
    thread
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

module.exports = {
  threadsList, 
  threadDisplay, 
  threadAdd
};