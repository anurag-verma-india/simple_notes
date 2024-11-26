// Incomplete Component

import { useState } from "react";
import "./Register.css";

function Register() {
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (inputs.password !== inputs.confirmPassword) {
            setPasswordsDontMatch(true);
        }
        console.log(inputs);
    };
    return (
        <>
            <div id="center-card" className="register-card">
                <h1 id="main-title">Create a new account</h1>
                <form id="main-form" method="post" onSubmit={handleFormSubmit}>
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        onChange={(e) => {
                            setInputs({ ...inputs, firstName: e.target.value });
                        }}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        onChange={(e) => {
                            setInputs({ ...inputs, lastName: e.target.value });
                        }}
                    />
                    <label
                        htmlFor="email" // Browser will put focus on text box with this id "email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        onChange={(e) => {
                            setInputs({ ...inputs, email: e.target.value });
                        }}
                    />
                    <label
                        htmlFor="phone" // Browser will put focus on text box with this id "email"
                    >
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 (123) 456-7890"
                        onChange={(e) => {
                            setInputs({ ...inputs, phone: e.target.value });
                        }}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="!@#@jcdioasDJ"
                        onChange={(e) => {
                            setInputs({ ...inputs, password: e.target.value });
                        }}
                    />
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="!@#@jcdioasDJ"
                        onChange={(e) => {
                            setInputs({
                                ...inputs,
                                confirmPassword: e.target.value,
                            });
                        }}
                    />
                    {passwordsDontMatch && (
                        <p style={{ color: "red" }}>Passwords don't match</p>
                    )}
                    <button type="submit" name="button">
                        Register
                    </button>
                </form>
                <a
                    className="small-fonts"
                    target="_blank"
                    href="/forgotPassword"
                >
                    Forgot Password?
                </a>
                <a className="small-fonts" href="/login">
                    Log in to existing account
                </a>
            </div>
        </>
    );
}

export default Register;
