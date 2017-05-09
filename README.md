# [Snyppr](https://github.com/hrla14-snippr/snippr)

Snyppr is a fullstack web applicaiton for getting on demand hair cuts. If you're the type of person that needs a hair cut, but hates having to schedule, travel, and wait to get a haircut, Snyppr has you covered. Just load up the app, find a barber that's within 20 miles of your location, and then schedule a Snyp.

## Table of contents

- Quick start
- What's included
- Bugs, feature requests, and contributing
- Creators

## Quick start

- Fork a copy of the repo and then clone the repo locally to your computer by forking via the Github GUI, and then entering the following command into the Terminal: `$ git clone https://github.com/[your_username_here]/snippr`
- Make sure you have [npm](https://www.npmjs.com) installed.
- Once npm is installed, run the following commands in separate Terminal tabs:
  - `$ npm install` to install the npm dependencies in the `package.json` file. 
  - If you need seed/dummy data in your database, run `$ npm run seed`.
- Make sure you have an [ElephantSQL](https://www.elephantsql.com/) account.
- Set a `PORT` and add your ElephantSQL url as `ESQL_URL` in your .env file.
  - If you want to work off a database on your local machine, change the options in the Sequelize constructor as needed, located in `server/models/db.js`.

- Run `$ npm start` and navigate to [http://localhost:[YOUR_PORT]/](http://localhost:[YOUR_PORT]/) on your favorite web browser to be directed to the login page.
  - On the landing page to Snyppr, you'll have the option of either signing up as a Snyppr (a barber) or as a Snypee (a client that's looking for a haircut).

### APIs You Will Need
- Make an account and replace the public keys in the code with yours
  - Auth0
  - Stripe
  - Google Maps Geocoding and Places APIs

## Deploying
- Deploy to aws and add the following keys to your .env file with these variable names: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
  - Or your choice of hosting service and replace the aforementioned variables in the code.

## Technologies Used
- ElephantSQL (PostgreSQL)
  - Sequelize ORM
- Express
- React
- Node
- Auth0
- GoogleMaps Geocoding and Places API
- Stripe
- Amazon Web Services
  - S3 for image storage

## Current Snyppr issues

- Here are some bugs we are aware of:
  - If Snyppr signup is interrupted before you can make a Stripe account, you can't use that account because of the current routing logic.
  - Everytime you login after account creation, the page will hang on the `/newUser` endpoint (profile collection page). You have to refresh to get past it. 
  - Any post to the database does not trigger a rerender and will not be reflected in the UI until you refresh.
  - Sockets sent payment request to all connected channels instead of just one channel.

## Creators

**Mariano Okpalefe, Product Owner**
[https://github.com/Chimpytheape](https://github.com/Chimpytheape)

**Kevin Liu, Scrum Master**
[https://github.com/kevinliu6102](https://github.com/kevinliu6102)

**Ebrima Jobe**
[https://github.com/enjsmoove](https://github.com/enjsmoove)

**Jaime Mendoza**
[https://github.com/jaimemendozadev](https://github.com/jaimemendozadev)