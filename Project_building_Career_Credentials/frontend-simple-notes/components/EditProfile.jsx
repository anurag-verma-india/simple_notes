import { useEffect, useState } from "react";
import "../components/EditProfile.css";
import {
    deleteAllCookies,
    deleteCookie,
    getCookie,
} from "../repeated_js_code/cookie_manager";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOutFunc } from "../repeated_js_code/LogOutFunc";

function EditProfile(props) {
    const navigate = useNavigate();
    // useEffect(() => {
    const [oldFormData, setOldFormData] = useState({
        fname: "",
        lname: "",
        username: "",
        email: "",
        phone: "",
    });
    const [formData, setFormData] = useState({
        fname: getCookie("fname"),
        lname: getCookie("lname"),
        username: getCookie("username"),
        email: getCookie("email"),
        phone: getCookie("phone"),
    });
    // console.log(email, fname, lname, username);
    // }, []);
    function handleEditProfileForm(event) {
        event.preventDefault();
        // get user details from server
        // if (confirm("Press a button!")) {
        // } else {
        // }

        axios
            .post(`http://localhost:7000/getSessionDetails`, {
                // email: getCookie("email"),
            })
            .then((res) => {
                console.log(res);
                // if (res.data.authenticated) {
                //     setFormData(res.data.user);
                //     console.log(res.data.user);
                // }
            })
            .catch((err) => {
                // console.log(
                //     "err:\n",
                //     err.response.data.type,
                //     err.response.data.message
                // );
                console.log("err full: \n", err);
                if (err.response.data.type === 0) {
                    LogOutFunc(props)
                }
                // alert(
                //     "Some error occured, please try again or contact the site operator"
                // );
            });
    }

    return (
        <>
            <div id="editProfile">
                <Link to="/notes">
                    <button>
                        <img src="./arrow_left.svg" alt="" />
                    </button>
                </Link>
                <h1>Edit User Details</h1>
            </div>
            <form
                id="edit-profile-form"
                method="post"
                onSubmit={handleEditProfileForm}
            >
                <label htmlFor="fname">First Name</label>
                <input
                    name="fname"
                    type="text"
                    value={formData.fname}
                    onChange={(e) => {
                        setFormData({ ...formData, fname: e.target.value });
                    }}
                />
                <label htmlFor="lname">Last Name</label>
                <input
                    name="lname"
                    type="text"
                    value={formData.lname}
                    onChange={(e) => {
                        setFormData({ ...formData, lname: e.target.value });
                    }}
                />
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => {
                        setFormData({ ...formData, username: e.target.value });
                    }}
                />
                <label htmlFor="phone">Phone Number</label>
                <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                    }}
                />
                <label htmlFor="email">Email Address (Uneditable)</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    readOnly={true}
                    style={{ color: "gray" }}
                />
                {/* <button id="update-password">Update Password</button> */}
                <div>
                    <button
                        type="submit"
                        name="button"
                        style={{ margin: "2rem" }}
                        // onClick={handleEditProfileForm}
                    >
                        Save
                    </button>
                    {/* <Link to="/"> */}
                    <button
                        onClick={() => {
                            LogOutFunc(props);
                        }}
                        style={{ margin: "2rem" }}
                    >
                        Log out
                    </button>
                    {/* </Link> */}
                </div>
            </form>
        </>
    );
}

export default EditProfile;
