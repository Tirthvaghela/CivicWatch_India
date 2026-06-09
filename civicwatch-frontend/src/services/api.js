//For API calls to the backend, we will use axios. This file will be used to create an instance of axios with a base URL, so we can easily make API calls throughout our application without having to specify the base URL each time.

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export default API;