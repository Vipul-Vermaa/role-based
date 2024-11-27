# Role-Based Application.

## Overview

The goal of this application is to assess the understanding and implementation skills regarding Authentication, Authorization, and Role-Based Access Control (RBAC)..


## Technologies Used

1. Backend: Node.js, Express.js
2. Database: MongoDB
3. Authentication: JWT
4. Validation: Zod

## Prerequisites

Before setting up the application, ensure you have the following installed:

1. Node.js (Version 14 or higher)
2. MongoDB (Local or Cloud instance)

## Installation

1. Clone the Repository:

```bash
git clone https://github.com/Vipul-Vermaa/role-based.git
cd role-based
```
2. Install Dependencies:
```bash
npm install
```
3. Set Up Environment Variables:
```bash
MONGO_URI=YOUR_MONGO_URI
PORT=4000
JWT_SECRET=YOUR_JWT_SECRET
```


## Running the Application
1. Start the Server:
```bash
npm start
```
The server will start on port 4000 by default. You can change the port by modifying the PORT variable in your .env file,which has to be made in root directory.

2. Verify the Server:

Open your browser or API client and navigate to http://localhost:4000. You should see a response indicating that the server is running.

## API Endpoints
### Authentication
- Register: POST /api/v1/register
- Login: POST /api/v1/login
- Logout: GET /api/v1/logout
### Post Management
- Create Post: POST /api/v1/createpost (Admin, Moderator)
- Update Post: PATCH /api/v1/updatepost/:id (Admin, Moderator)
- Delete Post: DELETE /api/v1/deletepost/:id (Admin, Moderator)
- Get All Posts: GET /api/v1/getposts
### User Management
- Delete User: DELETE /api/v1/deleteuser/:id (Admin)
- Modify User Role: POST /api/v1/modify/:id (Admin)
