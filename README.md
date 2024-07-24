# Manage-Events-Typescript-Koa

by [Yasmine Alaa]

## Introduction

This project is a simple RESTful API Template built using NodeJS, KOA, Typescript and TypeORM as an ORM for MongoDB. Middleware uses JWT.   

### What it has
- Node.js
- NPM
- Typescript
- KOA Framework v2
- Mongoose

### Available endpoints in this template

- Available routes in this template are:
- `GET /` - index route
- `POST /login` - login (returns the access token to access protected routes)
- `POST /register` - register (returns the access token and sucsess message)
- `GET /users/:token` - a route to get the auth user
- `GET /events` - get all events
- `POST /events` - create a new event
- `GET /events/:id` - fetch an event
- `PUT /events/:id` - update an event
- `DELETE /events/:id` - delete an event
- `GET /events/:tag` - fetct event tags
- `GET /tags` - get all tags
- `POST /tags` - create new tags
- `POST /comments` - create new comment
- `PUT /comments/:id` - update comment
- `DELETE /comments/:id` - delete a comment

- From these you can use the structure to build out other routes, controllers, services and entities.


## Setup

### Requirements
- Node.js 
- npm version >= 10

### Setup
- install dependencies:
  npm install
- setup the `.env` file. Edit the environment variables inside accordingly:
  
### Start
- for deployment on local host:
  npm start
  
## Design

### Project File Structure
- Src folder
  -- Controllers Folder
    --- authController : contains login and register methods
    --- eventsController: contains the crud operation for events
    --- tagsController: contains the crud operation for tags
    --- commentsController: contains the crud operation for comments
 -- Utils /Auth folder
  Contains general methods  for create and compare token 
-- Models folder
  Contains schema for Event, Tag, Comment, User
-- Middleware folder
  Contains the logic that filters the http requests, to ensure user authentication.
-- routes.ts 
 contains all routes
-- server.ts 
The entry point for the server	





  
