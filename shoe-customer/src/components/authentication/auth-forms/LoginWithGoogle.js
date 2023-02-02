import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUserProfile } from 'src/services/Authenticate';
import TokenService from 'src/services/TokenService';

function LoginWithGoogle() {
    const navigate = useNavigate();
    const handleLogin = async (credential) => {
        try {
            const response = await axios.post(process.env.URL_SERVICE_GOOGLE_AUTH,
                { credential: credential },
            );
            if (true) {
                TokenService.updateLocalAccessToken(`Bearer ${response.data.data.accessToken}`);
                TokenService.updateLocalExpiresIn(response.data.data.expiresIn);
                apiUserProfile().then(result => {
                    TokenService.updateLocalProfile(JSON.stringify(result.data));
                    navigate('/', { replace: true });
                }).catch(error => {
                    console.log(error);
                })
            }
        } catch (err) {
            console.log('err: ', err);
        }
    };
    return (
        <GoogleOAuthProvider clientId={process.env.KEY_CLIENT_ID}>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    handleLogin(credentialResponse.credential);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
    );
}

export default LoginWithGoogle;
