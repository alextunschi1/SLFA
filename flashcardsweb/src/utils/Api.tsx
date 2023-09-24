// Import the axios library
const axios = require("axios");

// Set the base URL for the API
const baseUrl = "http://localhost:4444";

// Function to make a POST request to the API
export async function postData(apiName: string, data: any) {
  try {
    // Send a POST request to the specified endpoint with the payload
    const response = await axios.post(`${baseUrl}/${apiName}`, data);
    // Return the response data
    return response.data;
  } catch (error) {
    // If an error occurs, throw the error
    throw error;
  }
}

// Function to make a GET request to the API
export async function getData(apiName: string) {
  try {
    // Send a GET request to the specified endpoint
    const response = await axios.get(`${baseUrl}/${apiName}`);
    // Return the response data
    return response.data;
  } catch (error) {
    // If an error occurs, throw the error
    throw error;
  }
}