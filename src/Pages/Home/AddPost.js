import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




const AddPost = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { user,setLoading } = useContext(AuthContext);

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

    // console.log(profile);


    const handlePost=(data)=>{

        setLoading(true);
        

        //Upload image and save database imgibb
        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);
        const imgKey = process.env.REACT_APP_IMG_key;
        // console.log(imgKey)
        const url = `https://api.imgbb.com/1/upload?key=${imgKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {

                // console.log(imgData.data.url);

                const currentDate = new Date();

                // Use the `currentDate` for saving the post or performing other operations
            
                
                const date = currentDate.toLocaleString();
                const postinfo = {
                    post_details: data.post,
                    email: user?.email,
                    image: imgData.data.url,
                    verify: profile?.verify,
                    date: date,
                    owner_image:profile?.image,
                    owner_name:profile?.name,
                    like:{
                        n:'0'
                    },
                    love:{
                        n:'0',
                    }
                }

                console.log(postinfo);

                // Save user information to the database
                fetch('https://social-server-sandy.vercel.app/post', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(postinfo)
                })
                    .then(res => res.json())
                    .then(result => {
                        
                        setLoading(false);
                        toast.success("Post Successfully");
                        navigate('/media');
                    })
            
            })
    }


    





    return (
        <div className='lg:w-1/2 mx-auto bg-slate-100 p-4 rounded-lg mt-3'>

            <p className='text-lg font-semibold my-2'>Create your post</p>
            <form onSubmit={handleSubmit(handlePost)}>

                <div className='flex'>
                    <img className='lg:w-1/12 h-12 rounded-full' src={profile.image} alt="" />
                    
                    <div className="form-control w-full ">
                            

                            <textarea className="w-full textarea textarea-bordered"
                            {...register("post", {
                                required: "Something is required"
                            })}
                            placeholder="Please write your post..."></textarea>


                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>

                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text  font-bold">Add Image</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered  w-full  pt-2" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>

                <button className='py-2 my-2 rounded-lg w-full font-bold bg-blue-300 hover:bg-blue-400'>Post</button>
            </form>


            
        </div>
    );
};

export default AddPost;