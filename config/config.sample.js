var config = require('./config.global');

config.env = 'dev';
config.hostname = 'dev.example';
config.db = {
    database: 'null',
    username: 'null',
    password: 'null',
    sequelizeParams: {
        dialect: 'sqlite',
        storage: './sqliteDB/looserTracker.sqlite',
        operatorsAliases: false
    }
}

module.exports = config;
