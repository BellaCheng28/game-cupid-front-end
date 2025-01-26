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
export const likeProfile = async (payload) => {
    const { profile_id, match_profile_id, date_matched } = payload;
    if (!profile_id || !match_profile_id || !date_matched) {
        throw new Error("profile_id, match_profile_id, and date_matched are required");
    }
    try {
        // Retrieve the token (e.g., from localStorage or another state management solution)
        const token = await localStorage.getItem('token');
        if (!token) {
            throw new Error("Token not found. Please log in again.");
        }

        // Configure the Authorization header with the Bearer token
        const response = await api.post('/profile/match/add/', {
            profile_id,
            match_profile_id,
            date_matched
        }, {
            headers: {
            Authorization: `Bearer ${token}`
            },
        });
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

export const matchProfile = async () => {
    try {
         // Retrieve the token (e.g., from localStorage or another state management solution)
      const token = localStorage.getItem('token'); // Or wherever you store the token

      // Configure the Authorization header with the Bearer token
      const response = await api.get('/profile/match/search/', {
          headers: {
              Authorization: `Bearer ${token}`, // Pass the token here
          },
      });
        return response.data;
    } catch (error) {
        console.error("Error matching profile:", error);
        throw error;
    }
}
