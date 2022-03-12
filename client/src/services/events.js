import axios from "axios";

class EventsService {
    constructor() {
      this.api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
    }

    createEvent = (requestBody) => {
        return this.api.post("/events", requestBody).then(res => res.data)
    };

    getEvent = (id) => {
        return this.api.get(`/events/${id}`).then(response=>response.data)
      };

}

const eventsService = new EventsService();

export default eventsService;