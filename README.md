# postman-test

Repo for video demo of how to use postman api test scripts. The API itself has been stripped down to its most basic functionality for the tests. All the scripts are at the root level of the project. The data is just being stored in memory with a single base set of user and movie objects from the `data.js` file.

## Set up

Once you have downloaded or cloned the repo you need to install the dependencies for the API. We do this using `npm`.

```cli
npm install
```

This command will read the package.json file and install all the required dependencies, such as, `express`, `bcrypt`, and `jsonwebtoken`.

## Launch the Server

To launch the server use this command:

```cli
npm run dev
```

## Routes

### Health Check and APIKey Test

**GET** `http://localhost:3000/`

This base route can be used to check if the API is currently running. If the server is running there should always be a response.

However, it will check for a valid API key too. The value of the key is `MyUniqueApiKey`. It needs to be sent from the client as a value for an `x-api-key` header.

The successful response will be:

```json
{
  "STATUS": "Good to go!"
}
```

A response for an invalid key will be:

```json
{
  "error": {
    "code": 999,
    "message": "Invalid API key"
  }
}
```

This is the only route in the API that looks for this `x-api-key` header.

### Register a user

**POST** `http://localhost:3000/api/users/register`

Body of **request** must be JSON. Sample:

```json
{
  "email": "bubba@goesfast.ca",
  "password": "nascar123"
}
```

### Login and get a token

**POST** `http://localhost:3000/api/users/tokens`

Body of **request** must be JSON. Sample:

```json
{
  "email": "bubba@goesfast.ca",
  "password": "nascar123"
}
```

Valid request will return a JSON string **response** like this sample:

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

Sample **Response**:

```json
{
  "data": [
    {
      "_id": 1587912695511,
      "title": "Alien",
      "year": 1979,
      "owner": 1587912698986
    },
    {
      "_id": 1587921091646,
      "title": "Avatar",
      "year": 2009,
      "owner": 1587912698986
    }
  ]
}
```

### Get a specific movie

No body required. Authorization Bearer token required in the headers. Will get details of specific movie for current user, based on the token.

**GET** `http://localhost:3000/api/movies/:id`

Sample **response**:

```json
{
  "data": {
    "_id": 1587912695511,
    "title": "Alien",
    "year": 1979,
    "owner": 1587912698986
  }
}
```

### Add a new movie

Body must be JSON. Authorization Bearer token required in the headers. Adds a new movie for the current user. User id comes from the token. Sample:

```json
{
  "title": "Some movie name",
  "year": 1999
}
```

**POST** `http://localhost:3000/api/movies`

**Response** will have the same data, plus an \_id property.

```json
{
  "data": {
    "_id": 1587921293849,
    "title": "Avatar",
    "year": 2009
  }
}
```

### Delete a movie

No body required. Authorization Bearer token required in the headers. Movie id will come from the URL. The owner of the movie must match the user id in the token.

**DELETE** `http://localhost:3000/api/movies/:id`

**Response** for the delete will just be the id for the deleted movie

```json
{
  "data": { "_id": 1587921293849 }
}
```

## Error Responses

All the errors from the server should return as valid JSON data. They will have an HTTP status code of 400. They will have the same data structure in the JSON which includes `code` and `message` properties. Sample:

```json
{
  "error": {
    "code": 111,
    "message": "Not gonna do it."
  }
}
```

## Tokens

API uses JSON web tokens to authenticate users. The token must be included as a `Authentication` header in the request with the value set to `Bearer` followed by the token string.

Example header:

```js
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE1ODc5MTI2OTg5ODYsImlhdCI6MTU4NzkyMDIyOH0.E9oDnlXb4Bw6Kr4672BwNdav-51p_qOs58shQWrfkog"
```
