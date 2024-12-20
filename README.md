# Reviva - Capture Your Moments

**Reviva** is a unique journaling application designed to help you recognize and reflect on your achievements. By automatically summarizing your daily accomplishments and providing AI-driven feedback, Reviva tracks your emotional trends and offers personalized insights to help you stay motivated.



---



## 🌟 Project Overview

Have you ever felt low even after hitting milestones in your personal or professional life? Have you wondered why that happens? Maybe we forget those accomplishments or feel like they weren’t big enough… or sometimes, there’s no one around to acknowledge them.

What if there was an app that immediately recognizes your achievements, reminds you of them every week, and even tracks your emotional trends with clear analysis?

That’s how the idea of **"Reviva - Capture your moments"** was born! 🌱

The app is simple to use and provides uplifting feedback using the power of AI. Built using the MERN stack, Reviva integrates **Google LLMs** and **Hugging Face Models** to offer feedback and sentiment analysis.



---



## 🚀 Live Demo

You can try out **Reviva** by visiting the live demo link: #https://reviva-t1co.onrender.com

Please note: Since the backend is hosted on **Render**, each request might take 50 seconds or more due to inactivity.


---


## ✨ Main Features

- **Achievement Recognition**: Track your accomplishments and get regular reminders of your progress.
- **Emotional Trend Analysis**: View detailed insights into your emotional patterns over time.
- **AI-driven Journal Summaries & Feedback**: Summarized journals with motivating feedback from AI based on your entries.
- **Weekly Notifications**: Receive weekly emails summarizing your accomplishments and key moments from the week. *(Note: Notification feature is still under development)*


---



## 💻 Tech Stack

- **MongoDB**: Database for storing user journals, emotional data, and feedback.
- **React**: Frontend library for building the user interface.
- **Redux**: State management for handling user data.
- **Express.js**: Backend framework for managing API endpoints.
- **Node.js**: Server-side JavaScript runtime.
- **JWT**: Authentication method to protect user sessions.
- **Google LLMs**: Used for generating journal summaries and feedback.
- **Hugging Face Models**: For sentiment analysis.
- **Vader-Sentiment**: NLP tool to analyze the emotional tone of the journal entries.
- **bcryptjs**: For password hashing and securing user credentials.
- **Nodemon**: To automatically restart the server during development.


---


## 📂 Folder Structure

### Main Repository Structure

- **/frontend**: React application files for the user interface.
- **/backend**: Node.js/Express backend for handling API requests and database operations.

### Frontend Directory

- **src**: Contains the main application source code.
  - **components**: All UI components.
    - **Dashboard**: User's journal overview and statistics.
    - **DetailJournalPage**: View individual journal entries.
    - **Home**: The main journaling page for adding entries.
    - **SignUp**: User registration component.
    - **Stats**: View emotional trends and data visualizations.
    - **Navbar**, **NotFound**, **ProtectedRoute**: Common utility components for navigation and access control.
  - **store**: Redux store configuration for managing state.
  
![image](https://github.com/user-attachments/assets/d2883428-e56a-415d-93cb-3f7bcad05edc)
![image](https://github.com/user-attachments/assets/366d6777-21a5-487a-bd54-9e36016e29be)
![image](https://github.com/user-attachments/assets/4ff95716-6516-4414-b273-2473aa4831eb)



### Backend Directory

- **models**: MongoDB schemas.
  - **JournalModel**: Stores journal entries and related data.
  - **UserModel**: Stores user information and credentials.
- **operations**: Core operations like feedback generation, sentiment analysis, email service, and journal summarization.
  - **getFeedback**, **mailService**, **sentimentAnalyse**, **summarizeJournal**.
- **schemas**: Mongoose schemas for user and journal data models.
- **middleware**: JWT-based authentication and other middleware.
- **index.js**: Entry point for the backend, where all API routes are handled.


---


## ⚙️ Setup Instructions

Follow these steps to clone and set up the project locally:

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/kkr-97/RevivAI_fullstack.git

# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create a .env file in the backend root directory and add the following environment variables:
MONGODB_URI=your_mongodb_connection_string
PORT=your_preferred_port_number
SECRET_KEY=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key

# Start the backend server
npm start


### 2. Frontend Setup
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start the frontend server
npm start
```


---



## 🤝 Contributions

Contributions are always welcome! If you'd like to contribute, feel free to fork the repository, submit a pull request, or suggest any improvements or bug fixes.

---

## 📬 Contact

Feel free to reach out if you have any questions or feedback regarding the project.
