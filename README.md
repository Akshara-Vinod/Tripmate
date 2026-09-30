Build a project using Vite + React

npm create vite@latest travel -- --template react

Remove unwanted elements from the components

Install packages for styling

-> Install Bootstrap and Material UI
-> Add Google Fonts
-> Install React Icons

Project structuring (component creation)

Install React Router DOM to create paths and routing-related actions

Wrap App.jsx with BrowserRouter in main.jsx

Define paths and elements inside routes using Route in App.jsx

Design components and pages

Create login and registration forms using React state

Store logged-in user details using localStorage

Create trips by collecting destination, number of days, budget, travel style, and interests from user inputs

Pass trip details to the Trip Preview component using useLocation and navigation state

Generate personalized day-wise itineraries based on destination activities, user interests, travel style, and budget

Store destination and activity details in a JSON file

Send trip and itinerary details to JSON Server

Create an Axios instance using axios.create() to configure API requests

Create a separate file for configuring API methods

Make HTTP requests using HTTP methods (GET, POST, PUT, DELETE)

Display user trips in the dashboard

View and delete planned trips

Manage travel expenses

-> Add, edit, and delete expenses
-> Calculate total expenses and remaining budget
-> Display expense charts

Design responsive pages using Bootstrap and Material UI

Deploy the project

-> Deploy JSON Server on Render
-> Connect the deployed server to the React application
-> Deploy the React application on Vercel












# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
