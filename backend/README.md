# MikroTik Panel Back-End

## Routes

| Route                                     | Method | Description   |
| ----------------------------------------- | ------ | ------------- |
| [/auth](#auth)                            | ---    | ---           |
| [/auth/sign-up](#authsign-up)             | POST   | Sign Up       |
| [/auth/sign-in](#authsign-in)             | POST   | Sign In       |
| [/auth/sign-out](#authsign-out)           | POST   | Sign Out      |
| [/auth/refresh-token](#authrefresh-token) | POST   | Refresh Token |

### /auth

```http
@url=http://localhost:4000
@random={{$randomInt 1000 9999}}
```

#### /auth/sign-up

- firstName: First name must be between 2 and 50 character
- lastName: Last name must be between 2 and 50 characters
- username: Username must be between 3 and 50 characters
- email:
- phoneNumber:
- password: Password must be between 8 and 50 characters. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.

```http
POST {{url}}/auth/sign-up HTTP/1.1
Content-Type: application/json

{
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe{{random}}",
    "email": "johndoe{{random}}@mail.com",
    "phoneNumber": "543956{{random}}",
    "password": "Password{{random}}*!"
}
```

#### /auth/sign-in

- username:
- password: Password must be between 8 and 50 characters. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.

```http
POST {{url}}/auth/sign-in HTTP/1.1
Content-Type: application/json

{
    "username": "{{signUp.request.body.email}}",
    "password": "{{signUp.request.body.password}}"
}
```

#### /auth/sign-out

- Authorization: Bearer [ACCESS_TOKEN]

```http
POST {{url}}/auth/sign-out HTTP/1.1
Authorization: Bearer {{signInLastRegisteredUser.response.body.response.tokens.accessToken.token}}
```

#### /auth/refresh-token

- x-refresh-token: [REFRESH_TOKEN]

```http
POST {{url}}/auth/refresh-token HTTP/1.1
x-refresh-token: {{signInLastRegisteredUser.response.body.response.tokens.refreshToken.token}}
# x-refresh-token: {{refreshToken.response.body.response.refreshToken.token}}
```
