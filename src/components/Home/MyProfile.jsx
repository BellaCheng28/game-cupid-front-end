import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { CiLocationOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

// favoritePlatforms, favoriteGames
const MyProfile = () => {
  const { user, profile, userPlatforms, setUserPlatforms, favoriteGames } =
    useContext(AuthedUserContext);
  // console.log("user", user);
  // console.log("profile", profile);
  return (
    <>
      <div className="min-h-screen p-4 bg-gradient-to-b from-violet-950 to-violet-800 flex flex-row flex-wrap justify-evenly">
        {/* Profile */}
        {profile ? (
          <div className="w-full flex p-6 text-white bg-lightPurple rounded-lg shadow-lg max-w-[300px] max-h-[400px] flex-col items-center m-3">
            <div className="relative w-full flex justify-end">
              <Link to="/profile/edit">
                <button className="absolute -top-4 -right-4 text-white bg-blue-500 hover:bg-violet-800 p-2 rounded-full shadow-md">
                  <CiEdit />
                </button>
              </Link>
            </div>
            <div>
              <h2 className="flex items-center justify-center space-x-4 mt-4">
                <CiUser size={48} />
              </h2>
              <div className="bg-blue-500 rounded-lg px-6 py-1 text-center-4 text-shadow-violet">
                {profile.username}
              </div>
            </div>
            <div className=" flex flex-col text-left  w-full mt-6 space-y-2 px-4 ">
              <p>Email:{profile.email}</p>
              <p>Gender:{profile.gender}</p>
              <div className="flex items-center space-x-2">
                <CiLocationOn size={24} />
                <p className="flex-1 text-xs">{profile.city}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex p-6 text-white bg-lightPurple rounded-lg shadow-lg max-w-[300px] max-h-[400px] flex-col items-center m-3">
            <p>No profile available.</p>
          </div>
        )}

        {/* Platforms */}
        <div className="w-full flex p-6 text-white bg-lightPurple rounded-lg shadow-lg max-w-[300px] max-h-[400px] flex-col items-center m-3">
          <h2 className="p-2">Platforms</h2>
          <div className="relative w-full flex justify-end">
            <Link to="/brand">
              <button className="absolute -top-14 -right-4 text-white bg-blue-500 hover:bg-violet-800 p-2 rounded-full shadow-md">
                <CiEdit />
              </button>
            </Link>
          </div>
          <ul>
            {userPlatforms.map((platform) => (
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
          <div className="relative w-full flex justify-end">
            <Link to="/mygames">
              <button className="absolute -top-14 -right-4 text-white bg-blue-500 hover:bg-violet-800 p-2 rounded-full shadow-md">
                <CiEdit />
              </button>
            </Link>
          </div>
          <ul>
            {favoriteGames.map((game) => (
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
                  {game.fav_rank}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
