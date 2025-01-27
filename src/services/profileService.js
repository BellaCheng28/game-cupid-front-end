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

export const searchGames = async (query) => {
  try {
    const response = await api.post("/games/search/", { query });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getGames = async (userId) => {
  try {
    const response = await api.get(`/profile/games/`, {
      params: { user_id: userId }, // 添加 user_id 到查询参数
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile games:", error);
    throw error;
  }
};


// export const getGames = async (query) => {
//   try {
//     const response = await api.get("/profile/games/", { query });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching profile games:", error);
//     throw error;
//   }
// };



export const addProfileGames = async (gameData) => {
    try {
        const response = await api.post('/profile/games/add/', gameData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile games:", error);
        throw error;
    }
}

export const editProfileGames = async (userId, gameId,gameData) => {
  try {
    const response = await api.put(`/profile/games/${gameId}/edit/`, gameData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile games:", error);
    throw error;
  }
};

export const DeleteProfileGames = async (userId, gameId, gameData) => {
  try {
    const response = await api.delete(
      `/profile/games/${gameId}/edit/`,
      gameData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile games:", error);
    throw error;
  }
};


export const Platforms = async () => {
    try {
        const response = await api.get("/profile/platforms/choices/");
        return response.data;
    } catch (error) {
        console.error("Error fetching profile platforms:", error);
        throw error;
    }
}
// 获取用户平台列表
export const profilePlatforms = async (userId) => {
  try {
    const response = await api.get(`/profile/platforms/${userId}/`);
    return response.data; // 返回平台列表
  } catch (error) {
    console.error("Error fetching profile platforms:", error);
    throw error;
  }
};

// 添加新平台到用户的列表
export const addProfilePlatform = async (userId,platformData) => {
  try {
    const response = await api.post(`/profile/platforms/${userId}/`, platformData);
    return response.data; // 返回新创建的记录
  } catch (error) {
    console.error("Error adding profile platform:", error);
    throw error;
  }
};

// 更新或删除用户平台
export const editProfilePlatforms = async (userId,platformId, platformData) => {
  try {
    const response = await api.delete(
      `/profile/platforms/${platformId}/edit/`,
      platformData
    );
    return response.data; // 返回更新后的数据
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
