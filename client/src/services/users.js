import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    }

    editUser = (id, requestBody) => {
      return this.api.put(`/user/${id}`, requestBody).then(response=> response.data)
    }

    getUser = (id) =>{
        return this.api.get(`/user/${id}`).then(response=> response.data)
    }
}

const userService = new UserService();

export default userService;