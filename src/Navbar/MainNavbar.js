import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MainNavbar = () => {

  const { user } = useContext(AuthContext);
  // console.log(user);

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

  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/media'>Media</Link></li>
              <li><Link to='/message'>Message</Link></li>
              <li><Link to='/about'>About</Link></li>

            </ul>
          </div>
          <Link to='/' className="btn btn-ghost normal-case text-xl"><span className='font-bold text-blue-600'>RTR</span> <span className='text-sm text-green font-semibold'>Social</span></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/media'>Media</Link></li>
            <li><Link to='/message'>Message</Link></li>
            <li><Link to='/about'>About</Link></li>

          </ul>
        </div>
        <div className="navbar-end">
          {
            user?.email ?
              <>
                <Link className='w-1/6' to='/profile'>
                  <img className='w-1/2 rounded-full mx-auto' src={profile.image} alt="" />
                
                </Link>
                <Link to='/profile'><span className='font-semibold'>{profile?.name}</span></Link>
                
              </>
              :
              <>
                <Link to='/signup'>Create Account <span className='text-blue-700 font-bold'>It's Free!</span></Link>
              </>

          }

        </div>
      </div>
    </div>
  );
};

export default MainNavbar;