import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/UserTooken';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const [signUpError, setSignUPError] = useState('');


    const { signIn, signUpWitGoogle, loading, setLoading } = useContext(AuthContext)



    if (token) {

        navigate(from, { replace: true })
    }


    const handleLogin = data => {
        // console.log(data);
        setLoading(true)
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user.email);
                if (user?.email) {
                    setLoginUserEmail(user.email);
                    toast.success("Login Successfully")
                    setLoading(false)
                }

            })
            .catch(error => {
                console.log(error.message)
                setLoading(false)
                setLoginError(error.message);

            });
    }


    const handleLoginWithGoogle = () => {
        setLoading(true)

        signUpWitGoogle()

            .then(result => {
                const user = result.user;
                console.log(user)
                if (user.email) {
                    fetch(`https://social-server-sandy.vercel.app/finduser?email=${user.email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.accessToken) {
                              
                                return setLoginUserEmail(user.email);
                            }

                            else {

                                const profile = {
                                    name: user.displayName,
                                    email: user.email,
                                    image: user.photoURL,
                                    verify: 'Unverified',
                                }

                                // console.log(profile)
                                // Save user information to the database
                                fetch('https://social-server-sandy.vercel.app/users', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json',
                                    },
                                    body: JSON.stringify(profile)
                                })
                                    .then(res => res.json())
                                    .then(result => {
                                        setLoginUserEmail(user.email);
                                        setLoading(false)
                                        toast.success("Login Successfully")
                                       
                                    })



                            }
                        });
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })

    }


    return (
        <div>

            <div className='h-[500px] flex justify-center items-center  rounded-lg '>
                <div className=''>
                    <h2 className='text-4xl  font-semibold text-center mb-4'>LogIn</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className='grid grid-cols-2 gap-3'>

                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text  font-bold">Email</span></label>
                                <input placeholder='Enter your email.' type="text"
                                    {...register("email", {
                                        required: "Email Address is required"
                                    })}
                                    className="input input-bordered  w-full " />
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label"> <span className="label-text  font-bold">Password</span></label>
                                <input placeholder='Enter your password.' type="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })} className="input input-bordered  w-full " />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                            </div>




                        </div>

                        <div className='text-center my-5'>

                            <button className='btn btn-primary bg-slate-600 hover:bg-slate-800 text-white w-full mt-2 '>  LogIn </button>

                            <div>
                                {loginError && <p className='text-red-600'>{loginError}</p>}
                            </div>
                        </div>


                    </form>
                    <p className='pt-2'>Don't have account? <Link className=' font-bold' to="/signup">Create Account</Link></p>
                    <div className="divider  font-bold">OR</div>
                    <button onClick={handleLoginWithGoogle} className='btn btn-primary bg-gradient-to-r from-blue-600  text-white w-full '>LogIn with google</button>
                </div>


            </div>

        </div>
    );
};

export default Login;