require('dotenv').config()
const Sentry = require ("@sentry/node");
const { ProfilingIntegration } = require ("@sentry/profiling-node");
const express = require('express');
const app = express();
const port = 3000
var morgan = require('morgan')

app.use(morgan('combined'))
app.get('/', function (req, res){
  res.send('hello world')
})

const path = require('path')
const flash = require('express-flash')
const session = require('express-session')

const routers = require('./router')
const swaggerJSON = require('./openapi.json')
const swaggerUI = require('swagger-ui-express')

const passport = require('./utils/passport');

//perlu ditambahkan sesuatu untuk bisa 
//menambahkan data
app.use(express.json())

app.use(express.urlencoded({extended:false})) //req.body untuk form data
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session())

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, './app/view'))

Sentry.init({
  dsn: 'https://11a08bf4cd87b4f982b3ddbef1d3b140@o4506258408669184.ingest.sentry.io/4506299985494016',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All your controllers should live here
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))
app.use('/api',routers);

app.listen(port, () => 
    console
      .log(`Server run at http://localhost:${port}
    `))

module.exports = app;
