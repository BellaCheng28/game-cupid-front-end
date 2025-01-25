import api from "./apiConfig.js";

export const viewMatches = async () => {
    try {
        const response = await api.get('/matches/view');
        return response.data;
    } catch (error) {
        console.error("Error fetching matches:", error);
        throw error;
    }
}

export const likeProfile = async (userid) => {
    if (!userid) {
        throw new Error("userid is required");
    }
    try {
        const response = await api.post(`profile/match/10`, { userid });
        console.log(userid);
        return response.data;
    } catch (error) {
        console.error("Error liking profile:", error);
        throw error;
    }
}

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