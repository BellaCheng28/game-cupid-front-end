import api from "./apiConfig";

export const signUp = async (credentials) => {
  try {
    const resp = await api.post("/users/register/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  } catch (error) {
    console.error(
      "Sign-up Error: ",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/users/login/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  } catch (error) {
    console.error(
      "Sign-in Error: ",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const resp = await api.delete("/users/:user_Id/", credentials);
    localStorage.removeItem("token");
    // localStorage.removeItem("user");

    // const username = localStorage.getItem("user").username;

    return resp.data.user;
  } catch (error) {
    console.error(
      "Sign-in Error: ",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const resp = await api.get("/users/token/refresh/");
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  }
  return false;
};
