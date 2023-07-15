import React from 'react';

import { FcApproval, FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Details = () => {



    const post = useLoaderData();
    console.log(post)

    const { data: comments = [], refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch(`https://social-server-sandy.vercel.app/comments/${post?._id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    console.log(comments)
    const numOfComments = comments.length;
    console.log(numOfComments)

    return (
        <div className='lg:w-1/2 mx-auto my-2'>



            <div className='mb-2 bg-blue-100 rounded-lg p-3' id={post?._id}>
                <div className='flex mb-2'>
                    <img className='w-1/12 h-12 rounded-full' src={post?.owner_image} alt="Owner_Image" />
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


                    <p className='my-auto text-sm mr-3 ml-6'>{numOfComments}</p>
                    <button htmlFor="" disabled className=' cursor-pointer'>Comment</button>

                    <Link to='/media' className='ml-10 my-auto'>Privious Page</Link>

                </div>







            </div>



            {
                comments.length === 0 ?
                <>
                    <p className='bg-blue-300 p-2 rounded-md'>No Comments</p>
                </>
                :
                <>
                    {
                        comments?.length && comments?.map(comment => (
                            <div className='mt- bg-blue-300 p-2 rounded-lg my-2'>
                                {/* <p>skjdnfisnifisnd</p> */}
                                <div className='flex'>
                                    <img className='w-1/12 rounded-full ' src={comment?.author_image} alt="IMG" />
                                    <div>
                                    <p className='font-semibold ml-3'>{comment.aurthor_Name}</p>
                                    <p className='ml-3 text-sm font-thin'>{comment.date}</p>
                                    </div>
                                </div>
                                
                                <p className='w-full rounded-md bg-blue-200 mt-2 p-2'>{comment?.comment}</p>
                            </div>
                        ))
                    }                
                </>
            }






        </div>
    );
};

export default Details;