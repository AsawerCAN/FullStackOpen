import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

export const getAllPersons = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log("API response:", response.data);
    if (!Array.isArray(response.data)) {
      console.error("API did not return an array:", response.data);
      return [];
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
    return [];
  }
};

export const createPerson = async (newPerson) => {
  try {
    const response = await axios.post(baseUrl, newPerson);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw new Error("Network error, please try again.");
    } else {
      console.error("Error creating person:", error.message);
      throw new Error("An unexpected error occurred while adding the person.");
    }
  }
};

export const deletePerson = async (id) => {
  try {
    console.log(`Sending DELETE request to ${baseUrl}/${id}`);
    const response = await axios.delete(`${baseUrl}/${id}`);
    console.log("Delete response:", response);
    return response;
  } catch (error) {
    console.error("Delete error details:", error);
    if (error.response) {
      throw new Error(
        error.response.data.error || `Server error: ${error.response.status}`
      );
    } else if (error.request) {
      console.error("Error request:", error.request);
      throw new Error("Network error, no response received");
    } else {
      console.error("Error message:", error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const updatePerson = async (id, updatedPerson) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw new Error("Network error, please try again.");
    } else {
      console.error("Error updating person:", error.message);
      throw new Error(
        "An unexpected error occurred while updating the person."
      );
    }
  }
};
