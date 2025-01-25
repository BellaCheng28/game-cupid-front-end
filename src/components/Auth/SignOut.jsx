import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {signOut} from "../../services/authService";
import { AuthedUserContext } from "../../App";

function SignOut() {
  const { setUser } = useContext(AuthedUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const signOutUser = async () => {
      await signOut();
      setUser(null);
      navigate("/");
    };
    signOutUser();
  }, []);

  return "";
}

export default SignOut;
