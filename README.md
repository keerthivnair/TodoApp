# TodoApp
# 📝 Advanced React To-Do Application with API Integration

Welcome to the **Advanced React To-Do Application**! This project was built using **React** and **Redux** to manage tasks efficiently. It features task prioritization, authentication, API integration, and responsive design.

## 🚀 Live Demo
[Click here to view the live demo](YOUR_DEPLOYMENT_URL)

---

## 📸 Screenshots

Add the following screenshots to your `screenshots` folder in the repository:

1. **Landing Page (Login Page)** — Showing the login interface.
2. **To-Do Page** — Displaying tasks with priority indicators and delete buttons.
3. **Add Task** — Demonstrating the task addition process.
4. **Delete Task** — Showcasing task deletion.
5. **Task Prioritization** — With tasks marked as **High**, **Medium**, or **Low**.
6. **API Data Display** — Featuring weather data integration.
7. **Mobile View** — For responsive design demonstration.
8. **Error Handling** — Displaying API error messages.

---

## 📥 Features

- ✅ **User Authentication** — Simulated using Redux.
- ✅ **Task Management** — Add, view, delete, and prioritize tasks.
- ✅ **API Integration** — Displays real-time weather data using an API.
- ✅ **State Management** — Managed using Redux and Redux Thunk.
- ✅ **Responsive Design** — Mobile-first design with Flexbox and Grid.
- ✅ **Persistent Storage** — Uses localStorage to retain data across sessions.

---

## 🛠 Tech Stack

- **Frontend:** React, Vite
- **State Management:** Redux, Redux Thunk
- **Styling:** CSS, Flexbox, Grid
- **API Integration:** Fetch API
- **Authentication:** Redux Mock Authentication
- **Deployment:** Netlify 

---

## ⚙️ Installation and Setup

Follow these steps to set up the application locally:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/advanced-todo-app.git
    cd advanced-todo-app
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure API**
    - Get your API key from [NewsAPI.org](https://newsapi.org/).
    - Create a `.env` file and add the following:
    ```bash
    VITE_API_KEY=21041cd5761745f2a1bb29bbfee4eccf
    ```

4. **Run the Application**
    ```bash
    npm run dev
    ```
    - Open `http://localhost:5173` in your browser.

---

## 🧑‍💻 How to Use

1. **Login**
    - Enter a username and password to simulate login.

2. **Add Task**
    - Enter a task, select a priority (**High**, **Medium**, **Low**), and press **Add**.

3. **View Tasks**
    - See your tasks in a prioritized list.

4. **Delete Task**
    - Remove any task by clicking the delete button.

5. **View Weather**
    - Real-time weather data is displayed using API integration.

6. **Logout**
    - Logout securely using the button at the top.

---

## 🛡️ Error Handling

- Error messages are displayed if the API call fails.
- Form validation ensures tasks cannot be added without content.
- Invalid login attempts are handled gracefully.

---

## 🧪 Project Structure

```bash
src/
│
├
│   
│   
── Login.jsx│   
│── Login.css   
│   
│
├── redux/
│   ├── store.js
│   ├── authSlice.jsx
│── App.css
├── App.jsx
├── main.jsx
└── index.css
