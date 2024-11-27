import { deleteAllCookies, deleteCookie } from "./cookie_manager";

export function LogOutFunc(props) {
    deleteCookie("connect.sid");
    deleteAllCookies();
    props.setUserAuthenticated(false);
}
