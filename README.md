![License](https://img.shields.io/github/license/mattdow/https://github.com/mattdow/weekend5-movie-sagas.svg?style=for-the-badge) ![Repo Size](https://img.shields.io/github/languages/code-size/mattdow/https://github.com/mattdow/weekend5-movie-sagas.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/mattdow/https://github.com/mattdow/weekend5-movie-sagas.svg?style=for-the-badge) ![FORKS](https://img.shields.io/github/forks/mattdow/https://github.com/mattdow/weekend5-movie-sagas.svg?style=for-the-badge&social) ![Stars](https://img.shields.io/github/stars/mattdow/https://github.com/mattdow/weekend5-movie-sagas.svg?style=for-the-badge)
    
# Weekend Movie Poster Display

## Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contacts](#contacts)

## Description

Duration: weekend project

This application stores and displays a collection of movie data, including the title, a movie poster image, a description, and the genres the movie belongs to from a set list of genres. The application contains a details page, a page where new movies can be added to the collection, and an edit page where the title and description can be altered. 

## Screenshots

<img src="images/screenshot1.png" /> 

## Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a><a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a><a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" /></a><a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a><a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a><a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>


### Prerequisites

- Node.js
- React
- React-Redux
- Redux-Saga
- PostgreSQL
- Material UI

### Installation

1. Create a database called `saga_movies_weekend`
2. The queries in the `database.sql` file are set up to create the necessary tables and populate the required data.
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. In a separate terminal tab/window, open `npm run client`, which will open a new browser tab for you.

## Usage

Upon loading, the user can view the movie cards with the title and movie poster. By clicking on a card, the user will be routed to a details page where they can view all the information in the database about that movie. On the details page, the user can click to return to the movie list, or click on an edit button to enter a new page to revise the title and description information for the movie. On the main navbar is a button to return to the home page movie list and a button to route to the add movie page, where a user can submit movie information which will be added to the database and displayed on all relevant pages.


## Acknowledgements

Thanks to the [Prime Digital Academy](www.primeacademy.io) team who taught me all the tools to make this application a reality.

## Contacts

<a href="https://www.linkedin.com/in/matt-dow-5549161b0"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>  <a href="mailto:matt.dow.vo@gmail.com"><img src=https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/email_me_button_icon_151852.svg /></a>
