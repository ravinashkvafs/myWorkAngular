var express = require('express');
var bp = require('body-parser');
var logger = require('morgan');
var jade = require('jade');
var path = require('path');

var client = require('./db');

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.set('view engine', 'jade');

// Mongoose Connection
// mongoose.Promise = global.Promise;
client.connectDb(function (err) {
  if (err) {
    console.log("Error");
  }
  else {
    console.log("Connected correctly to mLab");
  }
});

//attaching routes
var user = require('./routes/user.js');
var uploader = require('./routes/uploader.js');

app.use('/user', user);
app.use('/uploader', uploader);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Secure traffic only
app.all('*', function (req, res, next) {
  console.log('req start: ', req.secure, req.hostname, req.url, app.get('port'));
  if (req.secure) {
    return next();
  };

  res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

// Chatroom
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;
  console.log("Socket established");

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

app.listen(7999, function (err, suc) {
  if (!err)
    console.log("Listening at port 7999");
});