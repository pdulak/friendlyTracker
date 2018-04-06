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

/**
 * Handles request start actions.
 *
 * @public
 */

exports.onRequestStart = function(req, res, next) {
    var executions = req.app.get('executionsThisTime');
    req.app.set('executionsThisTime', ++executions);
    if (req.session.startDate) {
        req.session.lastRequestDate = Date.now();
    } else {
        req.session.startDate = Date.now();
        req.session.lastRequestDate = Date.now();
    }
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
            label: 'About Us',
            href: '/about',
            // menuItems: [{
            //     label: 'About our staff',
            //     href: '/aboutstaff'
            // }, {
            //     label: 'About our building',
            //     href: '/aboutbuilding'
            // }]
        }, {
            label: 'Admin',
            href: '/siteAdmin',
            menuItems: [{
                label: 'Setup',
                href: '/siteAdmin/setup'
            }]
        }, {
            label: 'Users',
            href: '/user'
        }, {
            label: 'Login',
            href: '/login'
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
            href: '/user'
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

/**
 * Milliseconds conversion.
 *
 * @public
 */
exports.convertMillisecondsToStringDate = function(s) {
    var d = new Date(s);
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" +
        ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
}
