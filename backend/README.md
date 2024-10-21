# Reviva Backend

This is the backend part of the "Reviva - Capture Your Moments" app, built using Node.js, Express, and MongoDB.

## Features
- **User Authentication**: JWT-based authentication system.
- **Journal Management**: Stores user journals and emotional trends.
- **AI Integration**: Generates summaries and feedback using AI models.
- **Weekly Emails**: Sends a weekly email to users about their logged moments.

## Tech Stack
- **MongoDB & Mongoose**: For database management.
- **Express**: Backend framework.
- **JWT & bcryptjs**: For authentication and password hashing.

## Environment Variables
Create a `.env` file in the backend directory with the following:

```plaintext
MONGODB_URI=your_mongodb_connection_string
PORT=your_preferred_port_number
SECRET_KEY=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```
