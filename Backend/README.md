# User Registration API Documentation

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their details. It validates the input data, hashes the password, creates a new user in the database, and returns an authentication token.

## Request Body

- `email`: (string) The email address of the user. It must be a valid email format.
- `fullname`: (object) An object containing:
  - `firstname`: (string) The first name of the user. It must be at least 3 characters long.
  - `lastname`: (string) The last name of the user. It must be at least 3 characters long if provided.
- `password`: (string) The password for the user account. It must be at least 6 characters long.

### Example Request
```json
{
    "email": "user@example.com",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "password": "securepassword"
}
```

## Response
### Success Response
- **Status Code**: 201 Created
- **Content**: 
```json
{
    "token": "JWT_TOKEN_HERE",
    "user": {
        "_id": "USER_ID_HERE",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "user@example.com"
    }
}
```

### Error Responses
- **Status Code**: 400 Bad Request
  - **Content**: 
  ```json
  {
      "errors": [
          {
              "msg": "Invalid Email",
              "param": "email"
          },
          {
              "msg": "first name must be atleast 3 character long",
              "param": "fullname.firstname"
          },
          {
              "msg": "password must be atleast 6 character long",
              "param": "password"
          }
      ]
  }
  ```

## Status Codes
- **201 Created**: The user has been successfully registered.
- **400 Bad Request**: The request data is invalid or missing required fields. The response will include details about the validation errors.




## Endpoint
`POST /users/login`

Request Body (JSON)
- email (string, required) — must be a valid email.
- password (string, required) — minimum 6 characters.

Example request
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Success Response
- Status: 200 OK
- Body:
```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

Error Responses
- 400 Bad Request — validation failed. Example:
```json
{
  "errors": [
    { "msg": "invalid email", "param": "email" },
    { "msg": "password must be atleast 6 character long", "param": "password" }
  ]
}
```
- 401 Unauthorized — invalid credentials. Example:
```json
{ "message": "invalid email or password" }
```



## `/users/profile` Endpoint

### Description

checks if the token is isBlacklisted and decodes the token and finds the user in the database by _id and set it to req.user

### HTTP Method
`GET`

### Authentication
Requires a valid JWT token in the Authorization header or cookie;



## `/users/logout` Endpoint
### Description
Logout the current user and blacklist the token provided in the cookie or headers
### HTTP Method
`GET`
### Authentication
Requires a valid JWT token in the Authorization header or cookie;



## CAPTAIN

## `/captains/register` Endpoint

### Description

Registers a new captain account with the provided information

### HTTP Method
`POST`

### Request Body

Ther the request body should be in json format and should include

-`fullname`(object):
  -`firstname` (string,required);
  -`lastname` (string);
-`email` (string,required);
-`password` (string,required);
-`vehicle` (object):
  -`color` (string,required);
  -`plate` (string,required);
  -`capacity` (number,required);
  -`vehicleType` (string,required);


### example response

`captain`: {
        `fullname`: {
            `firstname`: "first name",
            `lastname`: "lastname"
        },
        `email`: "mail@gmail.com",
        `password`: hashed password,
        `status`: "inactive",
        `vehicle`: {
            `color`: "color",
            `plate`: "plate",
            `capacity`: 1,
            `vehicleType`:"motorcycle"
        },
    }


## `/captains/login` Endpoint

## method
`POST`

## description
logs in a captain via email and password

## request body
email : example@gmail.com
password : *****

## example response

`captain`: {
        "fullname": {
            "firstname": "ved",
            "lastname": "mahato"
        },
        "vehicle": {
            "color": "red",
            "plate": "jh05ab1234",
            "capacity": 2,
            "vehicleType": "motorcycle"
        },
        "_id": "#####",
        "email": "example@gmail.com",
        "password": hashed_password,
        "status": "inactive",
    },


## `/captains/profile` Endpoint

## method
`GET`

## description
shows the profile of the captain

## example response

`captain`: {
        "fullname": {
            "firstname": "ved",
            "lastname": "mahato"
        },
        "vehicle": {
            "color": "red",
            "plate": "jh05ab1234",
            "capacity": 2,
            "vehicleType": "motorcycle"
        },
        "_id": "#####",
        "email": "example@gmail.com",
        "password": hashed_password,
        "status": "inactive",
    },


## `/captains/logout` Endpoint

## method
`GET`

## description
logs out the captain and adds him to trhe blacklisted database.






