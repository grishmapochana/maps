import { API_ROUTES } from "../utils/constants.js";
import axios from "axios";

export async function getCities() {
  try {
    const cities = await axios.get(API_ROUTES.GET_CITIES);
    console.log({ cities });
    return cities.data.data;
  } catch (e) {
    return e;
  }
}
export async function shortestPath(cities) {
  try {
    const pth = await axios.post(API_ROUTES.SHORTEST_PATH, cities);
    console.log(pth.data.data);
    return pth.data.data;
  } catch (e) {
    return e;
  }
}
