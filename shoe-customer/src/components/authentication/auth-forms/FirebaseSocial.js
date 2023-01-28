import { useTheme } from '@mui/material/styles';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from 'axios';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
    const theme = useTheme();

    return (

        <div >
            <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
                <GoogleLogin
                    useOneTap={true}
                    onSuccess={async (credentialResponse) => {
                        console.log(credentialResponse);
                        const { data } = await axios.post(
                            "https://api.atroboticsvn.com/api/v1/auth/login-with-google",
                        );
                        localStorage.setItem("AuthData", JSON.stringify(data));
                        //    setAuthData(data);
                        console.log("data", data)
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default FirebaseSocial;
