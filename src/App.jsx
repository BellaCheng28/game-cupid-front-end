import { useState,createContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { verifyUser } from "./services/authService";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import SignOut from "./components/Auth/SignOut";
import TopGames from "./components/Home/TopGames";
// import MyGames from "./Components/Home/MyGames";
import PlatformList from "./components/Home/PlatformList";
import Platform from "./components/Home/Platform";
import ProfileHeader from "./components/Home/ProfileHeader";
import MyProfile from "./components/Home/myProfile";
import { useLocation } from "react-router-dom";
import { BsPass } from "react-icons/bs";
import  ViewOtherProfile from "./components/Match/ViewOtherProfile";
import MatchList from "./components/Match/MatchList"
import { ProfileById } from "./services/profileService";
import { signOut } from "./services/authService";
import About from "./Components/About/About";


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
              <Route path="/top-game" element={<TopGames />} />
              <Route path="/platform" element={<PlatformList />} />
              <Route path="/profile/edit" element={<ProfileHeader />} />
              <Route path="/" element={<MyProfile />} />
              <Route path="/matches" element={<MatchList />} />
              <Route path="/brand" element={<Platform />} />
              {/* <Route path="/mygames" element={<MyGames />} /> */}

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
