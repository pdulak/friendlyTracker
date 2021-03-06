var config = require('./config.global');

config.env = 'dev';
config.hostname = 'dev.example';
config.db = {
    database: 'null',
    username: 'null',
    password: 'null',
    sequelizeParams: {
        dialect: 'sqlite',
        storage: './sqliteDB/Tracker.sqlite',
        operatorsAliases: false
    }
}
config.sessionDb = {
    database: 'null',
    username: 'null',
    password: 'null',
    sequelizeParams: {
        dialect: 'sqlite',
        storage: './sqliteDB/sessionStore.sqlite',
        operatorsAliases: false
    }
}

module.exports = config;
