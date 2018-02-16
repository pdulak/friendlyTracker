var httpMocks = require('node-mocks-http');
var tools = require('../modules/tools');

// tests against tools module

describe('/modules/tools.js ', function() {

    describe('generateMainMenu', function() {
        it('should generate non-empty res.locals.menuItems array', function(done) {
            var req = httpMocks.createRequest({
                _parsedUrl: {
                    pathname: "/siteAdmin"
                }
            });
            var res = httpMocks.createResponse();
            var next = function() {};

            // call the actual function
            tools.generateMainMenu(req, res, next);

            if ((res.locals.menuItems instanceof Array) && (res.locals.menuItems.length > 0)) {
                // If the behavior is as expected, call done with no argument.
                done();
            } else {
                // Otherwise, call done with an error.
                done(new Error("menuItems array not created properly"));
            }

        });

        it('should generate Main Menu (contains About Us page)', function(done) {
            var req = httpMocks.createRequest({
                _parsedUrl: {
                    pathname: "/siteAdmin"
                }
            });
            var res = httpMocks.createResponse();
            var next = function() {};

            tools.generateMainMenu(req, res, next);

            if (res.locals.menuItems.find(x => x.label === 'About Us')) {
                // If the behavior is as expected, call done with no argument.
                done();
            } else {
                // Otherwise, call done with an error.
                done(new Error("menuItems array does not contain About Us page"));
            }
        })

        it('should highlight proper menu item', function(done) {
            var req = httpMocks.createRequest({
                _parsedUrl: {
                    pathname: "/siteAdmin"
                }
            });
            var res = httpMocks.createResponse();
            var next = function() {};

            // call the actual function
            tools.generateMainMenu(req, res, next);

            if (res.locals.menuItems[2].class == 'menu-selected') {
                // If the behavior is as expected, call done with no argument.
                done();
            } else {
                // Otherwise, call done with an error.
                done(new Error("Proper menu item not selected"));
            }

        });
    })

    describe('generateUserMenu', function() {
        it('should generate non-empty res.locals.menuItems array', function(done) {
            var req = httpMocks.createRequest({
                _parsedUrl: {
                    pathname: "/user"
                }
            });
            var res = httpMocks.createResponse();
            var next = function() {};

            // call the actual function
            tools.generateUserMenu(req, res, next);

            if ((res.locals.menuItems instanceof Array) && (res.locals.menuItems.length > 0)) {
                // If the behavior is as expected, call done with no argument.
                done();
            } else {
                // Otherwise, call done with an error.
                done(new Error("menuItems array not created properly"));
            }

        });

        it('should generate User Menu (contains My profile page)', function(done) {
            var req = httpMocks.createRequest({
                _parsedUrl: {
                    pathname: "/user"
                }
            });
            var res = httpMocks.createResponse();
            var next = function() {};

            tools.generateUserMenu(req, res, next);

            if (res.locals.menuItems.find(x => x.label === 'My profile')) {
                // If the behavior is as expected, call done with no argument.
                done();
            } else {
                // Otherwise, call done with an error.
                done(new Error("menuItems array does not contain My profile page"));
            }
        })

        it('should highlight proper menu item', function(done) {
            var req = httpMocks.createRequest({
                _parsedUrl: {
                    pathname: "/user"
                }
            });
            var res = httpMocks.createResponse();
            var next = function() {};

            // call the actual function
            tools.generateUserMenu(req, res, next);

            if (res.locals.menuItems[1].class == 'menu-selected') {
                // If the behavior is as expected, call done with no argument.
                done();
            } else {
                // Otherwise, call done with an error.
                done(new Error("Proper menu item not selected"));
            }

        });
    })

    describe('onRequestStart', function() {
        it('should increment executionsThisTime application variable', function(done) {
            var req = httpMocks.createRequest({
                app: {
                    get: function(nameOfVariable) {
                        return this[nameOfVariable];
                    },
                    set: function(nameOfVariable, valueOfVariable) {
                        this[nameOfVariable] = valueOfVariable;
                    },
                    executionsThisTime: 4
                }
            });
            var res = httpMocks.createResponse();
            var next = function() {};

            tools.onRequestStart(req, res, next);
            if (req.app.executionsThisTime == 5) {
                done();
            } else {
                done(new Error("the value of executionsThisTime is: " + req.app.executionsThisTime))
            }
        })
    })

    describe('onRequestEnd', function() {
        it('should register function on finish and close events in res object', function(done) {
            var req = httpMocks.createRequest();
            var res = {
                on: function(nameOfVariable, valueOfVariable) {
                    this[nameOfVariable] = valueOfVariable;
                }
            };
            var next = function() {};

            tools.onRequestEnd(req, res, next);
            if ((res.finish instanceof Function) && (res.close instanceof Function)) {
                done();
            } else {
                done(new Error("The values are not properly set: " + res.finish + " and " + res.close))
            }
        })
    })

});
