Step 1- Clone the repository
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>

Step 2- Install dependencies
npm install

Step 3- Set up environment variables

PORT=8000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret

Step 4- Start the server
npm start

Endpoints
-POST /register: Register a new user.
example req.body-
{
    "name": "Abhi",
    "email": "abc@gmail.com",
    "password": "xyz12"
}

-GET /login: Log in and get a JWT token.
example req.body-
{
    "email": "abc@gmail.com",
    "password": "abc12"

}

-POST /reset-password: Reset the user's password
example req.body-
{
    "email": "abc@gmail.com",
    "newPassword": "abc12"
}


Notes
-Make sure to update your MongoDB URI and JWT secret in the .env file.
-You can test the endpoints using Postman or any other API testing tool.
-The reset-password endpoint does not require authentication.
