import "./App.css";
import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import UserLoggedIn from "../components/UserLoggedIn";

axios.defaults.withCredentials = true;

function App() {
    // const [currPage, setCurrPage] = useState("register");
    // const [currPage, setCurrPage] = useState("login");
    const [loggedIn, setLoggedIn] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(true);

    // ------- Login -------------
    // const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log("Checking login status");
        axios.get("http://localhost:7000/checklogin").then((resp) => {
            if (resp.status === 200 || resp.status === 401) {
                setLoggedIn(resp.data.loggedIn);
                setUser(resp.data.user);
            } else {
                setLoggedIn(false);
            }
        });
    }, []);

    // ------- Login -------------

    return (
        <>
            {/* {currPage === "login" && <Login setCurrPage={setCurrPage} />}
            {currPage === "register" && <Register setCurrPage={setCurrPage} />} */}
            {loggedIn && <UserLoggedIn />}
            {!loggedIn && <Login />}
            {/* <Register /> */}
        </>
    );
}

export default App;
