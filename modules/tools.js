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
 * Generates the menu.
 *
 * @public
 * @return {Function} middleware
 */

exports.generateMenu = function () {
  return function generateMenu (req, res, next) {
    var menuItems = [
      {
          label: 'Home',
          href: '/'
      },{
          label: 'About',
          href: '/about'
      },{
          label: 'Users',
          href: '/user'
      },{
          label: 'Admin',
          href: '/siteAdmin'
      },{
          label: 'Page with error',
          href: '/siteAdmin/thisIsNotWorking'
      },{
          label: 'Empty',
          href: '#'
      }

    ]
    for(var item in menuItems) {
        if (menuItems[item].href == req._parsedUrl.pathname) {
            menuItems[item].class = 'pure-menu-selected';
        }
    }
    res.locals.menuItems = menuItems;
    next();
    return;
  }
};

/**
 * Generates the menu for user area.
 *
 * @public
 * @return {Function} middleware
 */

exports.generateUserMenu = function () {
  return function generateMenu (req, res, next) {
    var menuItems = [
      {
          label: 'Home',
          href: '/'
      },{
          label: 'My profile',
          href: '/user'
      },{
          label: 'Empty',
          href: '#'
      }

    ]
    for(var item in menuItems) {
        if (menuItems[item].href == req._parsedUrl.pathname) {
            menuItems[item].class = 'pure-menu-selected';
        }
    }
    res.locals.menuItems = menuItems;
    next();
    return;
  }
};

/**
 * Test function.
 *
 * @public
 */

exports.testFunction = function() {
    console.log('This one is a test only')
}
