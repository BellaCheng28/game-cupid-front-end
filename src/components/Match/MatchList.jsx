import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
const MatchList = () => {
  const [profiles, setProfiles] = useState([]); // 所有用户的资料
 
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
    if (matchedUser) {
      setSelectedMatch(matchedUser); // 不需要重复筛选
    }
  };

  return (
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
                  {user.profile.name}
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
          <p>匹配用户: {selectedMatch.profile.name}</p>
          <p>简介: {selectedMatch.profile.bio}</p>
          <p>共同游戏:</p>
          <ul>
            {selectedMatch.commonGames.map((game, index) => (
              <li key={index}>{game}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default MatchList;
