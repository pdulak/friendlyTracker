var fs = require("fs");
var path = require("path");
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development',
    config = require('./../config/config.' + env);
var db = {};

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.sequelizeParams);

// load models

fs
    .readdirSync(__dirname + '/../models')
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname + '/../models', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

//Sync Database
sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
    db.dbVersion.findAndCountAll().then(function(data) {
        if (data.count == 0) {
            console.log('No data in dbVersion, initializing...');
            db.dbVersion.create({
                version: '20180313-01'
            })
        } else {
            console.log('Current database version: ' + data.rows[0].version);
            if (data.count > 1) {
                console.log('There are too many records in the dbVersion table!!!');
            }
        }
    });
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});

// exports
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
