var express = require('express')
    http = require('http'),
    exphbs = require('express3-handlebars'),
    path = require('path'),
    usersPath = require('./js/scheme_users'),
    requestsPath = require('./js/scheme_requests'),
    request = require('request');

var app = express();

var API_KEY = "9fb36b1f3a0e8b4662f858516965c6bd27dddd64";

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

app.get('/', function(req, res){
  res.render('homepage', {layout: false});
});

app.get('/requests', function(req, res){
  var _yourReqs = [{client: "You", item:"A Lamp. Any lamp.", accepted: true, agent: "John Doe", details:"Seriously tho", offer:17.00, place:"XYY, 3 SD Dr, City, ST 59375"}];
  var _yourAccs = [{client: "Tim the Beaver", address: "84 Mass Ave, Cambridge, MA 02139", item:"Sexy Socks", accepted: true, agent: "You", details:"The sexiest socks that exist", offer:8.00, place:"THE Sock Store, 9 Boylston St, Boston, MA 02215"}];
  res.render('requests', {requestsPage: true, title: 'requests', yourRequests: _yourReqs, yourAcceptances: _yourAccs});
});

app.get('/feed', function(req, res){
  
  var _reqs = [{client: "John Smith", item: "3 Gallons of Milk", open: true, details: "I really need 3 gals of milk. Thanks!", offer: 19.75, place: "Shaw's, Cambridge"}];
  res.render('feed', {feedPage: true, title:'feed', requests: _reqs});
});

app.get('/test', function(req, res) {
  res.render('test');
});

app.get('/test-query', function(req, res) {
  console.log(req.query);
  var query = req.query;
  var locu = require('locu');
  var vclient = new locu.VenueClient(API_KEY);
  vclient.search({name: query.name, postal_code: query.zip}, function(response) {
    console.log(response);
    res.send(response);
  });
});

// Shawn Jain
app.get('/api/venmoRedirect', function(req, res){
  var code;
  if(req.query.access_token){
    code = access_token
  }
  var CLIENT_ID = 1438;
  var CLIENT_SECRET = "JywRDZDANk5WnE2cvbsAas2E9ujHYKaD";
  parameters = {client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code: code}
  var base_url = "https://api.venmo.com/oauth/access_token"
  var url = base_url + '?' + querystring.stringify(parameters)
  var header = {
    uri: url, 
    method:"GET",
  }
  request(header, function(error, response, body){
    console.log(body);
    console.log(body.access_token);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});