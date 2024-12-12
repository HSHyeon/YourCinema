import axios from "axios";

const API_URL = "/api/diary";

export const getMediaDiaries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addMediaDiary = async (newDiary: any) => {
  const response = await axios.post(API_URL, newDiary);
  return response.data;
};
