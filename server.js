var express = require('express')
    http = require('http'),
    exphbs = require('express3-handlebars'),
    path = require('path');

var app = express();

// app.configure(function(){
//   app.set('port', process.env.PORT || 3000);
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'handlebars');
//   app.use(express.favicon());
//   app.use(express.logger('dev'));
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(path.join(__dirname, 'static')));
// });


app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'static')));

//app.engine('html', require('ejs').renderFile);

// app.use(h5bp({ root: __dirname + '/public' }));

// in order to serve files, you should add the two following middlewares
// app.use(express.compress());
// app.use(express.static(__dirname + '/public'));

app.get('/requests', function(req, res){
  res.render('requests');
});

app.get('/feed', function(req, res){
  res.render('feed');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});