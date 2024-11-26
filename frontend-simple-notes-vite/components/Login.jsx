import { useState } from "react";
import axios from "axios";

function Login(props) {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(userEmail);
        console.log(userPassword);

        axios
            // .post(`http://localhost:7000/checkpassword`, {
            .post("http://localhost:7000/checkpassword", {
                // email: "anurag@gmail.com",
                // password: "password",
                email: userEmail,
                password: userPassword,
            })
            .then((res) => console.log("res: \n", res.data.type)) // 200 ok
            .catch((err) =>
                console.log(
                    "err:\n",
                    err.response.data.type,
                    err.response.data.message
                )
            ); // 401 unauthorised
    };
    return (
        <>
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
                <a
                    className="small-fonts"
                    // onClick={() => alert("Hello there")}
                    // onClick={props.setCurrPage("register")}
                >
                    Create a new account
                </a>
            </div>
        </>
    );
}

export default Login;
