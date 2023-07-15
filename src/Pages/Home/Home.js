import React, { useContext } from 'react';
import AddPost from './AddPost';
import { AuthContext } from '../../Context/AuthProvider';
import LoveReactTopPost from './LoveReactTopPost/LoveReactTopPost';
import LikeReactTopPost from './LikeReactTopPost/LikeReactTopPost';
import { Link } from 'react-router-dom';

const Home = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            {
                user?.email ?
                <>
                    <AddPost></AddPost>
                </>
                :
                <>  
                    <div className='lg:w-1/2 text-xl mx-auto m-5 py-5 text-center rounded-lg font-bold bg-gray-400'>
                    <Link to='/login'>Please Login For Create Post</Link>
                    </div>
                </>
            }
            
            <div className='bg-red-300 mx-auto p-2 rounded-lg'>
                <p className='text-center text-2xl mt-8 mb-5 font-bold'>Top Three Love React Posts</p>
                <LoveReactTopPost></LoveReactTopPost>
            </div>



        </div>
    );
};

export default Home;