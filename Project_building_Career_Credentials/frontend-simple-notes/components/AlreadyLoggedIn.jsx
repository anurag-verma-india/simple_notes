import { useNavigate } from "react-router-dom";
import { LogOutFunc } from "../repeated_js_code/LogOutFunc";

function AlreadyLoggedIn(props) {
    const navigate = useNavigate();
    return (
        <>
            <br />
            <h1>You are already Logged in</h1>
            <br />
            <button
                onClick={() => {
                    if (confirm("Do you really want to log out?")) {
                        LogOutFunc(props);
                        navigate("/login");
                    }
                }}
            >
                Log out
            </button>
            <button onClick={() => navigate("/")}>Go to Home</button>
        </>
    );
}

export default AlreadyLoggedIn;
