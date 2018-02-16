var httpMocks = require('node-mocks-http');
var tools = require('../modules/tools');

// tests against tools module

describe('/modules/tools.js ', function() {

    // This is the name of the test
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
            done(new Error("menuItems not created properly"));
        }

    });

    // This is the name of the test
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

});
