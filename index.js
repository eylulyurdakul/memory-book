const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// Initialize the app
const app = express();

// Initialize the data store
global.memories = [];

// Set the port and views of the app up
app.set('port', process.env.PORT || 1437);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Attach middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'unbelievablysecret',
  resave: true, // Tell the session store that a particular session is still active
  saveUninitialized: true // Store the session object even though it's not modified
}));
app.use(flash());

// Pass messages to the views directly by global variables
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  next();
});

// Attach routes
app.use(require('./routes'));
app.use(require('./routes/memories'));

// Attach static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}!`);
});

module.exports = app;
