import api from "./apiConfig.js";

export const viewProfile = async() => {
    try {
        
        const response = await api.get('/profile/');
        console.log(response);
        return response.data;
       
    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw error;
    }
};
export const ProfileById = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profileById data:", error);
    throw error;
  }
};

export const editProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/profile/${userId}/edit/`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile data:", error);
    throw error;
  }
};



export const viewOtherProfile = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching other profile data:", error);
    throw error;
  }
};

export const getGames = async () => {
    try {
        const response = await api.get('/profile/games/');
        return response.data;
    } catch (error) {
        console.error("Error fetching profile games:", error);
        throw error;
    }
}

export const editGames = async (gameData) => {
    try {
        const response = await api.put('/profile/games/add/', gameData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile games:", error);
        throw error;
    }
}

export const editProfileGames = async (gameData) => {
  try {
    const response = await api.put(`/profile/games/${userId}/edit/`, gameData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile games:", error);
    throw error;
  }
};


export const profilePlateforms = async (userId) => {
    try {
        const response = await api.get(`/profile/platforms/${userId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile platforms:", error);
        throw error;
    }
}

export const editProfilePlatforms = async (userId, platformData) => {
  try {
    const response = await api.put(
      `/profile/platforms/${userId}/edit/`,
      platformData
    );
    return response.data; // Return the updated data
  } catch (error) {
    console.error("Error updating profile platforms:", error);
    throw error;
  }
};

export const editGenres = async (genreData) => {
    try {
        const response = await api.put("genre-scores/edit/", genreData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile genres:", error);
        throw error;
    }
}
