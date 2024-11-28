import * as jsonLinks from "../src/links.json";
import axios from "axios";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
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
import ForgotPassword from "../components/ForgotPassword";
import AlreadyLoggedIn from "../components/AlreadyLoggedIn";
import { SilentLogOutFunc } from "../repeated_js_code/LogOutFunc";

axios.defaults.withCredentials = true;

function App() {
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    // useEffect(() => {
    // }, []);
    // const [currPage, setCurrPage] = useState("login");

    // const router = createBrowserRouter([
    //     // {
    //     //     path: "/register",
    //     //     element: (
    //     //         <Register
    //     //             userAuthenticated={userAuthenticated}
    //     //             setUserAuthenticated={setUserAuthenticated}
    //     //         />
    //     //     ),
    //     // },
    //     {
    //         path: "/edit",
    //         element: (
    //             <EditProfile
    //                 userAuthenticated={userAuthenticated}
    //                 setUserAuthenticated={setUserAuthenticated}
    //             />
    //         ),
    //     },
    //     {
    //         path: "/notes",
    //         element: (
    //             <NotesPage
    //                 userAuthenticated={userAuthenticated}
    //                 setUserAuthenticated={setUserAuthenticated}
    //             />
    //         ),
    //     },
    //     {
    //         path: "/forgotPassword",
    //         element: (
    //             <ForgotPassword
    //                 userAuthenticated={userAuthenticated}
    //                 setUserAuthenticated={setUserAuthenticated}
    //             />
    //         ),
    //     },
    // ]);

    // Check if user is already authenticated by checking cookies
    useEffect(() => {
        if (getCookie("username") !== null) setUserAuthenticated(true);
    }, []);

    // Check if session is valid on server side too
    axios
        // .post(`http://localhost:7000/getSessionDetails`, {})
        .post(jsonLinks.getSessionDetails, {})
        .then((res) => {
            console.log("response: ", res);
        })
        .catch((err) => {
            console.log("err full: \n", err);
            if (err.response.data.type === 0) {
                SilentLogOutFunc(props);
                alert(
                    "Some error occurred on our servers\nSo you were logged out"
                );
            }
        });

    // login register notes edit
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/forgotPassword"
                        element={
                            <ForgotPassword
                                userAuthenticated={userAuthenticated}
                                setUserAuthenticated={setUserAuthenticated}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !userAuthenticated ? (
                                <Login
                                    userAuthenticated={userAuthenticated}
                                    setUserAuthenticated={setUserAuthenticated}
                                />
                            ) : (
                                // <Navigate to="/alreadyLoggedIn" />
                                <Navigate to="/notes" />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !userAuthenticated ? (
                                <Register
                                    userAuthenticated={userAuthenticated}
                                    setUserAuthenticated={setUserAuthenticated}
                                />
                            ) : (
                                <Navigate to="/notes" />
                            )
                        }
                    />

                    <Route
                        path="/"
                        element={
                            userAuthenticated ? (
                                <Navigate to="/notes" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/notes"
                        element={
                            userAuthenticated ? (
                                <NotesPage
                                    userAuthenticated={userAuthenticated}
                                    setUserAuthenticated={setUserAuthenticated}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/edit"
                        element={
                            // <EditProfile />

                            userAuthenticated ? (
                                <EditProfile
                                    userAuthenticated={userAuthenticated}
                                    setUserAuthenticated={setUserAuthenticated}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    {/* <Route
                        path="/alreadyLoggedIn"
                        element={
                            userAuthenticated ? (
                                <AlreadyLoggedIn
                                    userAuthenticated={userAuthenticated}
                                    setUserAuthenticated={setUserAuthenticated}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    /> */}
                </Routes>
            </BrowserRouter>
            {/* <RouterProvider router={router} /> */}

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
