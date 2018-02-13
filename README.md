# looserTracker

My first Node.js / Express web application.

Setup
----------
Install dependencies by using: **npm install**
Install nodemon: **npm install -g nodemon**

Running
----------
+ Run app with debug by using: **DEBUG=looserTracker:\* npm start**
+ Run app with debug and nodemon using: **DEBUG=looserTracker:\* nodemon ./bin/www**

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

Things to review / read / check:
----------
+ https://expressjs.com/en/guide/using-middleware.html
