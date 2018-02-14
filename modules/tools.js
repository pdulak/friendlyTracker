/**
 * Module dependencies.
 * @private
 */

/**
 * Module exports.
 * @public
 */

var exports = module.exports = {};

/**
 * Module variables.
 * @private
 */

var app;

/**
 * App value setter.
 *
 * @public
 */

exports.setApp = function(appValue) {
    app = appValue;
}

/**
 * Handles request start actions.
 *
 * @public
 */

exports.onRequestStart = function(req, res, next) {
    var executions = req.app.get('executionsThisTime');
    app.set('executionsThisTime', ++executions);

    next();
}

/**
 * Handles request end actions.
 *
 * @public
 */

exports.onRequestEnd = function(req, res, next) {
    function afterResponse() {
        var executions = req.app.get('executionsThisTime');
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);

        console.log('Executed ' + executions + ' times');
    }

    res.on('finish', afterResponse);
    res.on('close', afterResponse);

    next();
}

/**
 * Generates the menu.
 *
 * @public
 */

exports.generateMainMenu = function(req, res, next) {
    var menuItems = [{
            label: 'Home',
            href: '/'
        }, {
            label: 'About',
            href: '/about',
            menuItems: [{
                label: 'About our staff',
                href: '/aboutstaff',
                menuItems: [{
                    label: 'CEO',
                    href: '/aboutCEO'
                }, {
                    label: 'Link to Google',
                    href: 'https://google.com/'
                }]
            }, {
                label: 'About our building',
                href: '/aboutbuilding'
            }]
        }, {
            label: 'Admin',
            href: '/siteAdmin'
        }, {
            label: 'Page with error',
            href: '/siteAdmin/thisIsNotWorking'
        }, {
            label: 'Users',
            href: '/user'
        }

    ]
    adjustMenuClass(menuItems, req._parsedUrl.pathname);
    res.locals.menuItems = menuItems;
    next();
};

/**
 * Generates the menu for user area.
 *
 * @public
 */

exports.generateUserMenu = function(req, res, next) {
    var menuItems = [{
            label: 'Home',
            href: '/'
        }, {
            label: 'My profile',
            href: '/user',
            menuItems: [
                {
                    label: 'My Address',
                    href: '/user/address'
                },
                {
                    label: 'My Billing Info',
                    href: '/user/billingInfo'
                }
            ]
        }, {
            label: 'Empty',
            href: '#'
        }

    ]
    adjustMenuClass(menuItems, req._parsedUrl.pathname);
    res.locals.menuItems = menuItems;
    next();
};

/**
 * Test function.
 *
 * @public
 */

exports.testFunction = function(req, res, next) {
    console.log('This one is a test only');
    console.log(req);
    next();
}

/**
 * highlight proper menu item.
 *
 * @private
 */

function adjustMenuClass(menuItems, pathname) {
    for (var item in menuItems) {
        if (menuItems[item].href == pathname) {
            menuItems[item].class = 'menu-selected';
        }
        if (menuItems[item].menuItems) {
            adjustMenuClass(menuItems[item].menuItems, pathname)
        }
    }
}
