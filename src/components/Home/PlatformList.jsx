import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { profilePlateforms } from "../../services/profileService";
import { FiMenu } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { ReactSortable } from "react-sortablejs";
const PlatformList = () => {
  const { user, favoritePlatforms, setFavoritePlatforms } =
    useContext(AuthedUserContext);
  const { platformId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
//   const [favoritePlatforms, setFavoritePlatforms] = useState([]);
  //   if (!user) return null;

  const AllPlatforms = [
    {
      id: 1,
      brand: "PC",
      tag: "Windows",
    },
    {
      id: 2,
      brand: "PlayStation 5",
      tag: "Exclusive",
    },
    {
      id: 3,
      brand: "PlayStation 4",
      tag: "Console",
    },
    {
      id: 4,
      brand: "Xbox Series",
      tag: "Exclusive",
    },
  ];

  //   useEffect(() => {
  //     const fetchPlatforms = async () => {
  //       const data = await profilePlateforms();
  //       setPlatforms(data);
  //     };
  //     fetchPlatforms();
  //   }, []);

  // 处理搜索查询变化
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filteredPlatforms = AllPlatforms.filter((platform) =>
      platform.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredPlatforms);
  };
  const addToFavorite = async (platform) => {
    // 如果游戏已经收藏了，不再添加
    if (platform.is_favorite) return;
    // 更新游戏的 is_favorite 状态
    const updatedPlatform = { ...platform, is_favorite: true };
    9;
    // 将游戏加入收藏列表
    setFavoritePlatforms((prevFavorites) => [
      ...prevFavorites,
      updatedPlatform,
    ]);
    // 更新 searchResults，将已收藏的游戏标记为收藏
    const updatedSearchResults = searchResults.map((p) =>
      p.id === platform.id ? updatedPlatform : p
    );
    setSearchResults(updatedSearchResults); // 更新搜索结果，确保 UI 显示正确
  };

  const removeFromFavorite = async (platformId) => {
    const updatedFavorites = favoritePlatforms.filter(
      (platform) => platform.id !== platformId
    );
    setFavoritePlatforms(updatedFavorites); // 更新收藏列表

    // 更新搜索结果，将已移除的游戏的 is_favorite 状态改为 false
    const updatedSearchResults = searchResults.map((platform) =>
      platform.id === platformId
        ? { ...platform, is_favorite: false }
        : platform
    );
    setSearchResults(updatedSearchResults);
  };
  // 更新favoriteGames数组中的顺序
  const handleSortEnd = (evt) => {
    console.log(evt);
    // 获取拖动前后的新旧索引
    const { oldIndex, newIndex } = evt;
    // 如果顺序发生变化
    if (oldIndex !== newIndex) {
      const updatedFavoritePlatforms = [...favoritePlatforms]; // 拷贝 favoriteGames 数组
      const [movedGame] = updatedFavoritePlatforms.splice(oldIndex, 1); // 删除旧位置的游戏
      updatedFavoritePlatforms.splice(newIndex, 0, movedGame); // 插入到新位置
      setFavoritePlatforms(updatedFavoritePlatforms);
    }
  };

  return (
    <div className=" min-h-screen p-4 bg-gradient-to-b from-violet-950 to-violet-800 ">
      <div className="container  w-full mx-auto flex flex-col  justify-start max-w-[800px] max-h-[800px] flex-wrap">
        {/* search platform */}
        <div className="flex  items-center space-y-2 ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a platform"
            className="border p-2 rounded-md "
          />
          <button onClick={handleSearch} className="ml-2 text-white ">
            <CiSearch size={24} />
          </button>
          <div>
            <Link to="/">
              <button className="bg-blue-500 text-white p-2 rounded m-3">
                Go back home
              </button>
            </Link>
          </div>
        </div>

        {/* display search results */}
        <div className="text-white ">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map(
                (platform) =>
                  !platform.is_favorite && (
                    <li
                      key={platform.id}
                      className="flex items-center  justify-between p-2 m-2 bg-blue-500 rounded "
                    >
                      <span className="flex-1 text-left">{platform.brand}</span>
                      <span className="flex-1 text-left">{platform.tag}</span>

                      <button
                        onClick={() => addToFavorite(platform)}
                        disabled={platform.is_favorite}
                        className="ml-2 p-1 bg-blue-500 text-white rounded"
                      >
                        <IoIosAdd size={24} />
                      </button>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p>No platforms found</p>
          )}
        </div>
        {/* display favorite games */}
        <div className="text-white ">
          <h2 className="mt-1">Platforms</h2>
          <ReactSortable
            list={favoritePlatforms}
            setList={setFavoritePlatforms}
            onEnd={handleSortEnd}
            tag="ul"
            className="space-y-2 "
          >
            {favoritePlatforms.map((platform) => (
              <li
                key={platform.id}
                data-id={platform.id} // 添加 data-id 属性
                className="flex justify-between items-center p-2 bg-blue-500 rounded "
              >
                <span className="flex-1 text-left">{platform.brand}</span>
                <span className="flex-1 text-left">{platform.tag}</span>

                <div className="flex items-center space-x-2">
                  <button className="p-1  text-white rounded">
                    <FiMenu size={24} />
                  </button>
                  <button onClick={() => removeFromFavorite(platform.id)}>
                    <MdDeleteOutline size={24} />
                  </button>
                </div>
              </li>
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
};


export default PlatformList;
