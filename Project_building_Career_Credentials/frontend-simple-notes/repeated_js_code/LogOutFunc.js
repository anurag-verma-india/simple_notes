import { deleteAllCookies, deleteCookie } from "./cookie_manager";

export function LogOutFunc(props) {
    const confirmation = confirm("Do you really want to log out?")
    console.log(confirmation)
    if (confirmation) {
        // User clicked yes
        SilentLogOutFunc(props)
    }
    else { console.log("Log out aborted") }
}

export function SilentLogOutFunc(props) {
    deleteCookie("connect.sid");
    deleteAllCookies();
    props.setUserAuthenticated(false);

}
