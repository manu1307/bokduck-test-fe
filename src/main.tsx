import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/signup/SignUp.tsx";
import RootSU from "./pages/signup/RootSU.tsx";
import Verify from "./pages/signup/Verify.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <RootSU />,
    children: [
      { path: "/signup/info", element: <SignUp /> },
      { path: "/signup/phone", element: <Verify /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
