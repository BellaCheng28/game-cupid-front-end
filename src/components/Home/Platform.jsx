import { useEffect, useState, useContext } from "react";
import { AuthedUserContext } from "../../App";
import { useParams,Link } from "react-router-dom";
import {
  Platforms,
  profilePlatforms,
  addProfilePlatform,
  editProfilePlatforms,
} from "../../services/profileService";
import { MdDeleteOutline } from "react-icons/md";

const Platform = () => {
  const { user, userPlatforms, setUserPlatforms } =
    useContext(AuthedUserContext); // 获取当前用户
  const { platformId } = useParams();
  const [availablePlatforms, setAvailablePlatforms] = useState([]); // 可选择的平台
  const [tags, setTags] = useState({}); // 用对象来保存平台和标签的对应关系

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
      setAvailablePlatforms(data);
    } catch (error) {
      console.error("Failed to fetch platforms:", error);
    }
  };

  // 获取当前用户已选择的平台
  const fetchUserPlatforms = async () => {
    try {
      const data = await profilePlatforms(user.id); // 从后端获取用户已选平台
      setUserPlatforms(data); // 更新用户平台列表
      // 更新tags对象，保证每个平台都有对应的标签
      const initialTags = data.reduce((acc, platform) => {
        acc[platform.brand] = platform.tag || ""; // 如果没有标签，初始化为空字符串
        return acc;
      }, {});
      setTags(initialTags); // 更新tags状态
    } catch (error) {
      console.error("Failed to fetch user's platforms:", error);
    }
  };

  


  // 处理平台选择事件
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (
      selectedValue &&
      !userPlatforms.some((p) => p.brand === selectedValue)
    ) {
      // 如果平台没有被选过，则添加到 userPlatforms 中
      setUserPlatforms((prev) => [
        ...prev,
        { id: null, brand: selectedValue, tag: "" }, // 默认标签为空
      ]);
      setTags((prev) => ({ ...prev, [selectedValue]: "" })); // 初始化空标签
    }
  };

  // 处理标签输入事件
  const handleTagChange = (e, platformBrand) => {
    const newTag = e.target.value;
    setTags((prevTags) => ({ ...prevTags, [platformBrand]: newTag }));
  };

  // 保存用户选择的单个平台到后端
  const handleSavePlatform = async (platform) => {
    const platformWithTag = {
      // id: platformId ||'default-id',
      brand: platform.brand,
      tag: tags[platform.brand] || "",
    };
  
    try {
      const response = await addProfilePlatform(user.id,platformWithTag); // 单个请求发送数据到后端

      // 如果后端返回了更新后的平台数据（如带有 id），更新状态
      fetchUserPlatforms();
    } catch (error) {
      console.error("Error saving platform:", error);
    }
  };

  // 删除用户已选择的平台
  const handleDeletePlatform = async (platformId) => {
    if (!window.confirm("Are you sure you want to delete this platform?")) {
      return;
    }

    try {
      // 根据 platformId 找到具体的 platform 对象
      const platform = userPlatforms.find(
        (platform) => platform.id === platformId
      );
      if (!platform) {
        throw new Error(`can not find id is ${platformId} in userPlatforms`);
      }
      await editProfilePlatforms(user.id, platform.id, {
        delete: true,
      });

      setUserPlatforms((prev) =>
        prev.filter((platform) => platform.id !== platformId)
      );
    } catch (error) {
      console.error("Error deleting platform:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-violet-950 to-violet-800  ">
      <div className="container mx-auto max-w-lg p-6 bg-lightPurple rounded-lg shadow-md">
        <Link to="/myprofile" className="text-white font-bold">
          Back
        </Link>
        <h1 className="text-2xl font-bold text-center text-white">
          Manage My Platforms
        </h1>

        <div className="mt-4">
          <label htmlFor="platform-select" className="block text-white mb-2">
            Select a platform
          </label>
          <select
            id="platform-select"
            value=""
            onChange={handleSelectChange}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">-- Select a Platform --</option>
            {availablePlatforms.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">
            Your selected platforms:
          </h2>
          <ul>
            {userPlatforms.map((platform, index) => (
              <li
                key={index}
                className="w-full p-2  focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <div>
                  <p className="text-white">{platform.brand}</p>
                  <div className=" flex justify-between items-center">
                    <input
                      type="text"
                      id="tag"
                      value={tags[platform.brand] || ""}
                      onChange={(e) => handleTagChange(e, platform.brand)}
                      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="Enter tag"
                    />

                    <button
                      onClick={() => handleSavePlatform(platform)}
                      className="text-green-500 hover:text-green-700 mx-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDeletePlatform(platform.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Platform;
