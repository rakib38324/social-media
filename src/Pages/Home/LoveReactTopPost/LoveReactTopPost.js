import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FcApproval, FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";

const LoveReactTopPost = () => {
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch(`https://social-server-sandy.vercel.app/topThreeLovePosts`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    console.log(posts)










    const { user, setLoading } = useContext(AuthContext);

    const [like, setLike] = useState(true);
    const [love, setLove] = useState(true);







    const handleLoveReactAdd = async (postId) => {

        if (user?.email) {
            try {
                const response = await fetch(`https://social-server-sandy.vercel.app/singlePost/${postId}`);
                const jsonData = await response.json();
                // console.log(jsonData.love);

                let n = parseInt(jsonData.love.n);
                n = n + 1;
                const data = {
                    n: n.toString(),

                };
                // console.log(data)

                fetch(`https://social-server-sandy.vercel.app/updateLove/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            toast.success("You Love this Post");
                            setLike('disable');
                        }
                    })


                setLove(false);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        else {
            navigate('/login');
        }


    }

    const handleLoveReactDelete = async (postId) => {

        if (user?.email) {
            try {
                const response = await fetch(`https://social-server-sandy.vercel.app/singlePost/${postId}`);
                const jsonData = await response.json();
                // console.log(jsonData.love);

                let n = parseInt(jsonData.love.n);
                n = n - 1;
                const data = { n: n.toString() }
                // console.log(data)

                fetch(`https://social-server-sandy.vercel.app/updateLove/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            toast.success("You remove Love");
                            setLike(true);
                        }
                    })


                setLove(true);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        else {
            navigate('/login');
        }


    }





    const handleLikeReactAdd = async (postId) => {

        if(user?.email){
            try {
                const response = await fetch(`https://social-server-sandy.vercel.app/singlePost/${postId}`);
                const jsonData = await response.json();
                // console.log(jsonData.like.n);
    
                let n = parseInt(jsonData.like.n);
                n = n + 1;
                const data = {
                    n: n.toString(),
    
                };
                // console.log(data)
    
                fetch(`https://social-server-sandy.vercel.app/updateLike/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            toast.success("You Like this Post");
                            setLove('disable');
                            setLike(false);
                        }
                    })
    
    
    
    
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        else{
            navigate('/login');
        }
    }


    const handleLikeReactDelete = async (postId) => {

        if(user?.email){
            try {
                const response = await fetch(`https://social-server-sandy.vercel.app/singlePost/${postId}`);
                const jsonData = await response.json();
                // console.log(jsonData.like.n);
    
                let n = parseInt(jsonData.like.n);
                n = n - 1;
                const data = { n: n.toString() }
                // console.log(data)
    
                fetch(`https://social-server-sandy.vercel.app/updateLike/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            toast.success("You remove Like");
                            setLove(true);
                            // setLike(false);
                        }
                    })
    
    
                setLike(true);
    
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        else{
            navigate('/login');
        }


    }







    const [postId, setPostId] = useState('');
    const [drawer, setDrawer] = useState(1);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();

    // const { user,setLoading } = useContext(AuthContext);

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
    })

    console.log(profile)

    const handleComment = (data) => {

        

        if(user?.email){
            setLoading(true);
            const currentDate = new Date();

        // Use the `currentDate` for saving the post or performing other operations


        const date = currentDate.toLocaleString();
        const commentInfo = {
            aurthor_Name: user?.displayName,
            author_email: user?.email,
            comment: data.comment,
            date: date,
            postId: postId,
            author_image: profile.image,
            author_verify: profile.verify

        }

        // console.log(commentInfo);

        // Save user information to the database
        fetch('https://social-server-sandy.vercel.app/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(commentInfo)
        })
            .then(res => res.json())
            .then(result => {


                toast.success("Comment Successfully");
                setLoading(false);
                setDrawer(0);
            })
        }

        else{
            navigate('/login');
        }
    }
    return (
        <div className='lg:grid lg:grid-cols-3 gap-2'>

            {
                posts?.length && posts?.map(post => (
                    <div className='my-2 bg-blue-100 rounded-lg p-3' id={post?._id}>
                        <div className='flex mb-2'>
                            <img className='w-1/12 h-10 rounded-full' src={post?.owner_image} alt="Owner_Image" />
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
                        <p className='truncate py-2'>{post?.post_details}</p>


                        <div className='flex'>
                            {
                                love === 'disable' ?
                                    <>
                                        {
                                            love === false ?
                                                <div className='flex'>
                                                    <p className='my-auto text-sm'>{post?.love?.n}</p>
                                                    <button disabled className='text-3xl ml-2 mr-5' onClick={() => handleLoveReactDelete(post._id)}><FcLike></FcLike></button>
                                                </div>
                                                :
                                                <div className='flex'>
                                                    <p className='my-auto text-sm'>{post?.love?.n}</p>
                                                    <button disabled className='text-3xl ml-2 mr-5' onClick={() => handleLoveReactAdd(post?._id)}> <FcLike></FcLike></button>
                                                </div>
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            love === false ?
                                                <div className='flex'>
                                                    <p className='my-auto text-sm'>{post?.love?.n}</p>
                                                    <button className='text-3xl ml-2 mr-5' onClick={() => handleLoveReactDelete(post._id)}><FcLike></FcLike></button>
                                                </div>
                                                :
                                                <div className='flex'>
                                                    <p className='my-auto text-sm'>{post?.love?.n}</p>
                                                    <button className='text-3xl ml-2 mr-5' onClick={() => handleLoveReactAdd(post?._id)}> <FcLike></FcLike></button>
                                                </div>
                                        }
                                    </>
                            }

                            {
                                like === 'disable' ?

                                    <>
                                        {
                                            like === false ?
                                                <>
                                                    <p className='my-auto text-sm mr-3'>{post?.like?.n}</p>
                                                    <button disabled className='text-3xl'> <FaThumbsUp className='text-blue-600'></FaThumbsUp></button>
                                                </>
                                                :
                                                <>
                                                    <p className='my-auto text-sm mr-3'>{post?.like?.n}</p>
                                                    <button disabled className='text-3xl' ><FaThumbsUp className='text-blue-500'></FaThumbsUp></button>
                                                </>

                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            like === false ?

                                                <>
                                                    <p className='my-auto text-sm mr-3'>{post?.like?.n}</p>
                                                    <button className='text-3xl' onClick={() => handleLikeReactDelete(post?._id)}> <FaThumbsUp className='text-blue-500'></FaThumbsUp></button>
                                                </>
                                                :
                                                <>
                                                    <p className='my-auto text-sm mr-3'>{post?.like?.n}</p>
                                                    <button className='text-3xl' onClick={() => handleLikeReactAdd(post?._id)}><FaThumbsUp className='text-blue-500'></FaThumbsUp></button>
                                                </>
                                        }
                                    </>
                            }
                            <label htmlFor="my_modal_6" onClick={() => setPostId(post._id)} className='ml-10 cursor-pointer'>Comment</label>
                            <Link to={`/singlePost/${post?._id}`} className='ml-10'>Details</Link>
                        </div>






                    </div>
                ))
            }




            {
                drawer === 0 ?
                    <>
                    </>
                    :
                    <>
                        {/* The button to open modal
      <label htmlFor="my_modal_6" className="btn">open modal</label> */}

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg my-2">Please Write You Comment Here.</h3>


                                <form onSubmit={handleSubmit(handleComment)}>
                                    <div className="form-control w-full ">

                                        <textarea className="w-full textarea textarea-bordered text-xl"
                                            {...register("comment", {
                                                required: "Comment is Required"
                                            })}
                                            placeholder="Please write your comments here..."></textarea>


                                        {errors.comment && <p className='text-red-600'>{errors.comment?.message}</p>}
                                    </div>



                                    <button className='px-2 py-2 mt-2 bg-blue-300 rounded-md text-xl'>Comment</button>
                                </form>

                                <div className="modal-action">
                                    <label htmlFor="my_modal_6" className="cursor-pointer text-sm">Close!</label>
                                </div>
                            </div>
                        </div>
                    </>
            }


        </div>
    );
};

export default LoveReactTopPost;