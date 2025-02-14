import axios from "axios";

const baseUrl = "http://localhost:3003/persons";

export const getAllPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export const updatePerson = (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data);
};
