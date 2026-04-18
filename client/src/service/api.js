import axios from 'axios'; 


const API = process.env.REACT_APP_API_URL;

export const addUser = async(data) => {
  try {
    await axios.post(`${API}/add`, data)
  } catch (error) {
    console.log('Error while addUser API', error.message);
  }
}

export const getUsers = async() => {
  try {
    let response = await axios.get(`${API}/users`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error while calling getuser', error.message);
    return []; // Return empty array on error to prevent filter issues
  }
}

export const setConversation = async(data) => {
  try {
    await axios.post(`${API}/conversation/add`, data)
  } catch (error) {
    console.log('Error while setting conversation', error.message);
  }
}
export const getConversation = async(data) => {
  try {
   let response = await axios.post(`${API}/conversation/get`, data)
   return response.data;
  } catch (error) {
    console.log('Error while getting conversation', error.message);
  }
}

export const newMessage = async(data) => {
  try {
    await axios.post(`${API}/message/add`, data)
  } catch (error) {
    console.log('Error while sending new message api', error.message);
  }
}

export const getMessages = async(id) => {
  try {
    let response = await axios.get(`${API}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error while getting messages', error.message);
  }
}

export const uploadFile = async(data) => {
  try {
    let response = await axios.post(`${API}/file/upload`, data);
    return response.data;
  } catch (error) {
    console.log('Error while uploading file', error.message);
  }
}