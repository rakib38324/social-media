import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FcApproval, FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";

const Profile = () => {

    const { user, logOut, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {

        logOut()

            .then(() => {
                localStorage.removeItem('accessToken')
                toast.success('Log Out Successfully')

                navigate('/')
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            });
    }


    const { data: profile = '', } = useQuery({
        queryKey: ['order'],
        queryFn: async () => {
            const res = await fetch(`https://social-server-sandy.vercel.app/profile/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });


    const { data: allpost = [], } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await fetch(`https://social-server-sandy.vercel.app/doublePost/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    console.log(allpost);

    return (
        <div className='lg:grid lg:grid-cols-4'>
            <div className='col-span-1 lg:h-96 bg-gray-200 m-2 rounded-xl p-2'>
                <p className='text-center text-xl font-semibold'>Your Profile Information</p>

                <img className='w-1/2 mx-auto rounded-full my-5' src={profile.image} alt="profile" />

                <p className=' mb-2 bg-gray-300 rounded-lg p-2'>Name: {profile?.name}</p>
                <p className=' mb-2 bg-gray-300 rounded-lg p-2'>Email: {profile?.email}</p>
                <p className=' mb-2 bg-gray-300 rounded-lg p-2'>Status: {profile?.verify}</p>

                <button onClick={handleLogOut} className='px-3 py-2 rounded-md mt-6 bg-red-600 text-white font-bold'>Log Out</button>

            </div>

            <div className='col-span-3 m-2'>
                <p className='text-2xl text-center mb-5 font-semibold bg-gray-200 py-2 rounded-lg'>Your All Post</p>



                {
                    allpost.length === 0 ?
                    <>
                        <p className='text-center mt-5'>No Post Found</p>
                    </>
                    :
                    <>
                    {
                    allpost?.length && allpost?.map(post => (
                        <div className='mb-2 bg-blue-100 rounded-lg p-3' id={post?._id}>
                            <div className='flex mb-2'>
                                <img className='w-1/12  rounded-full' src={post?.owner_image} alt="Owner_Image" />
                                <div className='ml-2 font-semibold'>
                                    <span className='flex'>
                                        <p >{post?.owner_name}</p>
                                        {
                                            post.verify === "Unverified" ?
                                                <>
                                                </>
                                                :
                                                <>
                                                    <FcApproval className='my-auto ml-3 text-xl'></FcApproval>
                                                </>
                                        }
                                    </span>
                                    <p className='text-sm text-slate-800 font-thin'>{post?.date}</p>
                                </div>
                            </div>
                            <img className='w-full h-96  rounded-lg' src={post?.image} alt="Post_Image" />
                            <p className=' py-2'>{post?.post_details}</p>


                            <div className='flex'>


                                <div className='flex'>
                                    <p className='my-auto text-sm'>{post?.love?.n}</p>
                                    <button className='text-3xl ml-2 mr-5' ><FcLike></FcLike></button>
                                </div>






                                <div className='flex'>
                                    <p className='my-auto text-sm mr-3'>{post?.like?.n}</p>
                                    <button disabled className='text-3xl'> <FaThumbsUp className='text-blue-600'></FaThumbsUp></button>
                                </div>


                                
                                <Link to={`/singlePost/${post?._id}`} className='ml-10 my-auto'>Details</Link>

                            </div>







                        </div>
                    ))
                }
                    </>
                }


            </div>
        </div>
    );
};

export default Profile;