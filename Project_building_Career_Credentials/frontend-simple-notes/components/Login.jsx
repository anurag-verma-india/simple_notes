import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    getCookie,
    setCookie,
    deleteCookie,
    deletAllCookies,
} from "../repeated_js_code/cookie_manager";
import { Link } from "react-router-dom";

function Login(props) {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    // const [userAuthenticated, setUserAuthenticated] = useState(false);
    // const username = getCookie("username")
    // console.log(username)
    // useEffect(console.log(getCookie("username")), []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(userEmail);
        console.log(userPassword);

        // Save username to the cookies too
        axios
            .post(`http://localhost:7000/login`, {
                email: userEmail,
                password: userPassword,
            })
            .then((res) => {
                // console.log("res: \n", res.data.type, res.data.message); // 200 ok
                // console.log(res);
                for (const [key, value] of Object.entries(res.data.user)) {
                    // console.log(`${key}: ${value}`);
                    setCookie(key, value, 365);
                }

                if (res.data.authenticated) {
                    // console.log("User authenticated");
                    props.setUserAuthenticated(true);
                    // props.setCurrPage("notes");
                }
                // console.log(res.data.user);
                // console.log("res full: \n", res);
            })
            .catch((err) => {
                console.log(
                    "err:\n",
                    err.response.data.type,
                    err.response.data.message
                );
                console.log("err full: \n", err);
            });
        // window.location.reload();
    };
    return (
        <div id="center-card-container">
            <div id="center-card">
                <h1 id="main-title">Log in to your account</h1>
                <form id="main-form" method="post" onSubmit={handleFormSubmit}>
                    <label
                        htmlFor="email" // Browser will put focus on input box with this id i.e. "email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        onChange={(e) => {
                            setUserEmail(e.target.value);
                            // console.log(e.target.value);
                            // console.log(userEmail);
                        }}
                        value={userEmail}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="!@#@jcdioasDJ"
                        onChange={(e) => {
                            setUserPassword(e.target.value);
                            // console.log(e.target.value)
                            // console.log(userPassword);
                        }}
                        value={userPassword}
                    />
                    <button type="submit" name="button">
                        Login
                    </button>
                </form>
                <a
                    className="small-fonts"
                    target="_blank"
                    // href="/forgot-password"
                >
                    Forgot Password?
                </a>
                <Link to="/register">
                    <p
                        className="small-fonts"
                        // onClick={() => alert("Hello there")}
                        // onClick={props.setCurrPage("register")}
                    >
                        Create a new account
                    </p>
                </Link>
                {/* <button onClick={deletAllCookies}>Delete all cookies</button> */}
            </div>
        </div>
    );
}

export default Login;
