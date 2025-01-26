import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { AuthedUserContext } from "../../App";
import { useParams } from "react-router-dom";
import {viewOtherProfile} from "../../services/profileService.js";
const ViewOtherProfile = () => {
  //   const { user } = useContext(AuthedUserContext);
  //   const { userId } = useParams();
  //   const [otherProfile, setOtherProfile] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //  useEffect(() => {
  //    if (userId) {
  //      const fetchOtherProfile = async () => {
  //        try {
  //          const otherProfiledata = await viewOtherProfile(userId);
  //          setOtherProfile(otherProfiledata);
  //        } catch (error) {
  //          console.error("Failed to fetch other profile:", error);
  //        } finally {
  //          setLoading(false); // 加载完成
  //        }
  //      };

  //       fetchOtherProfile(); // 调用获取数据的函数
  //     }
  //   }, [userId]); // 当 userId 改变时重新加载数据
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   // 如果没有获取到数据，或者 userId 不存在，显示错误信息
  //   if (!otherProfile) {
  //     return <div>User not found</div>;
  //   }

  return (
    <>
      <div className="min-h-screen p-4 bg-gradient-to-b from-violet-950 to-pink-100 flex flex-row flex-wrap justify-evenly">
        {/* Profile */}
        <div className="w-full flex p-6 text-white bg-lightPurple rounded-lg shadow-lg max-w-[300px] max-h-[400px] flex-col items-center m-3">
          <div>
            <h2 className="flex items-center justify-center space-x-4 mt-4">
              <CiUser size={48} />
            </h2>
            <div className="bg-blue-500 rounded-lg px-6 py-1 text-center-4 text-shadow-violet">
              {otherProfile.profile.username}
            </div>
          </div>
          <div className=" flex flex-col text-left  w-full mt-6 space-y-2 px-4 ">
            <p>Email:Email: {otherProfile.profile.email}</p>
            <p>Gender:{otherProfile.profile.gender}</p>
            <div className="flex items-center space-x-2">
              <CiLocationOn size={24} />
              <p className="flex-1 text-xs">{otherProfile.profile.city}</p>
            </div>
          </div>
        </div>
        {/* Platforms */}
        <div className="w-full flex p-6 text-white bg-lightPurple rounded-lg shadow-lg max-w-[300px] max-h-[400px] flex-col items-center m-3">
          <h2 className="p-2">Platforms</h2>

          <ul>
            {ViewOtherProfile.platforms.map((platform) => (
              <li
                key={platform.id}
                className="flex justify-between items-center  "
              >
                <span
                  className="bg-blue-500 rounded-lg px-3 py-1 text-center-4 text-shadow-violet inline-block m-2"
                  style={{ minWidth: "120px", maxWidth: "120px" }}
                >
                  {platform.brand}
                </span>
                <span
                  className="bg-blue-500 rounded-lg px-6 py-1 text-center-4 text-shadow-violet inline-block"
                  style={{ minWidth: "150px", maxWidth: "150px" }}
                >
                  {platform.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Top Games */}
        <div className="w-full flex p-6 text-white bg-lightPurple rounded-lg shadow-lg max-w-[300px] max-h-[400px] flex-col items-center m-3">
          <h2 className="p-2">Top Games</h2>

          <ul>
            {otherProfile.games.map((game) => (
              <li key={game.id} className="flex justify-between items-center  ">
                <span
                  className="bg-blue-500 rounded-lg px-3 py-1 text-center-4 text-shadow-violet inline-block m-2"
                  style={{ minWidth: "160px", maxWidth: "160px" }}
                >
                  {game.title}
                </span>
                <span
                  className="bg-blue-500 rounded-lg px-3 py-1 text-center text-shadow-violet inline-block m-2"
                  style={{ minWidth: "100px", maxWidth: "100px" }}
                >
                  {game.genres}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};


export default ViewOtherProfile;
