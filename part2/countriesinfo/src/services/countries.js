import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

export const getCountries = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
