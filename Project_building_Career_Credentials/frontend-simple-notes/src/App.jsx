import axios from "axios";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import "../components/NotesPage.css";
import { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "../repeated_js_code/cookie_manager";
import Login from "../components/Login";
import NotesPage from "../components/NotesPage";
import EditProfile from "../components/EditProfile";
import Register from "../components/Register";
import Home from "../components/Home";
import ForgotPassword from "../components/ForgotPassword";

axios.defaults.withCredentials = true;

function App() {
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    // const [currPage, setCurrPage] = useState("login");

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Home
                    userAuthenticated={userAuthenticated}
                    setUserAuthenticated={setUserAuthenticated}
                />
            ),
        },
        {
            path: "/login",
            element: (
                <Home
                    userAuthenticated={userAuthenticated}
                    setUserAuthenticated={setUserAuthenticated}
                />
            ),
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/edit",
            element: (
                <EditProfile
                    userAuthenticated={userAuthenticated}
                    setUserAuthenticated={setUserAuthenticated}
                />
            ),
        },
        {
            path: "/notes",
            element: <NotesPage />,
        },
        {
            path: "/forgotPassword",
            element: <ForgotPassword />,
        },
    ]);

    // Check if user is already authenticated by checking cookies
    useEffect(() => {
        if (getCookie("username") !== null) setUserAuthenticated(true);
    }, []);
    // login register notes edit
    return (
        <>
            <RouterProvider router={router} />
            {/* {userAuthenticated && currPage === "login" && (
                <Login
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                    userAuthenticated={userAuthenticated}
                    setUserAuthenticated={setUserAuthenticated}
                />
            )} */}
            {/* <DefaultScreen
                userAuthenticated={userAuthenticated}
                setUserAuthenticated={setUserAuthenticated}
            /> */}
            {/* {currPage == "register" && <Register />} */}
            {/* <EditProfile /> */}
            {/* {currPage === "notes" && <NotesPage />} */}
        </>
    );
}

// function DefaultScreen(props) {
//     if (props.userAuthenticated) {
//         return <NotesPage />;
//     } else {
//         return (
//             <Login
//                 setUserAuthenticated={props.setUserAuthenticated}
//                 userAuthenticated={props.userAuthenticated}
//             />
//         );
//     }
// }

export default App;
