const threadsList = (req, res, next) => {
  res.render('threads-list', { 
    title: 'ForumBoard',
    pageHeader: { title: 'ForumBoard'},
    threads: [{
      title: 'New Post',
      comment: {
        createdOn: '2019-04-01T22:12:41.893+00:00',
        comment: 'This is a new post for test'
      }
    }, {
      title: 'I like cars',
      comment: {
        createdOn: '2019-04-15T06:42:41.893+00:00',
        comment: 'Gimme the v8'
      }
    }]
  });
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