import React, { useState, useEffect, useContext } from "react";
import {
  MatchUser,
  addMatchUser,
  addBlockUser,
  deleteBlockUser,
} from "../../services/matcheService";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiHeartAdd2Line } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { AuthedUserContext } from "../../App";
import { FaHeartCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ProfileById } from "../../services/profileService.js";
const MatchList = () => {
  const navigate = useNavigate();
  const { user, matches, setMatches } = useContext(AuthedUserContext);

  const [matchProfile, setMatchProfile] = useState("");
  const [blockProfile, setBlockProfile] = useState("");
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = user.id;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await MatchUser();
        setMatches(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);


   const handleMatchClick = (matchId) => {
     // 使用 matches.find 获取选中的 match 对象
     const match = matches.find((m) => m.id === matchId);

     if (match) {
       setMatchProfile(match); // 更新选中的匹配用户
     } else {
       console.log("Match not found");
     }
   };

  const handleSubmit = async (e, userId, match) => {
    e.preventDefault();
    if (!match || !match.id) {
      setError("no match user!");
      return;
    }

    const dateMatched = new Date().toISOString().split("T")[0];
    const profile = await ProfileById(userId)
    const profileId = profile.id
    // 创建符合后端需求的数据结构

    const data = {
      profile_id: profileId, // 当前用户的 ID
      match_profile_id: match.id,// 被点赞用户的 ID
      date_matched: dateMatched, // 当前时间（ISO 格式）
    };
    console.log(data)

    try {
      await addMatchUser(data);
      setSuccess("Match successfully added!");
      setMatchProfile("");
      navigate("/like", { state: { welcome: true, matchProfile: match } });

    } catch (err) {
      setError(err.message);
    }
  };

 const handleBlockClick = (matchId) => {

   const block = matches.find((b) => b.id === matchId);

   if (block) {
     setBlockProfile(block); // 更新选中的匹配用户

   } else {
     console.log("Match not found");
   }
 }; 

 const handleBlockSubmit = async (e, userId, block) => {
     e.preventDefault();

     if (!block || !block.id) {
       setError("no block user!");
       return;
     }

     const dateBlocked = new Date().toISOString().split("T")[0];
     const profile = await ProfileById(userId)
     const profileId = profile.id
     // 创建符合后端需求的数据结构
     const data = {
       profile_id: profileId, // 当前用户的 ID
       blocked_profile_id: block.id, // 被点赞用户的 ID
       date_blocked: dateBlocked, // 当前时间（ISO 格式）
     };
     try {
       const response = await addBlockUser(data); // 假设响应中包含 block 详情，像是 `id`
       setSuccess("Block successfully added!");
       // 获取新创建的 block ID（假设后端返回了该信息）
       const newBlockId = response.id;
        
       // 在这里调用 handleDelete 进行删除
       //await handleDelete(newBlockId);

       // 清空 blockProfile 状态
       setBlockProfile("");

     } catch (err) {
       setError(err.message);
     }
   };

  const handleDelete = async (blockId) => {
    try {
      await deleteBlockUser(blockId);
     setMatches((prevMatches) =>
       prevMatches.filter((block) => block.id !== blockId)
     );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-8 bg-gradient-to-b from-violet-950 to-violet-800  min-h-screen">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Profile Matches
      </h1>
      <ul className="flex flex-wrap justify-center gap-8">
        {matches.map((match) => (
          <li
            key={match.id}
            className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center"
          >
            <div className="w-full max-w-[320px] bg-lightPurple rounded-lg shadow-lg flex flex-col items-center p-6 text-white">
              {/* user */}
              <FaRegUser size={60} className="text-purple-200" />
              <h2 className="mt-4 text-xl font-semibold">{match.username}</h2>

              {/* like and delete */}
              <div className="flex justify-between items-center w-3/4 mt-6">
                <RiHeartAdd2Line
                  className="cursor-pointer text-red-500 hover:text-red-600"
                  size={30}
                  onClick={(e) => {
                    handleMatchClick(match.id); // 设置当前点击的 match profile ID
                    handleSubmit(e, userId, match); // 提交数据
                  }}
                />

                <Link
                  to={`/otherProfile/${match.id}`}
                  className="text-green-500 hover:text-green-700 transition duration-200"
                >
                  ViewProfile
                </Link>
                <button
                  className="text-gray-300 hover:text-red-500 transition duration-200"
                  title="Delete"
                >
                  <FaHeartCircleXmark
                    size={30}
                    onClick={(e) => {
                      handleBlockClick(match.id); // 设置当前点击的 match profile ID
                      handleBlockSubmit(e, userId, match); // 提交数据
                    }}
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;