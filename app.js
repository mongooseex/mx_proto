'use strict';

var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , express = require('express')
  , exphbs = require('express3-handlebars')
  , auth = require('./business/middleware/auth')

  , settings = require('./settings.json')
  , routePath = settings.appSettings.routePath
  , viewHelpersDir = settings.viewEngine.helpersDir
  , hbs = exphbs.create(settings.viewEngine)
  , app = express();

app.configure(function() {
  app.locals(settings.locals);
  app.locals.env = process.env.NODE_ENV || 'development';

  app.set('appSettings', settings.appSettings);
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', settings.viewEngine.extname);
  app.engine('.html', hbs.engine);

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.cookieSession({ 
    secret: Math.random().toString(36).substring(12),
    cookie: settings.session.cookie
  }));
  app.use(express.methodOverride());
  app.use(auth());
  app.use(app.router);

  app.disable('x-powered-by');
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

//load all handlebars helpers
fs.readdirSync(viewHelpersDir).forEach(function(file) {
  require(path.resolve('./', viewHelpersDir, file)).registerHelper(hbs.handlebars);
});

//load all routes
fs.readdirSync(routePath).forEach(function(file) {
  require(path.resolve('./', routePath, file)).init(app);
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
