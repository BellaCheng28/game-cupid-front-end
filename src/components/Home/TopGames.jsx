import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import {
  searchGames,
  getGames,
  addProfileGames,
  editProfileGames,
} from "../../services/profileService";
import { FiMenu } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { ReactSortable } from "react-sortablejs";

const TopGames = () =>{
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [profileGames, setProfileGames] = useState([]);
  const { user } = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchProfileGames = async () => {
      try {
        const data = await getGames(user.id);
        setProfileGames(data);
      } catch (error) {
        console.error("Failed to fetch AllGames:", error);
      }
    };
    
    fetchProfileGames();
  }, []);

  useEffect(() => {
    console.log("searched games:", searchResults);
  }, [searchResults]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    const filteredGames = await searchGames(searchQuery);
    setSearchResults(filteredGames);
  };

 

  // 点击加号按钮，添加到收藏列表
  const addToFavorite = async (game) => {
    const updatedGame = {...game, fav_rank: profileGames.length + 1};
    // 将游戏加入收藏列表
    setProfileGames((prevProfileGames) => [...prevProfileGames, updatedGame]);
    // 更新 searchResults，将已收藏的游戏标记为收藏
    const updatedSearchResults = searchResults.filter((g) => g.title !== updatedGame.title);
    setSearchResults(updatedSearchResults); // 更新搜索结果，确保 UI 显示正确
    try {
      await addProfileGames(updatedGame);
    } catch (error) {
      console.error("Error adding game to favorites:", error);
    }
  };

  const removeFromFavorite = async (gameId) => {
    const updatedFavorites = profileGames.filter((game) => game.id !== gameId);
    setprofileGames(updatedFavorites); // 更新收藏列表

    // 更新搜索结果，将已移除的游戏的 is_favorite 状态改为 false
    const updatedSearchResults = searchResults.map((game) =>
      game.id === gameId ? { ...game, is_favorite: false } : game
    );
    setSearchResults(updatedSearchResults);
     try {
          await editProfileGames(user.id, {
            id: gameId,
            is_favorite: false,
          });
        } catch (error) {
          console.error("Error removing game from favorites:", error);
        }
  };
  // 更新profileGames数组中的顺序
  const handleSortEnd = async(evt) => {
    console.log(evt);
    // 获取拖动前后的新旧索引
    const { oldIndex, newIndex } = evt;
    // 如果顺序发生变化
    if (oldIndex !== newIndex) {
      const updatedProfileGames = [...profileGames]; // 拷贝 profileGames 数组
      const [movedGame] = updatedProfileGames.splice(oldIndex, 1); // 删除旧位置的游戏
      updatedProfileGames.splice(newIndex, 0, movedGame); // 插入到新位置
      setProfileGames(updatedProfileGames);
      
       try {
    // 发送排序后的游戏数据到后端
    await editProfileGames(updatedProfileGames);  // 注意传递正确的排序后的数据
  } catch (error) {
    console.error("Error updating game order:", error);
    }
  };
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-violet-950 to-violet-800">
      <div className="container w-full mx-auto flex flex-col max-w-[800px]">
        {/* Search Section */}
        <div className="flex items-center space-y-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a game"
            className="border p-2 rounded-md"
          />
          <button onClick={handleSearch} className="ml-2 text-white">
            <CiSearch size={24} />
          </button>
          <Link to="/">
            <button className="bg-blue-500 text-white p-2 rounded m-3">
              Go back home
            </button>
          </Link>
        </div>

        {/* Search Results */}
        <div className="text-white">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map(
                (game) =>
                    <li
                      key={game.title}
                      className="flex items-center justify-between p-2 m-2 bg-blue-500 rounded"
                    >
                      <span>{game.title}</span>
                      {game.genre.map((genre, index) => (
                        <span key={index}>{genre}</span>
                      ))}
                      <button
                        onClick={() => addToFavorite(game)}
                        disabled={game.is_favorite}
                        className="ml-2 p-1 bg-blue-500 text-white rounded"
                      >
                        <IoIosAdd size={24} />
                      </button>
                    </li>
                  )}
          
            </ul>
          ) : (
            <p>No games found</p>
          )}
        </div>

        {/* Favorite Games */}
        <div className="text-white">
          <h2 className="mt-1">Top Games</h2>
          <ReactSortable
            list={profileGames}
            setList={setProfileGames}
            onEnd={handleSortEnd}
            tag="ul"
            className="space-y-2"
          >
            {profileGames.map((game) => (
              <li
                key={game.id}
                className="flex justify-between items-center p-2 bg-blue-500 rounded"
              >
                <span>{game.title}</span>
                {game.genre.map((genre, index) => (
                        <span key={index}>{genre}</span>
                      ))}
                <button onClick={() => removeFromFavorite(game.id)}>
                  <MdDeleteOutline size={24} />
                </button>
              </li>
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
};
export default TopGames;

