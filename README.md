## **RealTime Chat  Application : HireQuotient**
PAVAN KUMAR PATCHIKARLA 

---

### Overview

This messaging application provides users with a platform to communicate in real-time, enabling text and multimedia messaging, and seamless user authentication. With a user-friendly interface and robust functionality, users can easily start conversations, manage contacts.

### Features

- **User Authentication:** Secure user registration and authentication system. with JWT.
- **Conversation Management:** View ongoing conversations, start new conversations.
- **Messaging Functionality:** Send and receive text messages, images, videos, files.
- **Real-time Communication:** Instant message delivery and updates using SocketIo websocket  integration.
- **User Profile:** View user profile details and status.


### Architecture

![chatApp](sch.png)

- **Frontend:** Built with React.js,Context API for state management, and WebSocket integration(Socket.io) for real-time communication.
- **Backend:** RESTful API with Node.js, Express.js, MongoDB for database management, and JWT for authentication.
- **Real-time Communication:** WebSocket server using Socket.IO for instant messaging updates.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/P-1000/hirequotient-assignment.git
   ```

2. Install dependencies:
   ```
   npm install
   ```


3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary environment variables for the backend (e.g., database connection string, JWT secret and Google gemini api key and also imagekit api keys and secret keys).
    - i have added a sample .env file in the root directory for reference.

4. Start the backend server:
    ```
    cd backend 
    ```
    ```
    npm start
    ```
    ```
    - Server will start at http://localhost:3000
    ```
    ```

5. Start the frontend server:
    ```
    cd frontend/DialougeBox
    ```
    ```
    npm run dev
    ```
    ```
    - Server will start at http://localhost:5173
    ```
    ```
    - Open http://localhost:5173 in your browser.
    ```

### API Endpoints
    ## here is the link to the postman documentation of the api endpoints : You can fork them and test them in your local machine.
    [API Documentation](https://www.postman.com/cloudy-escape-232552/workspace/hirequotient-assignment/overview)
    https://www.postman.com/cloudy-escape-232552/workspace/hirequotient-assignment/overview
#   h i r e q u o t i e n t _ a s s i g n m e n t  
 