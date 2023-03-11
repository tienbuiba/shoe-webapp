import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { urlWebsite } from 'src/constants/Constant';
import { apiUserProfile } from 'src/services/Authenticate';
import TokenService from 'src/services/TokenService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function LoginWithGoogle() {
    const navigate = useNavigate();
    const { t } = useTranslation("translation");


    const options = {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
    };
    const handleLogin = async (credential) => {
        try {
            const response = await axios.post(` ${urlWebsite}/auth/login-with-google`,
                { credential: credential },
            );
            if (true) {
                TokenService.updateLocalAccessToken(`Bearer ${response.data.data.accessToken}`);
                TokenService.updateLocalExpiresIn(response.data.data.expiresIn);
                apiUserProfile().then(result => {
                    TokenService.updateLocalProfile(JSON.stringify(result.data));
                    toast.success(t("Login successful"), options);
                    navigate('/', { replace: true });
                }).catch(error => {
                    console.log(error);
                })
            }
        } catch (err) {
            console.log('err: ', err);
        }
    };

    // 10239177832-9iaplfgg6uqohtsga13l2bs3d540vi24.apps.googleusercontent.com
    return (
        <GoogleOAuthProvider clientId={"668838443562-uh0mbor1tfnopv075pe0t3vhq8v8kv29.apps.googleusercontent.com"}>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    handleLogin(credentialResponse.credential);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            <ToastContainer/>
        </GoogleOAuthProvider>
    );
}

export default LoginWithGoogle;
