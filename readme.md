#Agility notebook API
[https://github.com/ymhr/agility-notebook-app](https://github.com/ymhr/agility-notebook-app)

This is the backend for the Agility Notebook app.
It's designed to be run with node and MYSQL.

Required a `.env` file to run, which must contain the following config:
```
DEV=true/false
CLIENT_URL=http://localhost:8080
SERVER_URL=http://localhost:3000
JWT_SECRET=secretForJwt
MYSQL_USERNAME=username
MYSQL_PASSWORD=password
MYSQL_DATABASE=dbTable
MYSQL_HOST=hostIP
FACEBOOK_CLIENT_ID=facebookClientId
FACEBOOK_CLIENT_SECRET=facebookClientSecret
```
