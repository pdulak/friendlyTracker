# looserTracker

My first Node.js / Express web application.

Setup
----------
Install dependencies by using: **npm install**
Install nodemon: **npm install -g nodemon**

Configuration
----------
Directory 'config' contains global and sample configuration file. You should create
'config.dev.js' and 'config.prod.js' files respectively using values for your environments.

Running
----------
+ Run app with debug by using: **DEBUG=looserTracker:\* npm start**
+ Run app with debug and nodemon using: **DEBUG=looserTracker:\* nodemon ./bin/www**
+ Nodemon should also work this way: **nodemon**

Testing
----------
+ in the command line enter: **mocha**

Browser
----------
+ in the browser open the url: **http://localhost:3000/**


Things I learned so far:
----------
+ basics of Express routing
+ basics of Express error handling (I was not able to crash an app using stupid errors in my code)
+ how to reload an application if code changes: **nodemon**
+ basics of handlebars - usage of variables, each, layouts
+ basics of PureCSS
+ request and response objects basics
+ how to execute code at the start and end of each Request
+ how to use different layouts in handlebars
+ how to pass response locals and application locals to handlebars
+ how to generate menu using module and how to highlight current page using request variables
+ how to create node module and how function calls works in such module
+ how to use partials in handlebars and how to call them even recursively
+ how to test parts of my application using mocha

Things to review / read / check:
----------
+ https://expressjs.com/en/guide/using-middleware.html
