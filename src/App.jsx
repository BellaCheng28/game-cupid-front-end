import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { verifyUser, signOut } from "./services/authService";
import { ProfileById } from "./services/profileService";
import Like from "./components/Match/Like";

import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import TopGames from "./components/Home/TopGames";
import PlatformList from "./components/Home/PlatformList";
import Platform from "./components/Home/Platform";
import ProfileHeader from "./components/Home/ProfileHeader";
import MyProfile from "./components/Home/MyProfile"; // Fixed casing
import ViewOtherProfile from "./components/Match/ViewOtherProfile";
import MatchList from "./components/Match/MatchList";
import About from "./components/About/About"; // Fixed casing

// Context for authenticated user and profile
export const AuthedUserContext = createContext(null);

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoritePlatforms, setFavoritePlatforms] = useState([]);
  const [profileGames, setprofileGames] = useState([]);

  // Fetch authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await verifyUser();
        setUser(user || null);
      } catch (err) {
        console.error("Failed to verify user:", err);
        setError("Failed to verify user. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch user profile by user ID
  useEffect(() => {
    if (user?.id) {
      const fetchProfile = async () => {
        try {
          const profileData = await ProfileById(user.id);
          setProfile(profileData || null);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          setError("Failed to load profile. Please try again.");
        }
      };
      fetchProfile();
    }
  }, [user]);

  // Update profile if navigation state contains updated profile
  useEffect(() => {
    if (location.state?.updatedProfile) {
      setProfile(location.state.updatedProfile);
    }
  }, [location]);

  // Sign out logic
  const handleSignOut = () => {
    signOut();
    setUser(null);
    setProfile(null);
    navigate("/sign-in"); // Redirect to sign-in page
  };

  // Loading/Error Handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <AuthedUserContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        favoritePlatforms,
        setFavoritePlatforms,
        profileGames,
        setprofileGames,
      }}
    >
      
      <NavBar handleSignout={handleSignOut} />
      <div className="pt-16">
        <Routes>

          {user ? (
            <>
              <Route path="/top-game" element={<TopGames />} />
              <Route path="/platform" element={<PlatformList />} />
              <Route path="/profile/edit" element={<ProfileHeader />} />
              <Route path="/" element={<MyProfile />} />
              <Route path="/matches" element={<MatchList />} />
              <Route path="/brand" element={<Platform />} />
              <Route path="/match/:otherProfileId" element={<ViewOtherProfile />} />
              <Route path="/about" element={<About />} />
            </>
          ) : (
            <>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
            </>
          )}
          {/* Redirect unmatched routes */}
          <Route path="*" element={<Navigate to={user ? "/" : "/sign-in"} />} />
        </Routes>
       
      </div>
    </AuthedUserContext.Provider>
  );
};

export default App;
