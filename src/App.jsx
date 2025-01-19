import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { verifyUser } from "./services/authService";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import SignOut from "./Components/Auth/SignOut";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();
  }, []);

  return (
    <>
      <NavBar user={user} />
      <Routes>
        <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
        <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;
