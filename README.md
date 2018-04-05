# friendlyTracker

My first Node.js / Express web application.

Setup
----------
Install dependencies by using: **npm install**  
Install nodemon: **npm install -g nodemon**  
Install mocha: **npm install --g mocha**

Configuration
----------
Directory **config** contains global and sample configuration file. You should create
**config.development.js** and **config.prod.js** files respectively using values for your environments.
By default the application is using SQLite as the database - under heavy load it
should be changed to the more powerful engine.

Running
----------
+ Run app with debug by using: **DEBUG=friendlyTracker:\* npm start**
+ Run app with debug and nodemon using: **DEBUG=friendlyTracker:\* nodemon ./bin/www**
+ Nodemon should also work this way: **nodemon**

Testing
----------
+ in the command line enter: **mocha**

Browser
----------
+ in the browser open the url: **http://localhost:3000/**


Things I learned so far:
----------
+ It is not easy to chose technology stack in NodeJS: https://handyman.dulare.com/web-application-node-js-painful-beginning/
+ How Express generator works, how to deal with the start and end of the request: https://handyman.dulare.com/friendlytracker-test-project-node-express/
+ Handlebars basics: https://handyman.dulare.com/handlebars-express-basics/
+ How to highlight selected menu item: https://handyman.dulare.com/express-highlight-selected-menu-item/
+ Testing with Mocha and Chai: https://handyman.dulare.com/testing-express-with-mocha-and-chai/
+ Passing variables through the middleware: https://handyman.dulare.com/passing-variables-through-express-middleware/
+ Multi-level menu creation: https://handyman.dulare.com/multi-level-menu-in-express/
+ Handling configuration variables: https://handyman.dulare.com/application-configuration-in-express/
+ Basics of session management: https://handyman.dulare.com/session-management-in-express/

Things to review / read / check:
----------
+ https://expressjs.com/en/guide/using-middleware.html
