
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthedUserContext } from "../../App";
const NavBar = () => {
 const { user } = useContext(AuthedUserContext);
    return (
      <nav className="fixed w-full bg-violet-900 p-4 text-white shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <IoHomeOutline size={24} />
          </Link>

            <Link to="/matches" className="hover:text-gray-300">
              Matches
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
         
          <div>
            {user ? (
              <>
                <span className="text-white mr-4">{user.username}</span>
                <Link to="/sign-out" className="text-white">
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="text-white mr-4">
                  Sign In
                </Link>
                <Link to="/sign-up" className="text-white">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
}


export default NavBar;