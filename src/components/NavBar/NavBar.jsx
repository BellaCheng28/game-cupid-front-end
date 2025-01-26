
import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthedUserContext } from "../../App";
const NavBar = ({ handleSignout, handleDeleteUser }) => {
  const { user } = useContext(AuthedUserContext);
const navigate = useNavigate(); // 初始化导航功能

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
          Matches
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          About
        </Link>

        <div>
          {user ? (
            <>
              <div className="flex items-center space-x-4">
                <span className="text-white mr-4">{user.username}</span>
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
                <Link to="*" onClick={onDeleteUser}>
                  DeleteUser
                </Link>
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