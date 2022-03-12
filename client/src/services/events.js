import axios from "axios";

class EventsService {
    constructor() {
      this.api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
    }

    createEvent = (event) => {
        return this.api.post("/events", event).then(res => res.data)
    };

    getEvent = (event) => {
        return this.api.get("/events/:id", event._id).then(response=>response.data)
      };

}

const eventsService = new EventsService();

export default eventsService;