# React Frontend Documentation

Welcome to the frontend of your application! This project is built with **React** and **Vite**.

## Project Structure

Here is an overview of the key folders and files:

### Root Files
-   **`index.html`**: The entry point of your app. This is the HTML file that loads your React code.
-   **`vite.config.js`**: Configuration file for Vite (the build tool that runs your local server).
-   **`package.json`**: Lists all dependencies (like `react`, `axios`) and scripts to run the project.

### Source Code (`src/`)
All your development work happens inside the `src` folder.

-   **`main.jsx`**: The React entry point. It finds the "root" div in your `index.html` and renders your `App` component into it.
-   **`App.jsx`**: The main component that handles **Routing**. It decides which page to show based on the URL (e.g., `/login` shows the Login page).

#### Directories inside `src/`

-   **`api/`**
    -   `axios.js`: Settings for communicating with your backend (Express). It sets the base URL (e.g., `http://localhost:7000`) and automatically adds your login token to requests.

-   **`context/`**
    -   `AuthContext.jsx`: Manages the "Global State" for authentication. It provides the `user`, `login`, and `logout` functions to any component in your app.

-   **`pages/`**
    -   Top-level views that represent a full screen.
    -   `Login.jsx`: The login form.
    -   `Register.jsx`: The registration form.
    -   `Dashboard.jsx`: The main area where users see their tasks.

-   **`components/`**
    -   Reusable pieces of UI that you can use in multiple pages.
    -   `TaskCard.jsx`: Displays a single task.
    -   `TaskForm.jsx`: The form to create a new task.

## How to Run

1.  Open a terminal in this `front-end` folder.
2.  Install dependencies (only need to do this once):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the link shown (usually `http://localhost:5173`).
