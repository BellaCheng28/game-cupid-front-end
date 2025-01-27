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



export const addMatchUser = async (data) => {
  try {
    const response = await api.post("profile/match/add/", data);
    return response.data;
  } catch (error) {
    console.error("Error liking profile:", error);
    throw error;
  }
};

export const showMatchUser = async () => {
  try {
    const response = await api.get("profile/match/userId/");
    return response.data;
  } catch (error) {
    console.error("Error liking profile:", error);
    throw error;
  }
};


export const addBlockUser = async (data) => {
  try {
    const response = await api.post("profile/block/add/", data);
    return response.data;
  } catch (error) {
    console.error("Error block profile:", error);
    throw error;
  }
};

export  const deleteBlockUser = async (blockId) => {
  try {
    const response = await api.delete(`/profile/block/${blockId}/`, { blockId });
    return response.data;
  } catch (error) {
    console.error("Error blocking profile:", error);
    throw error;
  }
};

