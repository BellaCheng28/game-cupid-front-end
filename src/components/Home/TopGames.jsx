import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import {profileGames} from "../../services/profileService";
import { FiMenu } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { ReactSortable } from "react-sortablejs";
const TopGmaes = () =>{
  const { gameId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [favoriteGames, setFavoriteGames] = useState([]);
  const { user, favoriteGames, setFavoriteGames } =
    useContext(AuthedUserContext);
//  if (!user) return null;
  const AllGames = [
    {
      id: 1,
      title: "Game 1",
      fav_rank: 1,
      genres: "Action",
      is_favorite: false,
    },
    {
      id: 2,
      title: "Game 2",
      fav_rank: 2,
      genres: "Adventure",
      is_favorite: false,
    },
    {
      id: 3,
      title: "Game 3",
      fav_rank: 3,
      genres: "Puzzle",
      is_favorite: false,
    },
    { id: 4, title: "Game 4", fav_rank: 4, genres: "RPG", is_favorite: false },
    // 其他游戏数据
  ];
  // 处理搜索查询变化
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filteredGames = AllGames.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredGames);
  };

  // useEffect(() => {
  //   const fetchtopGames = async () => {
  //     const gamedata = await profileGames(searchQuery);
  //     setTopGames(gamedata);
  //   };
  //   fetchtopGames();
  // }, [searchQuery]);

  // 点击加号按钮，添加到收藏列表
  const addToFavorite = async (game) => {
    // 如果游戏已经收藏了，不再添加
    if (game.is_favorite) return;
    // 更新游戏的 is_favorite 状态
    const updatedGame = { ...game, is_favorite: true };
    // 将游戏加入收藏列表
    setFavoriteGames((prevFavorites) => [...prevFavorites, updatedGame]);
    // 更新 searchResults，将已收藏的游戏标记为收藏
    const updatedSearchResults = searchResults.map((g) =>
      g.id === game.id ? updatedGame : g
    );
    setSearchResults(updatedSearchResults); // 更新搜索结果，确保 UI 显示正确
  };

  const removeFromFavorite = async (gameId) => {
    const updatedFavorites = favoriteGames.filter((game) => game.id !== gameId);
    setFavoriteGames(updatedFavorites); // 更新收藏列表

    // 更新搜索结果，将已移除的游戏的 is_favorite 状态改为 false
    const updatedSearchResults = searchResults.map((game) =>
      game.id === gameId ? { ...game, is_favorite: false } : game
    );
    setSearchResults(updatedSearchResults);
  };
  // 更新favoriteGames数组中的顺序
const handleSortEnd = (evt) => {
  console.log(evt);
  // 获取拖动前后的新旧索引
  const { oldIndex, newIndex } = evt;
  // 如果顺序发生变化
  if(oldIndex !== newIndex){
    const updatedFavoriteGames = [...favoriteGames]; // 拷贝 favoriteGames 数组
    const [movedGame] = updatedFavoriteGames.splice(oldIndex, 1); // 删除旧位置的游戏
    updatedFavoriteGames.splice(newIndex, 0, movedGame); // 插入到新位置
    setFavoriteGames(updatedFavoriteGames);
  }

};

  return (
    <div className=" min-h-screen p-4 bg-gradient-to-b from-violet-950 to-violet-800 ">
      <div className="container  w-full mx-auto flex flex-col  justify-start max-w-[800px] max-h-[800px] flex-wrap">
        {/* search games */}
        <div className="flex  items-center space-y-2 ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a game"
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
                (game) =>
                  !game.is_favorite && (
                    <li
                      key={game.id}
                      className="flex items-center  justify-between p-2 m-2 bg-blue-500 rounded "
                    >
                      <span className="flex-1 text-left">{game.title}</span>
                      <span className="flex-1 text-left">{game.fav_rank}</span>
                      <span className="flex-1 text-left">{game.genres}</span>

                      <button
                        onClick={() => addToFavorite(game)}
                        disabled={game.is_favorite}
                        className="ml-2 p-1 bg-blue-500 text-white rounded"
                      >
                        <IoIosAdd size={24} />
                      </button>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p>No games found</p>
          )}
        </div>
        {/* display favorite games */}
        <div className="text-white ">
          <h2 className="mt-1">Top Games</h2>
          <ReactSortable
            list={favoriteGames}
            setList={setFavoriteGames}
            onEnd={handleSortEnd}
            tag="ul"
            className="space-y-2 "
          >
            {favoriteGames.map((game) => (
              <li
                key={game.id}
                data-id={game.id} // 添加 data-id 属性
                className="flex justify-between items-center p-2 bg-blue-500 rounded "
              >
                <span className="flex-1 text-left">{game.title}</span>
                <span className="flex-1 text-left">{game.fav_rank}</span>
                <span className="flex-1 text-left">{game.genres}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-1  text-white rounded">
                    <FiMenu size={24} />
                  </button>
                  <button onClick={() => removeFromFavorite(game.id)}>
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
}

export default TopGmaes;

