import axios from "axios";

class SpacesService {
    constructor() {
      this.api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
    }

    createSpace = (requestBody) => {
        return this.api.post("/spaces", requestBody).then(res => res.data)
    };

    //??
    getAllSpaces = () => {
        return this.api.get(`/spaces`).then(response=>response.data)
      };

}

const spacesService = new SpacesService();

export default spacesService;