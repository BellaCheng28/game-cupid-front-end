import React from "react";
import { useLocation } from "react-router-dom";

const Like = () => {
  const location = useLocation();
   const welcome = location.state?.welcome || false;
   const matchProfile = location.state?.matchProfile;
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/image/game.png')", // 正确的背景图片路径
        backgroundSize: "cover", // 背景图片覆盖
        backgroundPosition: "center", // 背景图片居中
        backgroundAttachment: "fixed", // 固定背景
      }}
    >
      {welcome && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center">
          <div className="relative bg-pink-100 p-6 rounded-3xl shadow-xl max-w-md mx-auto animate-float">
            <h1 className="text-3xl font-bold mb-2 text-violet-500 hover:text-violet-700">
              <p>☁️ Hi {matchProfile?.username || "guys"}! ☁️</p>
            </h1>
            <p className="text-lg text-gray-700">Nice to meet you!</p>
            <p className="text-lg text-gray-700">
              Here is <span className="font-bold text-blue-500">GameCupid</span>
              . Let’s create a magical story together!
            </p>
            {/* 彩色冒泡 */}
            <div className="absolute -top-3 -left-6 w-8 h-8 rounded-full animate-bubble bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 opacity-80"></div>
            <div className="absolute -top-8 right-10 w-6 h-6 rounded-full animate-bubble-slow bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-80"></div>
            <div className="absolute bottom-4 left-8 w-4 h-4 rounded-full animate-bubble-fast bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 opacity-80"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Like;
