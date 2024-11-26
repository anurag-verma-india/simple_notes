import { Link } from "react-router-dom";
import { deletAllCookies } from "../repeated_js_code/cookie_manager";

function NotesPage(props) {
    return (
        <div className="NotesPage">
            <div id="HeadingContainer">
                <h1>Notes</h1>
                <div id="LogOut">
                    <Link to="/">
                        <button
                            onClick={() => {
                                deletAllCookies();
                                props.setUserAuthenticated(false);
                                // window.location.reload();
                            }}
                        >
                            Log Out
                        </button>
                    </Link>
                </div>
                <div id="editIcon">
                    <Link to="/edit">
                        <button id="button-edit">
                            <img
                                id="button-edit-img"
                                src="./edit_icon.svg"
                                alt=""
                            />
                            <br />
                            <p id="button-edit-txt">Edit {<br />} Profile</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotesPage;
