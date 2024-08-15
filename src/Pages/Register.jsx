import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;

        // Check if the password meets the minimum length requirement
        if (password.length < 6) {
            Swal.fire({
                title: 'Error',
                text: 'Password must be at least 6 characters long.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        createUser(email, password)
            .then(result => {
                // Show SweetAlert for successful registration
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'You have been registered successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirect to the home route after successful registration
                    navigate('/');
                });
            })
            .catch(error => {
                // Handle errors if needed
                console.error("Error during registration:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred during registration. Please try again.',
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
                    <h1 className="text-3xl text-white font-bold">Register now!</h1>
                </div>
                <div className="card bg-black w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Full Name</span>
                            </label>
                            <input type="text" placeholder="Full Name" className="input input-bordered" required 
                            {...register("fullName", { required: true })}
                            />
                            {errors.fullName && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type="email"  placeholder="email" className="input input-bordered" required 
                            {...register("email", { required: true })}
                            />
                            {errors.email && <span  className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Image URL</span>
                            </label>
                            <input type="text" placeholder="image url" className="input input-bordered"  
                            {...register("image")}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white ">Password</span>
                            </label>
                            <input type="password"  placeholder="password" className="input input-bordered" required
                             {...register("password", { required: true })}
                             />
                            {errors.password && <span  className="text-red-500">This field is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt text-white link link-hover">Already Registered? Plz <span className="text-blue-700"><Link to="/login"> Login</Link></span></a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-slate-700 text-white">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
