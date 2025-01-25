import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
const MatchList = () => {
  // 假设从后台获取的用户数据
  const profiles = [
    {
      profile: {
        id: 1,
        username: "Alice",
        emial: "123@gmail.com",
        gender: "he/she",
        city: "New York",
      },
      games: ["The Witcher 3", "Elden Ring"],
      platforms: ["PC", "PlayStation"],
    },
    {
      profile: {
        id: 2,
        username: "Bob",
        emial: "145@gmail.com",
        gender: "he/she",
        city: "New York",
      },
      games: ["Cyberpunk 2077", "Elden Ring"],
      platforms: ["PC"],
    },
    {
      profile: {
        id: 3,
        username: "Charlie",
        emial: "345@gmail.com",
        gender: "he/she",
        city: "New York",
      },
      games: ["The Witcher 3", "Cyberpunk 2077"],
      platforms: ["Xbox"],
    },
  ];
  const [currentUser] = useState({
    username: "You",
    games: ["Elden Ring", "Cyberpunk 2077"],
    platforms: ["PC", "Xbox"],
  }); // 当前用户
  const [matchedUsers, setMatchedUsers] = useState([]); // 匹配的用户列表
  const [selectedMatch, setSelectedMatch] = useState(null); // 选中的用户
  // 找出所有匹配用户
    const findMatches = () => {
      const matches = profiles.filter((user) => {
        // 检查是否有共同游戏
        const commonGames = currentUser.games.filter((game) =>
          user.games.includes(game)
        );
        return commonGames.length > 0; // 如果有共同游戏，则匹配成功
      });
      setMatchedUsers(matches);
      setSelectedMatch(null); // 重置选中的用户
    }; 

  const handleSelectMatch = (userId) => {
    const matchedUser = matchedUsers.find((user) => user.profile.id === userId);
    console.log("Selected match:", matchedUser);
    if (matchedUser) {
      setSelectedMatch(matchedUser); // 不需要重复筛选
    }
  };

  const handleLike = () => {
    if (selectedMatch) {
      const updatedProfiles = profiles.map((user) => {
        if (user.profile.id === selectedMatch.profile.id) {
          return {
            ...user,
            liked: true, // 添加 liked 属性
          };
        }
        return user;
      });
      console.log("Like user:", selectedMatch);
      console.log("Updated profiles:", updatedProfiles);
    }
  };

  return (
    // 显示当前用户信息;  
    <div className="p-4">
      <h1> username: {currentUser.username}</h1>
      <ul>
        {currentUser.games.map((game, index) => (
          <li key={index}>{game}</li>
        ))}
      </ul>
      {/* 查找匹配按钮 */}
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={findMatches}
      >
        <CiSearch />
      </button>
      {/* 显示匹配的用户列表 */}
      {matchedUsers.length > 0 && (
        <div className="mt-4">
          <h2>匹配的用户:</h2>
          <ul>
            {matchedUsers.map((user) => (
              <li key={user.profile.id}>
                <button
                  className="text-blue-600 underline"
                  onClick={() => handleSelectMatch(user.profile.id)}
                >
                  {user.profile.username}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* 显示选中的匹配用户详情 */}
      {selectedMatch && (
        <div className="mt-4 border p-4 rounded bg-green-100">
          <h2>匹配成功！</h2>
          <p>匹配用户: {selectedMatch.profile.username}</p>
          <p>简介: {selectedMatch.profile.emial}</p>
          <p>共同游戏:</p>
          <ul>
            {currentUser.games.filter(game => selectedMatch.games.includes(game)).map((game, index) => (
              <li key={index}>{game}</li>
            ))}
          </ul>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={handleLike}
          >
            Like
          </button>
        </div>
      )}
      <div>
      </div>
    </div>
  );
};
export default MatchList;
