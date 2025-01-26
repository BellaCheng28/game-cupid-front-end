import React, { useState, useEffect } from 'react';
import { MatchUser, addMatchUser } from "../../services/matcheService";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiHeartAdd2Line } from "react-icons/ri";

import { MdOutlineDelete } from "react-icons/md";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [matchProfileGame, setMatchProfileGame] = useState('');
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await MatchUser();
        console.log(response);
        setMatches(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);
  console.log("matches",matches);

 
  const chooseMatchProfile = (e) => {
    setMatchProfileGame(e.target.value);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMatchUser({
        
      });
      setSuccess('Match successfully added!');
      setMatchProfileGame("");
    } catch (err) {
      setError(err.message);
    }
  }
 const handleLikeClick = (match) => {
   // Check if the game matches before adding the match
   if (match.game === matchProfileGame) {
     setSuccess(`Match with ${match.username} was successful!`);
     // You can implement additional logic for updating state or backend here
   } else {
     setError("No match found for the selected game.");
   }
 };

  const handleDelete = (matchId) => {
    // Handle delete logic (update state to remove the match from the list)
    setMatches(matches.filter((match) => match.id !== matchId));
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
                <Link
                  to="/like"
                  className="text-red-500 hover:text-red-600 transition duration-200"
                  title="Like"
                >
                  <RiHeartAdd2Line size={30} />
                </Link>
                <Link
                  to="/otherProfile"
                  className="text-green-500 hover:text-green-700 transition duration-200"
                >
                  ViewProfile
                </Link>
                <button
                  className="text-gray-300 hover:text-red-500 transition duration-200"
                  title="Delete"
                >
                  <MdOutlineDelete size={30} />
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