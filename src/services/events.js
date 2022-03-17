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

    getSelectedEvents = (category) => {
        return this.api.get(`/events/list/${category}`).then(response=> response.data)
    };

    getEvent = (id) => {
        return this.api.get(`/events/${id}`).then(response=>response.data)
    };

    getAllEvents = () => {
        return this.api.get("/events").then(response=>response.data)
    };

    getRandomEvent = () => {
          return this.api.get(`/events/random`).then(response=>response.data)
    };

    deleteEvent = (eventId, userId) => {
      return this.api.delete(`/events/${eventId}`, { data: {userId} }).then(response=>response.data)
    };

}

const eventsService = new EventsService();

export default eventsService;