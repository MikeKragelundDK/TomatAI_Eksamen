
# Project Overview

This repository highlights my skills in full-stack development, machine learning, and API design. It is not intended to be run, as all environment variables and sensitive data have been removed. This project is designed to serve as a demonstration piece, showcasing the structure and implementation of a full-stack application. The purpose of this repository is strictly for inclusion in my CV.

## Project Structure

The project is split into four main parts:

1. **`LoadAndTraining.py`**

   - Loads the dataset and preprocesses all images to match size and format.
   - Trains a Convolutional Neural Network (CNN) and saves the trained model.

2. **`FlaskApp.py`**

   - A Flask application that hosts a `/predict` endpoint for POST requests.
   - Uses the trained model from `LoadAndTraining.py` to make predictions.

3. **Frontend**

   - Contains the React-based user interface for the project, located in the `MLTOMAT2` folder.

4. **API**

   - Manages backend functionality and database interactions, located in the `api` folder. The API leverages Express as its primary framework and uses an ORM for database modeling and interactions.


### Frontend (`MLTOMAT2`)

This folder contains the React frontend for the project.

- **Key Files and Folders**:
  - **`App.js`**: The main entry point for the React application, defining the overall structure and routing.

  - **`index.js`**: The root file responsible for rendering the React app into the DOM.

  - **`index.css`**: Contains global styling for the application.

  - **`src/components`**:

    - **`Analysis`**: Components related to displaying or managing analyses.
    - **`layout`**: Shared layout components like headers, footers, or navigation bars.
    - **`ui`**: Reusable UI components, such as buttons or modals.

  - **`src/pages`**:

    - **`AllAnalysis.js`**: Displays all analyses associated with a user.
    - **`Favorites.js`**: Displays the user's favorite analyses.
    - **`Login`**: Contains components for user login functionality.
    - **`NewAnalysis.js`**: Provides a form for creating a new analysis.
    - **`Register`**: Handles user registration.

  - **`src/services`**:

    - **`analysis.js`**: Includes functions for creating, fetching, and managing analyses via API calls.
    - **`auth.js`**: Handles user authentication-related requests, such as login and registration.


### API (`api`)

This folder contains backend logic, API endpoints, and middleware.

- **Key Details**:
  - **Database Connection**: Connects to a PostgreSQL database (no longer functional).
  - **Models**:
    - `users`: Contains a username and an encrypted password.
    - `analysis`: Contains a title, description, prediction, imgpath, and userID. An analysis belongs to one user, but a user can have multiple analyses. An ORM is used to manage these relationships.
  - **Seed Folder**: Contains scripts to seed the database with dummy data.
  - **Middleware**:
    - Handles user authentication using cookies for token-based authentication.
  - **Controllers**:
    - `auth`: Manages user registration and login, issuing a token/cookie upon successful login.
    - `analyze`: Handles analysis-related operations, including creating a new analysis (POST) or fetching all analyses for a user (GET).
  - **Routes**:
    - `auth`: Interfaces with the auth controller for user authentication operations.
    - `analyze`: Interfaces with the analyze controller for managing analyses via POST and GET requests.
  - **Config File**: Currently contains dummy data for configuration.
  - **`server.js`**:
    - Manages server setup and route mounting using Express, including middleware such as `cors` for cross-origin resource sharing and `dotenv` for environment variable management.
    - Integrates with Google Cloud Storage for image uploads using `multer`.
    - Hosts endpoints for health checks, user authentication, and analysis operations.


## Notes

1. **Environment Variables**:
   All sensitive data and environment variables have been removed for security purposes, such as database credentials or API keys, ensuring the project's integrity and confidentiality.

2. **Purpose**:
   This project is presented as part of my portfolio. It is not configured to be run directly and serves solely as a demonstration of my previous work.


## Technologies Used

- **Frontend**: React (based on `package.json` and folder structure).
- **Backend**: Flask for the Python components and Node.js for the API.
- **Machine Learning**: Python libraries used for training models, including Keras (TensorFlow) for model creation, and sklearn for test splitting and visualization (confusion matrix) (details in `LoadAndTraining.py`).
- **Database**: PostgreSQL with ORM for model management.


## Usage

This repository is read-only and is not intended for live deployment or execution. It provides insights into the structure and implementation of a full-stack application, machine learning workflows, and API development.
