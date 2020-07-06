import axios from "axios";

const baseUrl = "http://localhost:3000/";
const customAxios = axios.create({ baseURL: baseUrl });

// get the data from localstorage
export const getGameData = async () => {
  const result = await customAxios.get("/game_data");

  if (result.status === 200) {
    return result.data;
  }
  throw new Error("Oh snap something bad happened!");
};

// reveal a particular cell
export const revealCell = async id => {
  const result = await customAxios.put(`/cell/${id}`);

  if (result.status === 200) {
    return result.data;
  }
  throw new Error("Oh snap something bad happened!");
};
