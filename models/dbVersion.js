module.exports = function(sequelize, Sequelize) {

    var dbVersion = sequelize.define('dbVersion', {
        version: Sequelize.STRING
    });

    return dbVersion;

}
