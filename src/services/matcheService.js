import api from "./apiConfig.js";

export const MatchUser = async (query) => {
  try {
    const response = await api.get("profile/match/search/");
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};



export const addMatchUser = async () => {
    try {
        const response = await api.post("profile/match/add/");
        return response.data;
    } catch (error) {
        console.error("Error liking profile:", error);
        throw error;
    }
}

export const showMatchUser = async () => {
  try {
    const response = await api.post("profile/match/userId/");
    return response.data;
  } catch (error) {
    console.error("Error liking profile:", error);
    throw error;
  }
};




export  const blockProfile = async () => {
    try {
        const response = await api.put('/matches/block');
        return response.data;
    } catch (error) {
        console.error("Error blocking profile:", error);
        throw error;
    }
}

export const createLikes = async (likeData) => {
    try {
        const response = await api.post('/matches/like/new', likeData);
        return response.data;
    } catch (error) {
        console.error("Error creating like:", error);
        throw error;
    }
}

export const createBlocks = async (blockData) => { 
    try {
        const response = await api.post('/matches/block/new', blockData);
        return response.data;
    } catch (error) {
        console.error("Error creating block:", error);
        throw error;
    }
}

export const viewLikes = async () => {
    try {
        const response = await api.get('/matches/like/get');
    } catch (error) {
        console.error("Error fetching likes:", error);
        throw error;
    }
}

export const getBlocks = async () => {
    try {
        const response = await api.get('/matches/blocks/get')
    } catch (error) {
        console.error("Error fetching blocks:", error);
        throw error;
    }
}