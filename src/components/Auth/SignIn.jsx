// SigninForm

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../services/authService";
import { AuthedUserContext } from "../../App";
const SignIn = () => {
  const { setUser } = useContext(AuthedUserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    // isError: false,
    // errorMsg: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await signIn(formData);
      setUser(userData);

      navigate("/");
    } catch (error) {
      console.error(error);
      setFormData((prevForm) => ({
        // isError: true,
        // errorMsg: "Invalid Credentials",
        username: prevForm.username,
        password: "",
      }));
    }
  };

  const renderError = () => {
    const toggleForm = formData.isError ? "danger" : "";

    if (formData.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {formData.errorMsg}
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 py-12">
      <div className="w-full max-w-md p-8 bg-gradient-to-b from-violet-950 to-violet-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Sign In
        </h2>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username:
            </label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              placeholder="Enter Username"
              name="username"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm "
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password:
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm "
              required
            />
          </div>
          {renderError()}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-semibold border border-gray-300 rounded-lg shadow-md hover:bg-violet-900 disabled:bg-gray-400"
            >
              Sign In
            </button>
          </div>
          <div className="text-center text-white">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-center text-blue-500 hover:text-blue-700"
            >
              Sign up
            </Link>
            here!
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
