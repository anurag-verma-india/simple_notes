import * as jsonLinks from "../src/links.json";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    getCookie,
    setCookie,
    deleteCookie,
    deleteAllCookies,
} from "../repeated_js_code/cookie_manager";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isError, setIsError] = useState(false);
    // const [userAuthenticated, setUserAuthenticated] = useState(false);
    // const username = getCookie("username")
    // console.log(username)
    // useEffect(console.log(getCookie("username")), []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("userAuthenticated: ", props.userAuthenticated);
        console.log(userEmail);
        console.log(userPassword);

        // Save username to the cookies too
        axios
            // .post(`http://localhost:7000/login`, {
            .post(jsonLinks.loginLink, {
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
                console.log(
                    "authenticated after response: ",
                    res.data.authenticated
                );
                if (res.data.authenticated) {
                    // console.log("User authenticated");
                    props.setUserAuthenticated(true);
                    navigate("/");

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
                // console.log("err full: \n", err);
                if (err.response.data.type == -1) {
                    setIsError(
                        "User is inactive, please contact administrator"
                    );
                }
                if (err.response.data.type == 0) {
                    setIsError(
                        "This is email is not associated with any account"
                    );
                }
                if (err.response.data.type == 1) {
                    setIsError("The password you entered is incorrect");
                }
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
                    {isError && <p style={{ color: "red" }}>{isError}</p>}
                    <button type="submit" name="button">
                        Login
                    </button>
                </form>
                <a
                    className="small-fonts"
                    // href="/forgot-password"
                    onClick={() => navigate("/forgotPassword")}
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
