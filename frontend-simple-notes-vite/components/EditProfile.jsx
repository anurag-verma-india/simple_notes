import { useEffect, useState } from "react";
import "../components/EditProfile.css";
import { deletAllCookies, getCookie } from "../repeated_js_code/cookie_manager";
import { Link } from "react-router-dom";

function EditProfile(props) {
    // useEffect(() => {
    const [formData, setFormData] = useState({
        email: getCookie("email"),
        phone: getCookie("phone"),
        fname: getCookie("fname"),
        lname: getCookie("lname"),
        username: getCookie("username"),
    });
    // console.log(email, fname, lname, username);
    // }, []);
    function handleEditProfileForm(event) {
        event.preventDefault();
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
                <label htmlFor="phone">Phone Number</label>
                <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                    }}
                />
                <label htmlFor="email">Email Address</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                    }}
                />
                {/* <button id="update-password">Update Password</button> */}
                <div>
                    <button
                        type="submit"
                        name="button"
                        style={{ margin: "2rem" }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            deletAllCookies();
                            // props.setUserAuthenticated(false);
                        }}
                        style={{ margin: "2rem" }}
                    >
                        Log out
                    </button>
                </div>
            </form>
        </>
    );
}

export default EditProfile;