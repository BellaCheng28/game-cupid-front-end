// SignupForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/authService";
import AddressAutocomplete from "./AddressAutocomplete";

const SignUp = ({ setUser }) => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    address: "",
    password: "",
    passwordConf: "",
    isError: false,
    errorMsg: "",
  });

  const { username, email, gender, address, password, passwordConf } = formData;

  const handleAddressSelect = (address) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: address.formatted, // 更新 address
    }));
    console.log("Selected address:", address);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await signUp(formData);
      setUser(userData);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setFormData((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        email: "",
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
    <main className="flex min-h-screen justify-center items-center bg-gray-100 py-12  ">
      <div className=" w-full max-w-md p-8 bg-gradient-to-b from-violet-950 to-violet-800 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-white">Sign Up</h1>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
              "
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
             "
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-white "
            >
              Gender:
            </label>
            <select
              id="gender"
              value={gender}
              name="gender"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm 
             "
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">He/His</option>
              <option value="female">She/Her</option>
              <option value="others">non-binary</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-white"
            >
              Address:
            </label>
            <AddressAutocomplete />
           
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
              id="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm "
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-white"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
             "
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={renderError()}
              className="w-full py-2 px-4  text-white font-semibold rounded-lg shadow-md hover:bg-violet-900 
               border border-gray-300
              disabled:bg-gray-400"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/home">
              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-300 text-white  font-semibold rounded-lg shadow-md hover:bg-violet-900 "
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
