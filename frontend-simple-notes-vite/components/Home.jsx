import NotesPage from "./NotesPage";
import Login from "./Login";

function Home(props) {
    return (
        <>
            {props.userAuthenticated && (
                <NotesPage
                    userAuthenticated={props.userAuthenticated}
                    setUserAuthenticated={props.setUserAuthenticated}
                />
            )}
            {!props.userAuthenticated && (
                <Login
                    userAuthenticated={props.userAuthenticated}
                    setUserAuthenticated={props.setUserAuthenticated}
                />
            )}
        </>
    );
}

export default Home;
