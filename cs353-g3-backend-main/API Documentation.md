## user

### signup

The signup is  a two-step process.

The first step is input some signup data, for example: username, password, and email.

After calling the send code API, the email should recieve a mail with 4-digit random code.

Then write correct verification code and calling the signup API. If verification passed, success, or fail.

- send code
  - request url: http://35.242.171.236:8000/user/code/
  - request method: GET

- apply for signup
  - request url: http://35.242.171.236:8000/user/signup/
  - request method: POST



### login

Output the correct username and password to log in, and a token will be returned as the identity of the subsequent API。、



