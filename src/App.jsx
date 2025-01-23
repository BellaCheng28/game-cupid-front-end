import { useState,createContext,useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { verifyUser } from "./services/authService";
import NavBar from "./Components/NavBar/NavBar";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import SignOut from "./Components/Auth/SignOut";
import TopGmaes from "./Components/Home/TopGames";
import PlatformList from "./Components/Home/PlatformList";
import ProfileHeader from "./Components/Home/ProfileHeader";
import MyProfile from "./Components/Home/MyProfile";
import { useLocation } from "react-router-dom";
import { BsPass } from "react-icons/bs";
import  ViewOtherProfile from "./Components/Match/ViewOtherProfile";
import MatchList from "./Components/Match/MatchList"
import { ProfileById } from "./services/profileService";
import like from "./Components/Match/Like";


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
       const fetchProfile = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = JSON.parse(storedUser); // 解析为对象
      const userId = user?.id;
        // console.log("User ID:", userId);
      if (!userId) {
        console.error("No userId found in parsed user data");
        return;
      }
      const profileData = await ProfileById(userId);
      console.log("profileData:", profileData);
      profileData ? setProfile(profileData) : setProfile(null);
      console.log("Profile data:", profileData);
    } catch (error) {
      console.error("Failed to fetch profileById:", error);
    }
  };
  
  fetchProfile();
}, []);
console.log("profile",profile);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.updatedProfile) {
      setProfile(location.state.updatedProfile); // 更新父组件的 profile 数据
    }
  }, [location]);


  return (
    <AuthedUserContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        // favoritePlatforms,
        // setFavoritePlatforms,
        // favoriteGames,
        // setFavoriteGames,
      }}
    >
      <NavBar />
      <div className="pt-16">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/top-game" element={<TopGmaes />} />
          <Route path="/platform" element={<PlatformList />} />
          <Route path="/profile/edit" element={<ProfileHeader />} />
          <Route path="/" element={<MyProfile />} />
          <Route path="/matches" element={<MatchList />} />
          <Route path="/match/otherprofileId" element={<ViewOtherProfile />} />
        </Routes>
        <Routes path= "match/like" element={<Like />}  ></Routes>
      </div>
    </AuthedUserContext.Provider>
  );
};

export default App;
