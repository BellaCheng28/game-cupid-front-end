
import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthedUserContext } from "../../App";
import { FaRegUser } from "react-icons/fa";
const NavBar = ({ handleSignout, handleDeleteUser }) => {
  const { user } = useContext(AuthedUserContext);
const navigate = useNavigate(); // 初始化导航功能
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const toggleMenu = () => {
   setIsMenuOpen(!isMenuOpen);
 };

const onDeleteUser = async (event) => {
  event.preventDefault(); // 阻止默认的 Link 跳转行为
  try {
    await handleDeleteUser();
    navigate("/sign-in"); // 删除成功后跳转到登录页
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};
  return (
    <nav className="fixed w-full bg-violet-900 p-4 text-white shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <IoHomeOutline size={24} />
        </Link>

        <Link to="/matches" className="hover:text-gray-300">
          GameCupid
        </Link>
        <Link to="/myprofile" className="hover:text-gray-300">
          Profile
        </Link>
        <Link to="/mygames" className="hover:text-gray-300">
          Game
        </Link>
        <Link to="/platform" className="hover:text-gray-300">
          Platform
        </Link>

        <div>
          {user ? (
            <>
              <div className="relative">
                {/* User Icon */}
                <div
                  className="flex items-center space-x-4 cursor-pointer"
  
                >
                  <button onClick={toggleMenu}>
                    <FaRegUser size={24} className="text-white" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-700">
                        {user.username}
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-700">
                        <Link to="" onClick={handleSignout}>
                          Sign Out
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-700">
                        <Link to="*" onClick={onDeleteUser}>
                          Delete Account
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
};


export default NavBar;