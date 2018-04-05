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

// exports
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
