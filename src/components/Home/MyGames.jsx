import { useEffect, useState, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthedUserContext } from "../../App";
import {
  searchGames,
  getGames,
  addProfileGames,
  editProfileGames,
} from "../../services/profileService";

const MyGames = () => {
  const { user } = useContext(AuthedUserContext); // 获取当前用户
  const [availableGames, setAvailableGames] = useState([]); // 全部可选游戏
  const [userGames, setUserGames] = useState([]); // 用户的 Top Games
  const [selectedGame, setSelectedGame] = useState(""); // 当前选中的游戏

  // 初始化数据
  useEffect(() => {
    fetchAvailableGames(); // 获取所有可选择的游戏
    fetchUserGames(); // 获取用户已选的 Top Games
  }, [user.id]);

  // 获取所有可选择的游戏
  const fetchAvailableGames = async () => {
    try {
    const data = [
      { value: "game1", label: "Chess" },
      { value: "game2", label: "Minecraft" },
      { value: "game3", label: "League of Legends" },
      { value: "game4", label: "Fortnite" },
      { value: "game5", label: "Among Us" },
    ];
    setAvailableGames(data);


      // const data = await searchGames();
      // setAvailableGames(data);
    } catch (error) {
      console.error("Error fetching available games:", error);
    }
  };

  // 获取用户的 Top Games
  const fetchUserGames = async () => {
    try {
      const data = [
        { value: "game1", label: "Chess" },
        { value: "game3", label: "League of Legends" },
      ];

      // const data = await getGames();
      // setUserGames(data);
    } catch (error) {
      console.error("Error fetching user's games:", error);
    }
  };

  // 添加游戏到 Top Games
  const handleAddGame = async () => {
    if (!selectedGame) return;

    // 检查是否已存在
    if (userGames.some((game) => game.value === selectedGame)) {
      alert("This game is already in your Top Games list.");
      return;
    }

    const newGame = availableGames.find((game) => game.value === selectedGame);
    setUserGames((prev) => [...prev, newGame]); // 乐观更新

    try {
      await addProfileGames(newGame); // 后端同步
      setSelectedGame("");
    } catch (error) {
      console.error("Error adding game:", error);
      setUserGames((prev) =>
        prev.filter((game) => game.value !== selectedGame)
      ); // 回滚
    }
  };

  // 更新游戏顺序
  const handleDragEnd = async (result) => {
    if (!result.destination) return; // 如果没有目标位置，直接返回

    const reorderedGames = Array.from(userGames);
    const [movedGame] = reorderedGames.splice(result.source.index, 1); // 移除拖拽的游戏
    reorderedGames.splice(result.destination.index, 0, movedGame); // 插入到新位置

    setUserGames(reorderedGames); // 更新前端状态

    try {
      await editProfileGames({ userId: user.id, games: reorderedGames }); // 发送新顺序到后端
    } catch (error) {
      console.error("Error updating game order:", error);
      fetchUserGames(); // 如果失败，重新加载用户游戏
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-900 to-blue-700">
      <div className="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-800">
          Manage Your Top Games
        </h1>

        {/* 可选择游戏 */}
        <div className="mt-4">
          <label htmlFor="game-select" className="block text-gray-700 mb-2">
            Select a game
          </label>
          <select
            id="game-select"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a Game --</option>
            {availableGames.map((game) => (
              <option key={game.value} value={game.value}>
                {game.label}
              </option>
            ))}
          </select>
        </div>

        {/* 用户的 Top Games 列表 */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Your Top Games (Drag to reorder):
          </h2>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="games-list">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mt-4 space-y-2"
                >
                  {userGames.map((game, index) => (
                    <Draggable
                      key={game.value}
                      draggableId={game.value}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex justify-between items-center p-2 bg-blue-100 rounded-md"
                        >
                          <span className="text-gray-700">{game.label}</span>
                          <button
                            onClick={() => handleDeleteGame(game.value)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* 添加游戏按钮 */}
        <button
          onClick={handleAddGame}
          className="mt-6 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add to Top Games
        </button>
      </div>
    </div>
  );
};

export default MyGames;
