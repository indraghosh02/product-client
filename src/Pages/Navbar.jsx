import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Navbar = () => {
    const {logout, user} = useAuth()


    const navLinks = <>
    <li className="btn bg-slate-700 text-white mr-4"> <NavLink to="/">Home</NavLink></li>
    

   

  
</>
    return (
        <div className="navbar bg-black">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm text-white  dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 ">
                 {navLinks}
            </ul>
          </div>
          <img className="rounded-full md:w-12 md:h-12 h-8 w-8" src="https://i.ibb.co/tQnVZFs/lg.jpg" alt="logo" />
          <a className="btn btn-ghost text-white md:text-xl text-sm">Product<span className="text-slate-500">Pulse</span></a>
        </div>
        <div className="navbar-center hidden lg:flex">
        
        </div>
        <div className="navbar-end ">
        <ul className="menu menu-horizontal px-1 hidden md:block ">
          {navLinks}
          </ul>

          
  { 
  user?
    <div className="dropdown lg:dropdown-left flex  mr-2">
        <button onClick={logout} className="btn bg-fuchsia-800 text-white">Logout</button>
    <div tabIndex={0} role="button" className=" m-1">
      <div className="w-10 rounded-full overflow-hidden">
        <img alt="" src={user?.photoURL || "https://i.ibb.co/yQd38JP/icons8-user-50.png"} />
        
      </div>
    </div>
    <div className=""> 
 
  {/* <button className="btn bg-fuchsia-800 text-white">Logout</button> */}
    
</div>



  
    
  </div>
  
    :
    <Link to="/login">
    <button className="btn bg-slate-700 text-white mr-4">Login</button>
  </Link>
        }
      
        {/* <Link to="/register">
          <button className="btn bg-slate-700 text-white">Register</button>
        </Link> */}
        </div>
      </div>
    );
};

export default Navbar;