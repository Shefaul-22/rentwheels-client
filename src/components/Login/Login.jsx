import React, { use, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {

    const { signInUser, signInWithGoogle } = use(AuthContext)
    const [error, setError] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleKeyDown = (e, nextField) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextField) {
                nextField.current.focus();

            }
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);
        const sixPattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;


        if (!sixPattern.test(password)) {
            console.log('password didnot match');
            setError('Password must be six character')
            return;
        }
        else if (!casePattern.test(password)) {
            setError('password must have at least one uppercase and lowercase character')
            return;
        }


        setError('');

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Success!",
                    text: "Login Successfull !",
                    icon: "success",
                    timer: 1500,
                    confirmButtonColor: "#EF4444",
                });
                navigate('/');

            })
            .catch(error => {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#EF4444",
                });
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Success!",
                    text: "Login Successfull !",
                    icon: "success",
                    timer: 1500,
                    confirmButtonColor: "#EF4444",
                });
                navigate('/');

            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#EF4444",
                });
            })
    }

    // Handle password show
    const handlePasswordShow = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    return (
        <div className="hero bg-[#bdd7e7] min-h-screen w-11/12 mx-auto mt-4">

            <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-center">Login</h1>
                    <p className='text-center text-gray-600 font-stretch-90%'>Don't have an account?<Link to='/register' className='text-red-500 underline'>Register!</Link></p>
                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset">

                            {/* Email */}
                            <label className="label font-semibold text-gray-600 font-stretch-90%">Email</label>
                            <input ref={emailRef}
                                onKeyDown={(e) => handleKeyDown(e, passwordRef)}

                                type="email" className="input" name='email' placeholder="Enter your email" />

                            {/* Password */}
                            <label className="label font-semibold text-gray-600 font-stretch-90%">Password</label>
                            <div className="relative w-full">
                                <input

                                    ref={passwordRef}
                                    onKeyDown={(e) => handleKeyDown(e, null)}

                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input  focus:outline-blue-500"
                                    placeholder="Password"
                                />

                                <button
                                    type="button"
                                    onClick={handlePasswordShow}
                                    className="absolute inset-y-0 right-6 flex items-center text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <div><a className="link link-hover text-gray-500 font-stretch-90%">Forgot password?</a></div>
                            <button className="btn font-bold bg-blue-600 text-white mt-4 ">Login</button>
                        </fieldset>

                        {
                            error && <p className='text-red-500'>{error}</p>
                        }

                    </form>
                    <button onClick={handleGoogleSignIn} className="btn mt-4 bg-gray-300">
                        <FcGoogle size={24}></FcGoogle>
                        Sign in With Google
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;