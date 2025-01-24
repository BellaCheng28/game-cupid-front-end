import { useState,createContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { verifyUser } from "./services/authService";
import NavBar from "./Components/NavBar/NavBar";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import SignOut from "./Components/Auth/SignOut";
import TopGmaes from "./Components/Home/TopGames";
import PlatformList from "./Components/Home/PlatformList";
import ProfileHeader from "./Components/Home/ProfileHeader";
import MyProfile from "./Components/Home/myProfile";
import { useLocation } from "react-router-dom";
import { BsPass } from "react-icons/bs";
import  ViewOtherProfile from "./Components/Match/ViewOtherProfile";
import MatchList from "./Components/Match/MatchList"
import { ProfileById } from "./services/profileService";
import { signOut } from "./services/authService";
import About from "./Components/About/About";
import Platform from "./Components/Home/Platform";

export const AuthedUserContext = createContext(null);

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoritePlatforms, setFavoritePlatforms] = useState([]);
  const[favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();

  }, []);
  // console.log("user", user);

  // 根据用户 ID 获取资料
  useEffect(() => {
    if (user && user.id) {
      const fetchProfile = async () => {
        try {
          const profileData = await ProfileById(user.id);
          setProfile(profileData || null);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.updatedProfile) {
      setProfile(location.state.updatedProfile); // 更新父组件的 profile 数据
    }
  }, [location]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
const handleSignout = () => {
   signOut();
   setUser(null);
}

  return (
    <AuthedUserContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        favoritePlatforms,
        setFavoritePlatforms,
        favoriteGames,
        setFavoriteGames,
      }}
    >
      <NavBar handleSignout={handleSignout} />
      <div className="pt-16">
        <Routes>
          {user ? (
            <>
              <Route path="/top-game" element={<TopGmaes />} />
              <Route path="/platform" element={<PlatformList />} />
              <Route path="/profile/edit" element={<ProfileHeader />} />
              <Route path="/" element={<MyProfile />} />
              <Route path="/matches" element={<MatchList />} />
              <Route path="/paltforms" element={<MatchList />} />
              <Route
                path="/match/otherprofileId"
                element={<ViewOtherProfile />} 
              />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </>
          ) : (
            <>
              <Route path="/" element={<SignIn />} />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </>
          )}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </AuthedUserContext.Provider>
  );
};

export default App;
