# postman-test

Repo for video demo of how to use postman api test scripts

To launch the server use this command:

```sh
npm rum dev
```

## Routes

### Register a user

**POST** `http://localhost:3000/api/users/register`

Body of request must be JSON. Sample:

```json
{
  "email": "bubba@goesfast.ca",
  "password": "nascar123"
}
```

### Login and get a token

**POST** `http://localhost:3000/api/users/tokens`

Body of request must be JSON. Sample:

```json
{
  "email": "bubba@goesfast.ca",
  "password": "nascar123"
}
```

Valid request will return a JSON string like this sample:

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE1ODc5MTI2OTg5ODYsImlhdCI6MTU4NzkyMDIyOH0.E9oDnlXb4Bw6Kr4672BwNdav-51p_qOs58shQWrfkog"
  }
}
```

### Get list of all movies

No body required. Authorization Bearer token required in the headers. Will return list of all movies for the current user based on the id in the signed token.

**GET** `http://localhost:3000/api/movies`

### Get a specific movie

No body required. Authorization Bearer token required in the headers. Will get details of specific movie for current user, based on the token.

**GET** `http://localhost:3000/api/movies/:id`

### Add a new movie

Body must be JSON. Authorization Bearer token required in the headers. Adds a new movie for the current user. User id comes from the token. Sample:

```json
{
  "title": "Some movie name",
  "year": 1999
}
```

**POST** `http://localhost:3000/api/movies`

### Delete a movie

No body required. Authorization Bearer token required in the headers. Movie id will come from the URL. The owner of the movie must match the user id in the token.

**DELETE** `http://localhost:3000/api/movies/:id`

## Tokens

API uses JSON web tokens to authenticate users. The token must be included as a `Authentication` header in the request with the value set to `Bearer` followed by the token string.

Example header:

```js
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE1ODc5MTI2OTg5ODYsImlhdCI6MTU4NzkyMDIyOH0.E9oDnlXb4Bw6Kr4672BwNdav-51p_qOs58shQWrfkog"
```
