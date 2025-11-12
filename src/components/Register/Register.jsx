import React, { use } from 'react';

import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../provider/AuthContext';


const Register = () => {

    const { createUser, signInWithGoogle } = use(AuthContext)

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const image = e.target.photourl.value;
        const name = e.target.name.value;

        
        // const newUser = { name, email, image }

        // console.log(newUser)
        createUser(email, password)
            .then(result => {
                // console.log('handle register', result.user);
                const newUser = { name, email:result.user.email, image }
                
                // create user in database
                fetch('http://localhost:3000/users', {

                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save', data);
                    })

            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log(result.user);

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }
                // console.log(newUser);
                // create user in database
                fetch('http://localhost:3000/users', {

                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save', data);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className="hero bg-base-200 min-h-screen w-11/12 mx-auto">

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center">Register now!</h1>
                    <p className='text-center'>Already have an account?<Link to='/login' className='text-red-500'>Login Now</Link></p>
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input type="text" className="input" name='name' placeholder="Name" />
                            {/* Email */}
                            <label className="label">Email</label>
                            <input type="email" className="input" name='email' placeholder="Email" />
                            {/* Photo URL */}
                            <label className="label">Photo-URL</label>
                            <input type="text" className="input" name='photourl' placeholder="Photo-URL" />
                            {/* Password */}
                            <label className="label">Password</label>
                            <input type="password" className="input" name='password' placeholder="Password" />

                            <button className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </form>

                    <div className="flex items-center justify-center">
                        <span className="w-full border-t"></span>
                        <span className="mx-2 text-gray-500 text-sm">OR</span>
                        <span className="w-full border-t"></span>
                    </div>
                    <button onClick={handleGoogleSignIn} className="btn  mt-4">
                        <FcGoogle size={24}></FcGoogle>
                        Sign in With Google
                    </button>
                </div>



            </div>
        </div>
    );
};

export default Register;