import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import { FcGoogle } from 'react-icons/fc';


const Login = () => {

    const { signInUser, signInWithGoogle } = use(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);
        signInUser(email, password)
            .then(result => {
                console.log(result.user);

            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className="hero bg-base-200 min-h-screen w-11/12 mx-auto mt-4">

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <p className='text-center'>Don't have an account?<Link to='/register' className='text-red-500'>Register!</Link></p>
                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset">

                            {/* Email */}
                            <label className="label">Email</label>
                            <input type="email" className="input" name='email' placeholder="Email" />

                            {/* Password */}
                            <label className="label">Password</label>
                            <input type="password" className="input" name='password' placeholder="Password" />

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn mt-4">
                        <FcGoogle size={24}></FcGoogle>
                        Sign in With Google
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;