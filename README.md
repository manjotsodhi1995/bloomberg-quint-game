# Bloomberg Quint - Diamond Sweeper Game

## Problem Statement

The goal of this exercise is to build a game.

The rules of the game are as follows:

* The game board has 8x8 squares (initially, all represented by question marks)
* There are 8 diamonds hidden on the board, each diamond behind one of the squares
* When the user clicks on a square
    * If the square was hiding a diamond, the diamond appears
    * Otherwise, the square is opened, and blank
* The game ends when all diamonds are found. The user's score is the number of squares still left unturned
* When the user clicks on a square
    * If the square was not a diamond, then an arrow appears, pointing towards the nearest diamond
    * Any arrows that were previously show become hidden

## Prerequisites for viewing the demo

Requirements:

* node.js (the app was built against v8.1.4, but any node > 6 should work)
* npm

To start the Application:

* Install the dependencies (via `yarn install` or `npm install`)
* Compile Assets: `npm run compile`
* Start the webserver: `npm start`
* Visit `http://localhost:3000` to see the application



## Features 
* The application is responsive and is tested in Iphone 6,7,8 and ipad and other related devices along with chrome browser
* It is made using the latest version of react and node js 
* The data is stored in localstorage of browser to update the values used in the game
* nodemon is enabled for reloading of the backend node js server
* webpack hot reloading is also configured in webpack config 
* unit test cases are written in mocha for testing
* minifying of the app and assests is handled by webpack config
* using webpack file-loader config to serve the sattic files
* using the favicon for the application

