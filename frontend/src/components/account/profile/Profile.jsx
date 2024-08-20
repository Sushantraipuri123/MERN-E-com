import { Link } from "react-router-dom";
import { useAuth } from "../../../store/Auth";

function Profile() {
    const { user } = useAuth();
    const userdata = user?.userData; // Safely access userData

    console.log('Profile page data:', userdata);

    return (
     

        <>
      hajkhflak
        </>
    );
}

export default Profile;
