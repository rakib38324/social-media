import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-hot-toast';
import useToken from '../../Hooks/UserTooken';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signUpError, setSignUPError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const { createUser, updateUser, signUpWitGoogle, loading, setLoading } = useContext(AuthContext);

    if (token) {
        navigate(from , {replace: true})
    }

    const handleSignUp = (data) => {
        // console.log(data);
        setLoading(true)

        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success(`Processing...`)

                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        // saveUser(data.name,data.email);





                        //Upload image and save database imgibb
                        const image = data.image[0];

                        const formData = new FormData();
                        formData.append('image', image);
                        const imgKey = process.env.REACT_APP_IMG_key;
                        // console.log(imgKey)
                        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgKey}`;

                        fetch(url, {
                            method: 'POST',
                            body: formData
                        })
                            .then(res => res.json())
                            .then(imgData => {

                                // console.log(imgData.data.url);
                                const user = {
                                    name: data.name,
                                    email: data.email,
                                    image: imgData.data.url,
                                    verify: 'Unverified',
                                }


                                // console.log(user)
                                


                                // Save user information to the database
                                fetch('http://localhost:5000/users', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json',
                                    },
                                    body: JSON.stringify(user)
                                })
                                    .then(res => res.json())
                                    .then(result => {
                                        setCreatedUserEmail(data.email);
                                        setLoading(false);
                                        toast.success("Login Successfully");
                                    })

                            })

                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                setSignUPError(error.message)
            });
    }


    const handleSignUpnWithGoogle = () => {

        setLoading(true)

        signUpWitGoogle()
            .then(result => {
                const user = result.user;
                console.log(user.email)


                //check the user is alive in our database,
                //if user email found we can call for token,
                //else at first create user then send database and then call for token

                if (user.email) {
                    fetch(`http://localhost:5000/finduser?email=${user?.email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.accessToken) {
                                toast.success("Login Successfully");
                                return setCreatedUserEmail(user.email);
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
                                fetch('http://localhost:5000/users', {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'application/json',
                                    },
                                    body: JSON.stringify(profile)
                                })
                                    .then(res => res.json())
                                    .then(result => {
                                        setCreatedUserEmail(user.email);
                                        setLoading(false);
                                        toast.success("Login Successfully");
                                    })



                            }
                        });
                }


            })
            .catch(error =>{
                setLoading(false)
                 console.log(error)})

    }



    return (
        <div className='h-[500px] flex justify-center items-center  rounded-lg '>
            <div className=''>
                <h2 className='text-4xl  font-semibold text-center'>SignUp</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className="form-control w-full ">
                            <label className="label"> <span className="label-text  font-bold">Name</span></label>
                            <input placeholder='Enter your name.' type="text" {...register("name", {
                                required: "Name is Required"
                            })} className="input  input-bordered w-full " />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        </div>
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



                        <div className="form-control w-full ">
                            <label className="label"> <span className="label-text  font-bold">Image</span></label>
                            <input type="file" {...register("image", {
                                required: "Photo is Required"
                            })} className="input input-bordered  w-full  pt-2" />
                            {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                        </div>
                    </div>

                    <div className='text-center my-5'>

                        <button className='btn btn-primary bg-slate-600 hover:bg-slate-800 text-white w-full mt-2 '>  SignUp </button>

                        <div>
                            {signUpError && <p className='text-red-600'>{signUpError}</p>}
                        </div>
                    </div>

                    
                </form>
                <p className='pt-2'>Have an Account? <Link className=' font-bold' to="/login">Please Login</Link></p>
                <div className="divider  font-bold">OR</div>
                <button onClick={handleSignUpnWithGoogle} className='btn btn-primary bg-gradient-to-r from-blue-600  text-white w-full '>Signup with google</button>
            </div>


        </div>
    );
};

export default Signup;