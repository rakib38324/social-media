import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const About = () => {
    const { user, setLoading } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [drawer, setDrawer] = useState(1);
    const { data: profile = '', refetch } = useQuery({
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

    // console.log(profile)

    const handleUpdateProfile = async (data) => {

        try {
            setLoading(true);

            const profileInfo = {
                name: data?.name,
                email: user?.email,
                versity: data.versity,
                address: data.address

            }
            console.log(profileInfo)

            fetch(`https://social-server-sandy.vercel.app/updateProfile/${profile?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profileInfo })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        refetch();
                        toast.success("Update successfully");
                        setDrawer(0);
                        setLoading(true);
                    }
                })

        }
        catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    return (
        <div>
            {
                user?.email ?
                <>
                <div className='lg:w-1/2 mx-auto'>
            <div className=' bg-gray-200 m-2 rounded-xl p-2'>
                <div className='flex justify-between '>
                    <p className='text-center text-xl font-semibold ml-4'>Your Profile Information</p>
                    <label htmlFor="my_modal_6" className='mr-4 font-semibold cursor-pointer'>Edit</label>
                </div>
                <img className='w-1/6 mx-auto rounded-full my-5' src={profile.image} alt="profile" />
                <p className=' mb-2 bg-gray-300 rounded-lg p-2'>Name: {profile?.name}</p>
                <p className=' mb-2 bg-gray-300 rounded-lg p-2'>Email: {profile?.email}</p>
                <p className=' mb-2 bg-gray-300 rounded-lg p-2'>Status: {profile?.verify}</p>
                <p className=' mb-2 bg-gray-300 rounded-lg p-2'>Univeristy: {profile?.versity}</p>
                <p className=' mb-2 bg-gray-300 rounded-lg p-2'>Address: {profile?.address}</p>



            </div>





            {
                drawer === 0 ?
                    <>
                    </>
                    :
                    <>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Update Your Information</h3>
                         

                                <form onSubmit={handleSubmit(handleUpdateProfile)}>


                                    <div className="form-control w-full ">
                                        <label className="label"> <span className="label-text  font-bold">Your name</span></label>
                                        <input type="text"
                                            {...register("name")}
                                            className="input input-bordered  w-full "
                                            defaultValue={user?.displayName} />
                                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                                    </div>
                                    <div className="form-control w-full ">
                                        <label className="label"> <span className="label-text  font-bold">Your email</span></label>
                                        <input type="text"
                                            {...register("email")}
                                            className="input input-bordered  w-full "
                                            defaultValue={user?.email} readOnly />
                                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                                    </div>

                                    <div className="form-control w-full ">
                                        <label className="label"> <span className="label-text  font-bold">Your Univeristy</span></label>
                                        <input placeholder='University name.' type="text"
                                            {...register("versity", {
                                                required: "University name is required"
                                            })}
                                            className="input input-bordered  w-full "
                                        />
                                        {errors.versity && <p className='text-red-600'>{errors.versity?.message}</p>}
                                    </div>

                                    <div className="form-control w-full ">
                                        <label className="label"> <span className="label-text  font-bold">Your Address</span></label>
                                        <textarea className="w-full textarea textarea-bordered "
                                            {...register("address", {
                                                required: "address is Required"
                                            })}
                                            placeholder="Please write your address here..."></textarea>


                                        {errors.address && <p className='text-red-600'>{errors.address?.message}</p>}
                                    </div>


                                    <button className='px-2 py-2 mt-2 bg-blue-300 rounded-md text-xl'>Update</button>
                                </form>

                                <div className="modal-action">
                                    <label htmlFor="my_modal_6" className="cursor-pointer text-sm">Close!</label>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </div>
                </>
                :
                <>
                    <div className='lg:w-1/2 text-xl mx-auto m-5 py-5 text-center rounded-lg font-bold bg-gray-400'>
                    <Link to='/login'>Please Login First</Link>
                    </div>
                </>
            }
        </div>
    );
};

export default About;