import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { CiSearch } from "react-icons/ci";
import { getGames } from "../../services/profileService";
import { matchProfile, likeProfile } from "../../services/matches";

const MatchList = () => {
  const [matchedUsers, setMatchedUsers] = useState([]); // List of matched users
  const [selectedMatch, setSelectedMatch] = useState(null); // Selected user
  const [games, setGames] = useState([]); // List of user's games

  const { user: currentUser } = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchGames = async () => {
      if (currentUser) {
        const fetchedGames = await getGames(currentUser.id);
        console.log("Current user id:", currentUser.id);
        setGames(fetchedGames);
        console.log("Fetched games:", fetchedGames);
      }
    };

    fetchGames();
  }, [currentUser]);

  // Find all matched users
  const findMatches = async () => {
    if (currentUser) {
      const matches = await matchProfile(currentUser.id);
      setMatchedUsers(matches);
      setSelectedMatch(null); // Reset selected user
      console.log("Matched users:", matches);
    }
  };

  const handleSelectMatch = (userId) => {
    const matchedUser = matchedUsers.find((user) => user.id === userId);
    console.log("Selected match:", matchedUser);
    if (matchedUser) {
      setSelectedMatch(matchedUser); // No need to filter again
    }
  };

  const handleLike = async () => {
    if (selectedMatch && currentUser && currentUser.id && selectedMatch.id) {
      const payload = {
        profile_id: currentUser.id - 4,
        match_profile_id: selectedMatch.id,
        date_matched: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      };
      console.log("Payload:", JSON.stringify(payload));

      try {
        console.log("Payload before likeProfile:", JSON.stringify(payload));
        await likeProfile(payload);
        const updatedProfiles = matchedUsers.map((user) => {
          if (user.id === selectedMatch.id) {
            return {
              ...user,
              liked: true, // Add liked attribute
            };
          }
          return user;
        });
        setMatchedUsers(updatedProfiles);
        console.log("Like user:", selectedMatch);
        console.log("Updated profiles:", updatedProfiles);
      } catch (error) {
        console.error("Error liking profile:", error);
      }
    } else {
      console.error("Error: profile_id, match_profile_id, and date_matched are required");
    }
  };

  return (
    // Display current user information
    <div className="p-4">
      <h1> username: {currentUser.username}</h1>
      <ul>
        {currentUser && currentUser.games && currentUser.games.map((game, index) => (
          <li key={index}>{game}</li>
        ))}
      </ul>

      {/* Find matches button */}
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={findMatches}
      >
        <CiSearch />
      </button>
      {/* Display list of matched users */}
      {matchedUsers.length > 0 && (
        <div className="mt-4">
          <h2>Matched users:</h2>
          <ul>
            {matchedUsers.map((user) => (
              <li key={user.id}>
                <button
                  className="text-blue-600 underline"
                  onClick={() => handleSelectMatch(user.id)}
                >
                  {user.username}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Display details of selected matched user */}
      {selectedMatch && (
        <div className="mt-4 border p-4 rounded bg-green-100">
          <h2>Match found!</h2>
          <p>Matched user: {selectedMatch.username}</p>
          <p>Email: {selectedMatch.email}</p>
          <ul>
            {currentUser.games && selectedMatch.games && currentUser.games.filter(game => selectedMatch.games.includes(game)).map((game, index) => (
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
    </div>
  );
};

export default MatchList;
