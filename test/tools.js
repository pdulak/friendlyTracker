var httpMocks = require('node-mocks-http');
var tools = require('../modules/tools');

// tests against tools module

describe('/modules/tools.js ', function() {

    it('generateMainMenu should generate non-empty res.locals.menuItems array', function(done) {
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

    it('generateMainMenu should generate Main Menu (contains About Us page)', function(done) {
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

    it('generateMainMenu should highlight proper menu item', function(done) {
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

    it('generateUserMenu should generate non-empty res.locals.menuItems array', function(done) {
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

    it('generateUserMenu should generate User Menu (contains My profile page)', function(done) {
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

    it('generateUserMenu should highlight proper menu item', function(done) {
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

});
