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

const threadDisplay = (req, res, next) => {
  res.render('thread-display', { 
    title: 'I like cars - ForumBoard', 
    pageHeader: {title: 'I like cars'}, 
    comments: [{
      createdOn: '2019-04-15T06:42:41.893+00:00',
      comment: 'Gimme the v8'
    }, {
      createdOn: '2019-04-17T20:10:41.893+00:00',
      comment: 'I\'m a fan of EcoBoost, same power less weight'
    }, {
      createdOn: '2019-04-18T03:32:41.893+00:00',
      comment: 'Wow, what a stupid noob'
    }, {
      createdOn: '2019-04-24',
      comment: 'no timestamp'
    }]
  });
};

const threadAdd = (req, res, next) => {
  res.render('thread-createnew-form', { title: 'Create New Thread' });
};

module.exports = {
  threadsList, 
  threadDisplay, 
  threadAdd
};