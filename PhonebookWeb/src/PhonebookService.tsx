import axios from "axios";

const App_URL = "https://localhost:7206/Phonebook";

export const getPhonebookList = async () => {
  try {
    const res = await axios.get(App_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching phonebook list: ", err);
    throw err;
  }
};

export const addPhonebookEntry = async (entry: {
  name: string;
  number: string;
}) => {
  try {
    const response = await axios.post(App_URL, entry);
    return response.data;
  } catch (error) {
    console.error("Error adding phonebook entry:", error);
    throw error;
  }
};

export const editPhonebookEntry = async (entry: {
  id: string;
  name: string;
  number: string;
}) => {
  try {
    const response = await axios.put(`${App_URL}/${entry.id}`, entry);
    return response.data;
  } catch (error) {
    console.error("Error editing phonebook entry:", error);
    throw error;
  }
};

export const deletePhonebookEntry = async (id: string) => {
  try {
    const response = await axios.delete(`${App_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting phonebook entry:", error);
    throw error;
  }
};
