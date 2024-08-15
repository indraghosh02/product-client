import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(result => {
                console.log(result.user);

                // Show SweetAlert for successful login
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'You have logged in successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirect to the home route after successful login
                    navigate('/');
                });
            })
            .catch(error => {
                console.error("Login error:", error);
                
                // Show SweetAlert for login error
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Incorrect email or password. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div className="hero bg-slate-700 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left flex flex-col items-center">
                    <img className="h-24 w-24 rounded-full mb-4" src="https://i.ibb.co/tQnVZFs/lg.jpg" alt="" />
                    <h1 className="text-3xl text-white font-bold">Login now!</h1>
                </div>
                <div className="card bg-black w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required 
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required 
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                            <label className="label">
                                <span className="label-text-alt text-white">Not registered yet? 
                                    <span className="text-blue-700">
                                        <Link to="/register"> Register</Link>
                                    </span>
                                </span>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-slate-700 text-white">Login</button>
                        </div>
                    </form>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;
