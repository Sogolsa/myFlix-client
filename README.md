# "myFlix" React Application

## Description:

Using React, building the client-side for an app called myFlix based on its
existing server-side code (REST API and database).
Users are able to access information about movies so that they can learn more
about movies they've watched or are interested in.
Users are able to create a profile so they can save data about their favorite movies.

## Features:

### Main view

- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

### Single Movie view

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

### Login view

- Allows users to log in with a username and password

### Signup view

- Allows new users to register (username, password, email, date of birth)
  Profile view
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

## Installations:

1. initialized npm with npm init
2. installed the parcel globally: `npm install -g parcel`
3. installed the react and react-dom dependencies: `npm install --save react react-dom`
   installed the prop-type dependency:
   It allows you to specify the types that the components should expect for its props. This helps in catching bugs related to incorrect prop types early in development.
4. Install bootstrap and react-bootstrap: `npm install react-bootstrap bootstrap`
5. Install react-router and react-router-dom: `npm install react-router react-router-dom --save`
6. Install parcel as a local developer dependency: `npm install --save-dev parcel@2.12.0`

### Instruct parcel to build the project

parcel `src/index.html`: For parcel to begin crawling through project, starting and index.html.

## Hosted On:

https://movieapp-bysogol.netlify.app/login
