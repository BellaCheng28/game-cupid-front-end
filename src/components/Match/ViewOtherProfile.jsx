import React, { useEffect, useState ,useContext} from "react";
import { CiUser } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { AuthedUserContext } from "../../App";
import { useParams } from "react-router-dom";
import {
  ProfileById,
  getGames,
  profilePlatforms,
} from "../../services/profileService.js";
const ViewOtherProfile = () => {
    const { matches } = useContext(AuthedUserContext); 
    const { userId } = useParams(); 
     const [games, setGames] = useState([]);
    const [platforms, setPlatforms] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    const [otherProfile, setOtherProfile] = useState(null);
   useEffect(() => {
     if (userId && matches.length > 0) {
       const profile = matches.find((match) => match.id === parseInt(userId));
       setOtherProfile(profile);
     }
   }, [userId, matches]);

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      // 并行请求 platforms 和 games 数据
      const [gamesData, platformsData] = await Promise.all([
        getGames(userId),
        profilePlatforms(userId),
      ]);
      console.log("gamedata", gamesData);
      console.log("platformsData", platformsData);
      setGames(gamesData);
      setPlatforms(platformsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  if (userId) {
    fetchUserData(); // 当 userId 存在时加载数据
  }
}, [userId]);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
   if (!otherProfile) {
     return <div>Loading...</div>;
   }
   

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
              {otherProfile.username}
            </div>
          </div>
          <div className=" flex flex-col text-left  w-full mt-6 space-y-2 px-4 ">
            <p> Email: {otherProfile.email}</p>
            <p>Gender: {otherProfile.gender}</p>
            <div className="flex items-center space-x-2">
              <CiLocationOn size={24} />
              <p className="flex-1 text-xs">{otherProfile.city}</p>
            </div>
          </div>
        </div>
        {/* Platforms */}
        <div className="w-full flex p-6 text-white bg-lightPurple rounded-lg shadow-lg max-w-[300px] max-h-[400px] flex-col items-center m-3">
          <h2 className="p-2">Platforms</h2>

          <ul>
            {platforms.map((platform) => (
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
            {games.map((game) => (
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
                  {Array.isArray(game.genre)
                    ? game.genre.join(", ")
                    : game.genre}
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
