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
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching profileById data:", error);
    throw error;
  }
};

export const editProfile = async (profileData) => {
    try {
        const response = await api.put('/profile/edit', profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile data:", error);
        throw error;
    }
}

export const deleteProfile = async () => {
    try {
        const response = await api.delete('/profile/delete');
        return response.data;
    } catch (error) {
        console.error("Error deleting profile:", error);
        throw error;
    }
};


export const viewOtherProfile = async (profile_id) => {
  try {
    const response = await api.get(`/profile/${profile_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching other profile data:", error);
    throw error;
  }
};

export const profileGames = async () => {
    try {
        const response = await api.get(`/profile/games`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile games:", error);
        throw error;
    }
}

export const editProfileGames = async (gameData) => {
    try {
        const response = await api.put('/profile/games', gameData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile games:", error);
        throw error;
    }
}

export const profilePlateforms = async () => {
    try {
        const response = await api.get(`/profile/platforms`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile platforms:", error);
        throw error;
    }
}

export const editProfilePlatforms = async (platformData) => {
    try {
        const response = await api.put('/profile/platforms', platformData);
    } catch (error) {
        console.error("Error updating profile platforms:", error);
        throw error;
    }
}


export const genre_scores = async () => {
    try {
        const response = await api.get(`/profile/genre_scores`);
    } catch (error) {
        console.error("Error fetching profile platforms:", error);
        throw error;
    }
}

