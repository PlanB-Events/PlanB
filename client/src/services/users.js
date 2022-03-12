import axios from "axios";

class AuthService {
  constructor() {
    console.log("REACT_APP_API_URL: ", process.env.REACT_APP_API_URL)
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
