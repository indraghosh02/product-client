import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                if (result.user) {
                    // Show SweetAlert for successful login
                    Swal.fire({
                        title: 'Login Successful!',
                        text: 'You have logged in successfully with Google.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Redirect to the previous or home route after successful login
                        navigate(from, { replace: true });
                    });
                }
            })
            .catch(error => {
                console.error("Google login error:", error);

                // Show SweetAlert for login error
                Swal.fire({
                    title: 'Login Failed',
                    text: 'There was an error logging in with Google. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return ( 
        <div className="flex flex-col items-center mt-5">
            <div className="flex flex-wrap justify-center">
                {/* Google */}
                <button onClick={handleGoogleLogin}  
                    className="btn mb-4 bg-slate-700 text-white">
                    <img src="https://i.ibb.co/cCTdQdD/icons8-google-48.png" alt="" className="mr-2" /> 
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
