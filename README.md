# Adyen Front end challenge
This is my example code for the Adyen front end challenge

## Project setup
 1) Clone the repo
 2) Install dependencies
To install the npm dependencies run command at the root
```
npm install
```
 3) Set up .env file with the correct environment variables (see below)

### Api Keys
This app uses google maps and foursquare Api - it therefore requires a google maps api Key and a foursquare id and secret.

For security reasons these are not stored in the repo

To set this up complete the following steps

 1) Create a '.env' file at the root level of the repo
 2) Add the following lines
```
CLIENT_ID=*INSERT YOUR ID HERE*
CLIENT_SECRET=*INSERT YOUR SECRET HERE*
API_VERSION=*INSERT YOUR API VERSION HERE*
VUE_APP_GOOGLE_API_KEY=*INSERT YOUR API KEY HERE*
```

(If you are recieving this at Adyen, I will have emailed over a copy of the .env file for you to use)

## To Run
After going through project setup, to build and serve the front end run
```
npm run serve
```

To run the back end, in a seperate terminal run
```
npm run start-server
```

Then proceed to http://localhost:8080/ to view the site (or whatever address and port the front end service is using)

You need both the front end running and the back end mini service for everything to work properly.


### Lints and fixes files
```
npm run lint
```
