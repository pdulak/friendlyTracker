var session = require('express-session');
var Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var env = process.env.NODE_ENV || 'development'
  , config = require('./../config/config.'+env);

//
// Session configuration
//
var sequelizeSessionDB = new Sequelize(config.sessionDb.database, config.sessionDb.username, config.sessionDb.password, config.sessionDb.sequelizeParams);

var mySessionStore = new SequelizeStore({
    db: sequelizeSessionDB
});

// make sure that Session tables are in place
mySessionStore.sync();

module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: mySessionStore,
    cookie: {
       // secure: true // requires HTTPS connection
    }
});
