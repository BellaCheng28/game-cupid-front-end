import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import {
  searchGames,
  getGames,
  addProfileGames,
  editProfileGames,
  DeleteProfileGames,
} from "../../services/profileService";
import { FiMenu } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { ReactSortable } from "react-sortablejs";

const MyGames = () => {
  const { gameId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [allGames, setAllGames] = useState([]); // 存储所有搜索到的游戏
  const { user, favoriteGames, setFavoriteGames } =
    useContext(AuthedUserContext);

  // 触发 fetchTopGame 在搜索查询变化时
  useEffect(() => {
    if (user && user.id) {
      // fetchGame(searchQuery);
      fetchMyGames("1");
    }
  }, [searchQuery]); // 每次查询变化都会触发新的请求

  // 获取用户的游戏
  const fetchMyGames = async (userId) => {
    try {
      const data = await getGames(userId); // 获取用户的游戏
      setFavoriteGames(data); // 设置用户的游戏
    } catch (error) {
      console.error("Failed to fetch favorite games:", error);
    }
  };

  // 获取搜索结果
  const fetchGame = async (query) => {
    try {
      const data = await searchGames(query); // 获取搜索数据
      setAllGames(data); // 设置所有搜索到的游戏
    } catch (error) {
      console.error("Failed to fetch AllGames:", error);
    }
  };

  // 搜索框输入变化
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // 更新查询值
  };

  // 统一的函数：处理游戏添加
  const handleAddGame = async (game) => {
    // 如果游戏已经存在于收藏中，就不再重复添加
    if (favoriteGames.some((g) => g.id === game.id)) return;

  const dynamicFavRank =
      favoriteGames.length > 0
        ? Math.max(...favoriteGames.map((g) => g.fav_rank)) + 1
        : 1; // 如果没有收藏，设置为 1

    const gameData = {
      title: game.title, // 游戏名称
      genre: game.genre, // 游戏类别
      fav_rank: dynamicFavRank, // 假设你设置一个默认的 fav_rank 或者你可以动态地计算
    };
  console.log("gameData:", gameData);
    // 添加到 favoriteGames 中
    setFavoriteGames((prevFavorites) => [...prevFavorites, game]);
  
    try {
      // 直接将游戏添加到后端
      await addProfileGames( gameData);
      console.log("Game added to profile:", game);
    } catch (error) {
      console.error("Error adding game to favorites:", error);
    }
  };

 const handleSortEnd = async (evt) => {
   const { oldIndex, newIndex } = evt;

   // 如果位置没有发生变化，直接返回
   if (oldIndex === newIndex) return;

   // 更新本地游戏顺序
   const updatedFavoriteGames = [...favoriteGames];
   const [movedGame] = updatedFavoriteGames.splice(oldIndex, 1);
   updatedFavoriteGames.splice(newIndex, 0, movedGame);

   // 更新本地的游戏顺序
   setFavoriteGames(updatedFavoriteGames);

   // 更新每个游戏的 fav_rank
   const gameUpdates = updatedFavoriteGames.map((game, index) => ({
     gameId: game.id,
     title: game.title,
     fav_rank: index + 1, // 排序后重新分配 fav_rank
     genre: game.genre, // 保留 genre 数据
   }));
     
console.log("gameUpdates:", gameUpdates);
   try {
     // 向后端发送更新请求
     for (const gameData of gameUpdates) {
       const gameUpdateData = {
         gameId: gameData.gameId,
         title: gameData.title,
         fav_rank: gameData.fav_rank,
         genre: gameData.genre,
       };
     console.log("gameUpdateData:", gameUpdateData);
     console.log("gameId:", gameId);
       // 发送 PUT 请求，更新对应的游戏
      await editProfileGames(user.id, gameData.gameId, gameData);
     }

     console.log("Game order updated successfully");
   } catch (error) {
     console.error("Error updating game order:", error);
   }
 };



const removeFromFavorite = async (gameId, game) => {
  if (!game) {
    console.error("No game object passed!");
    return;
  }
  // 过滤掉要删除的游戏，更新本地状态
  const updatedFavorites = favoriteGames.filter((game) => game.id !== gameId);
  setFavoriteGames(updatedFavorites);
 console.log("gameId:", gameId);
 console.log("game:", game);
  try {

  const gameData = {
  title: game.title,
  fav_rank: game.fav_rank,
};



    // 向后端发送删除请求
    await DeleteProfileGames(user.id, gameId, gameData);
    console.log("Game removed from profile:", gameId); // 可以根据需要在这里添加日志
  } catch (error) {
    console.error("Error removing game from favorites:", error);
  }
};



  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-violet-950 to-violet-800 bg-fixed">
      <div className="container w-full mx-auto flex flex-col justify-start max-w-[800px] max-h-[800px] flex-wrap">
        {/* Search games */}
        <div className="flex items-center space-y-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a game"
            className="border p-2 rounded-md"
          />
          <button
            onClick={() => fetchGame(searchQuery)}
            className="ml-2 text-white"
          >
            <CiSearch size={24} />
          </button>
          <div>
            <Link to="/myprofile">
              <button className="bg-blue-500 text-white p-2 rounded m-3">
                Go to Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Display search results */}
        <div className="text-white">
          {allGames.length > 0 && (
            <div
              className="max-h-[300px] overflow-y-auto custom-scrollbar"
              style={{ maxHeight: "300px" }} // 可以根据实际需要调整 maxHeight
            >
              <ul>
                {allGames.map((game, index) => (
                  <li
                    key={index} // 使用 game.title 作为唯一标识符
                    className="flex items-center justify-between p-2 m-2 bg-white text-violet-500 rounded"
                  >
                    <span className="flex-1 text-left">{game.title}</span>
                    <span className="flex-1 text-left">{game.fav_rank}</span>
                    <span className="flex-1 text-left">
                      {Array.isArray(game.genre)
                        ? game.genre.join(", ")
                        : game.genre}
                    </span>
                    <button
                      onClick={() => handleAddGame(game)} // 选择游戏并添加到收藏
                      className="ml-2 p-1 bg-green-500 text-white rounded"
                    >
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Display favorite games */}
        <div className="text-white">
          <h2 className="mt-1">Top Games</h2>
          <ReactSortable
            list={favoriteGames}
            setList={setFavoriteGames}
            onEnd={handleSortEnd}
            tag="ul"
            className="space-y-2"
          >
            {favoriteGames.map((game) => (
              <li
                key={game.id}
                className="flex justify-between items-center p-2 bg-blue-500 rounded"
              >
                <span className="flex-1 text-left">{game.title}</span>
                <span className="flex-1 text-left">{game.fav_rank}</span>
                <span className="flex-1 text-left">{game.genres}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-white rounded">
                    <FiMenu size={24} />
                  </button>
                  <button onClick={() => removeFromFavorite(game.id, game)}>
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

export default MyGames;
