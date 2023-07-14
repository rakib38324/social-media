import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const MainNavbar = () => {

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <div className="navbar bg-base-200">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl"><span className='font-bold text-blue-600'>RTR</span> <span className='text-sm text-green font-semibold'>Social</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      
      <li><a>Post</a></li>
      <li><a>About</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    {
      user?.email ?
      <>
      <Link to='/'><span className='font-semibold'>{user?.displayName}</span></Link>
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