# Introduction

This project is a api service for creating blogs

## Setup

### Requirements

- Node v23.5.0
- Docker 27.3.1

### Running Locally

- Clone the repository
- create a `.env` file at the root of directory
  - env file format is specified in `.env.example`
- Switch to repository and run docker compose up
- Server will be running at `http://localhost:4000/`
- To check is server is running visit `http://localhost:4000/api/health`
- To seed database `npm run seed`
- Optional
  - If nvm is installed, run `nvm use` to switch node version
  - To check database(node version must be 23), run `npm run studio`, visit `http://local.drizzle.studio`

## Features

- User Authentication
  - User can register and login
  - Access token and refresh token are generated for authentication
  - Password is hashed using bcrypt
- Blogs
  - User can create blogs
  - Blog can be retrieve by its id
  - All blogs created by user can be retrieved
- Images
  - User can upload a feature image for created blog
  - User can update the created blog
  - User can delete the image of a blog
- User Profile
  - User can retrieve their information
  - User can update their profile information

## API Routes

- User Authentication

  - `POST: /api/users/register`

    - Schema

      ```json
      {
        "username": "username",
        "password": "password",
        "email": "email",
        "fullName": "fullName"
      }
      ```

  - `POST: /api/users/login`

    - Schema

      ```json
      {
        "username": "username",
        "password": "password"
      }
      ```

- Blogs

  - `POST: /api/posts/:id`

    - Retrieves the post of user extracted from JWT token with the id from params

  - `POST: /api/posts/`

    - Schema

    ```json
    {
      "title": "blog title",
      "content": "blog content"
    }


    // User id retrieved from the passed JWT token
    ```

  - `GET: /api/posts/`
    - Retrieves all the post of user extracted from JWT token

- Image

  - `POST: /api/posts/:postId/image`

    - Set the image for the post id retrieved from the params
    - If there is already an image for the post it replace the
      older image with new one

  - `GET: /api/posts/:postId/image`
    - Get the image for the post id specified in params

- User Profile

  - `GET: /api/users/profile`

    - Retrieves the user information for the user extracted from JWT token

  - `PATCH: /api/users/profile`
    - Update the user information for the user extracted from JWT token
    - Schema is optional for all the field specified during registration

## Tests

- Run test using command
  `npm run test`
