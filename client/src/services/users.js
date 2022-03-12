import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    }

    getUser = (id) =>{
        return this.api.get(`/user/${id}`).then(response=> response.data)
    }
}

const userService = new UserService();

export default userService;