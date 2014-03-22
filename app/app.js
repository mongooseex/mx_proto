var settings = require('./settings.json')
  , http = require('http')
  , express = require('express')
  , exphbs = require('express3-handlebars')
  , path = require('path')
  , fs = require('fs')

  , routePath = settings.appSettings.routePath
  , app = express();

app.configure(function(){
  app.locals(settings.locals);
  app.set('appSettings', settings.appSettings);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.engine('.html', exphbs(settings.viewEngine));
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.disable('x-powered-by');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

fs.readdirSync(routePath).forEach(function(file) {
  require(path.resolve('./', routePath, file)).init(app);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
