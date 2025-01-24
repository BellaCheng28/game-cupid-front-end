import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "../Auth/AddressAutocomplete"; // 你的地址选择组件

import { AuthedUserContext } from "../../App";

import { editProfile } from "../../services/profileService";

const ProfileHeader = () => {
  const { user, profile, setProfile} = useContext(AuthedUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      console.log(user.id)
      const fetchProfile = async () => {
        try {
          const userId = user.id; // 获取 ID
          const updatedProfile = await editProfile(userId, profile); //TODO not sure if needed
          setProfile(updatedProfile);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      };
      fetchProfile();
    }
  }, [user]);

  // 处理表单输入变化
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // 处理地址选择
  const handleAddressSelect = (address) => {
    setProfile((prev) => ({ ...prev, city: address }));
  };

  // 提交更新后的 profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await editProfile(user.id,profile)
    alert("Profile updated successfully!");
    // 提交成功后跳转回首页，带上更新后的 profile
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-100 py-12">
      <div className="w-full max-w-md p-8 text-white bg-gradient-to-b from-violet-950 to-violet-800 rounded-lg shadow-lg">
        <h1 className="text-center font-bold p-2">Edit Profile</h1>
        <form onSubmit={handleUpdateProfile}>
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
              value={profile.username || ""}
              name="username"
              onChange={handleProfileChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-500 text-gray-400 rounded-md shadow-sm"
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
              id="email"
              value={profile.email || ""}
              name="email"
              onChange={handleProfileChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-500 text-gray-400 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-white"
            >
              Gender:
            </label>
            <select
              id="gender"
              value={profile.gender || ""}
              name="gender"
              onChange={handleProfileChange}
              className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option >he/him</option>
              <option >she/her</option>
              <option >they/them</option>
              <option >non-binary</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-white"
            >
             City
            </label>
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 mt-2 text-white font-semibold rounded-lg shadow-md hover:bg-violet-900 border border-gray-300 disabled:bg-gray-400"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileHeader;
