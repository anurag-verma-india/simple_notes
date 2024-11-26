import "./App.css";
import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";

function App() {
    const [currPage, setCurrPage] = useState("login");
    return (
        <>
            {currPage === "login" && <Login />}
            {currPage === "register" && <Register />}
            {/* <Register /> */}
        </>
    );
}

export default App;
