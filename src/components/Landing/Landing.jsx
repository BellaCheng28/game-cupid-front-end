import {  Link } from "react-router-dom";
import { FaHandPointer } from "react-icons/fa";
const Landing = () => {
  return (
    <>
      <div className="flex min-h-screen">
        {/* 左侧紫色背景区域 */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-violet-950 to-violet-800 w-3/4">
          <div className="text-white text-center md:text-left w-1/2 px-8 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to GameCupid
            </h1>
            <h2 className="text-lg md:text-2xl text-green-500 hover:text-green-700">
              Find like-minded gaming partners and create your own romantic
              legend!
            </h2>
          </div>
        </div>

        {/* 右侧白色背景区域 */}
        <div className="w-1/4 bg-white relative flex items-center justify-center">
          {/* 用绝对定位实现跨背景的圆环 */}
          <div className="absolute left-[-40%] flex items-center justify-center">
            {/* 最外层光环 */}
            <div className="rounded-full border-8 border-red-500 p-2 flex items-center justify-center">
              {/* 第二层光环 */}
              <div className="rounded-full border-8 border-yellow-500 p-2 flex items-center justify-center">
                {/* 第三层光环 */}
                <div className="rounded-full border-8 border-green-500 p-2 flex items-center justify-center">
                  {/* 第四层光环 */}
                  <div className="rounded-full border-8 border-blue-500 p-2 flex items-center justify-center">
                    <div className="rounded-full border-8 border-purple-500 p-2 flex items-center justify-center">
                      <div className="rounded-full border-8 border-gray-200  flex items-center justify-center">
                        {/* 内部白色圆环 */}
                        <div className="rounded-full bg-white w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
                          <Link
                            to="/myProfile"
                            className="text-black text-lg md:text-2xl font-semibold underline flex flex-col items-center"
                          >
                            Start our Story
                            <span className="mt-2 animate-pulse">
                              <FaHandPointer />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
