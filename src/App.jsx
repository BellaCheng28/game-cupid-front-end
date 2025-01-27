import { useState,createContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { verifyUser, deleteUser } from "./services/authService";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import SignOut from "./Components/Auth/SignOut";
import MyGames from "./Components/Home/MyGames";
import Landing from "./components/Landing/Landing";
import Platform from "./Components/Home/Platform";
import ProfileHeader from "./Components/Home/ProfileHeader";
import MyProfile from "./Components/Home/myProfile";
import { useLocation } from "react-router-dom";
import { BsPass } from "react-icons/bs";
import  ViewOtherProfile from "./Components/Match/ViewOtherProfile";
import Like from "./components/Match/Like";
import MatchList from "./components/Match/MatchList"
import {
  ProfileById,
  profilePlatforms,
  getGames,
} from "./services/profileService";
import { signOut } from "./services/authService";



export const AuthedUserContext = createContext(null);

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPlatforms, setUserPlatforms] = useState([]);
  const[favoriteGames, setFavoriteGames] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();

  }, []);
 

  // 根据用户 ID 获取资料
  useEffect(() => {
    if (user && user.id) {
      const fetchData = async () => {
        try {
          setLoading(true); // 数据加载时设置为 true
          const profileData = await ProfileById(user.id);
          const platformData = await profilePlatforms(user.id);
          const gameData = await getGames(user.id);
          setProfile(profileData || null);
          setUserPlatforms(platformData);
          setFavoriteGames(gameData);
          setLoading(false); // 数据加载完成时设置为 false
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          setLoading(false); // 错误时也设置为 false
          setError("Failed to load data");
        }
      };
      fetchData();
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

const handleDeleteUser = async () => {
   deleteUser();
    setUser(null);
}
  return (
    <AuthedUserContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        userPlatforms,
        setUserPlatforms,
        favoriteGames,
        setFavoriteGames,
        matches,
        setMatches,
      }}
    >
      <NavBar
        handleSignout={handleSignout}
        handleDeleteUser={handleDeleteUser}
      />
      <div className="pt-16">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/mygames" element={<MyGames />} />
              <Route path="/platform" element={<Platform />} />
              <Route path="/profile/edit" element={<ProfileHeader />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/matches" element={<MatchList />} />
              <Route
                path="/otherProfile/:userId"
                element={<ViewOtherProfile />}
              />
              <Route
                path="/otherProfile/:userId"
                element={<ViewOtherProfile />}
              />
              {/* <Route path="/mygames" element={<MyGames />} /> */}

              <Route path="/like" element={<Like />} />
            </>
          ) : (
            <>
              <Route path="*" element={<SignIn />} />
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
