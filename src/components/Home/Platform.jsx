import { useEffect, useState, useContext } from "react";
import { AuthedUserContext } from "../../App";

import {
  Platforms,
  profilePlatforms,
  addProfilePlatform,
  editProfilePlatforms,
} from "../../services/profileService";
import { MdDeleteOutline } from "react-icons/md";


const Platform = () => {
  const { user } = useContext(AuthedUserContext); // 获取当前用户
   console.log("user", user);
  const [availablePlatforms, setAvailablePlatforms] = useState([]); // 可选择的平台
  const [userPlatforms, setUserPlatforms] = useState([]); // 用户已选择的平台
  const [selectedPlatform, setSelectedPlatform] = useState(""); // 当前选中的平台

  // 加载可选择的平台和用户已选的平台
  useEffect(() => {
    if (user && user.id) {
      fetchPlatforms();
      fetchUserPlatforms();
    }
  }, [user]);

  // 获取可选择的平台数据
  const fetchPlatforms = async () => {
    try {
      const data = await Platforms(); // 从后端获取平台列表
      setAvailablePlatforms(data); // 更新可选平台状态
    } catch (error) {
      console.error("Failed to fetch platforms:", error);
    }
  };

  // 获取当前用户已选择的平台
  const fetchUserPlatforms = async () => {
    try {
      const data = await profilePlatforms(user.id); // 从后端获取用户已选平台
      setUserPlatforms(data); // 更新用户平台列表
      console.log("userPlatforms", data);
    } catch (error) {
      console.error("Failed to fetch user's platforms:", error);
    }
  };

  // 添加平台到用户的品牌列表
  const handlePlatformSelection = async () => {
    if (!selectedPlatform) return; // 如果没有选择平台，返回

    // 检查平台是否已经添加
    if (userPlatforms.some((platform) => platform.value === selectedPlatform)) {
      alert("This platform is already added to your profile.");
      return;
    }
    const newPlatform = { value: selectedPlatform, label: selectedPlatform };
    setUserPlatforms((prev) => [...prev, newPlatform]); // 先更新状态

    // 同步到后端
    try {
      await addProfilePlatform(user.id, newPlatform); // 后端同步
    } catch (error) {
      console.error("Error adding platform:", error);
      // 如果后端失败，回滚状态
      setUserPlatforms((prev) =>
        prev.filter((platform) => platform.value !== selectedPlatform)
      );
    }
  };

  // 删除用户已选择的平台
  const handleDeletePlatform = async (platformValue) => {
    if (!window.confirm("Are you sure you want to delete this platform?")) {
    return;
  }
    try {
      await editProfilePlatforms(user.id, {
        value: platformValue,
        delete: true,
      }); // 调用 PUT 请求
      setUserPlatforms((prev) =>
        prev.filter((platform) => platform.value !== platformValue)
      ); // 删除状态
    } catch (error) {
      console.error("Error deleting platform:", error);
    }
  };
;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-violet-950 to-violet-800">
      <div className="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-violet-800">
          Manage My Platforms
        </h1>
        <div className="mt-4">
          <label htmlFor="platform-select" className="block text-gray-700 mb-2">
            Select a platform
          </label>
          <select
            id="platform-select"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">-- Select a Platform --</option>
            {availablePlatforms.map((platform) => (
              <option key={platform.value} value={platform.value}>
                {platform.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Your selected platforms:
          </h2>
          <ul className="mt-4 space-y-2">
            {userPlatforms.map((platform, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-violet-100 rounded-md"
              >
                <span className="text-gray-700">{platform.label}</span>
                <button
                  onClick={() => handleDeletePlatform(platform.value)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDeleteOutline size={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handlePlatformSelection}
          className="mt-6 w-full p-2 bg-violet-500 text-white rounded-md hover:bg-violet-600"
        >
          Save Selected Platform
        </button>
      </div>
    </div>
  );
};

export default Platform;
