const router = require("express").Router();

const Event = require("../models/Event.model");
const User = require("../models/User.model");



// GET "/api/events/futureevents"

router.get("/list/:category", (req, res, next)=>{
    let currentDate = new Date;
    currentDate.setHours(0, 0, 0, 0)

    Event.find({"date": {$gte: currentDate}})
    .populate("space")
    .then((events)=> {
        const selectedEvents =  events.map((event)=>{
            if(req.params.category === "all") return event
            else if (event.category.toLowerCase() === req.params.category) return event
            else return false
        }).filter(Boolean);
        res.json(selectedEvents)
    })
    .catch((error)=>res.json(error))
})


// GET "/api/events/random"	- Show a random event with details
router.get("/random", (req, res, next)=>{

    Event.find()
    .populate("space")
    .then((events)=> {
        const randomIndex = Math.floor(Math.random()* events.length)
        res.json(events[randomIndex])
    })
    .catch((error)=>res.json(error))
})

// GET EVENT "/api/events/:id" - Show a specific event with details
router.get("/:id", (req, res, next)=>{



    Event.findById(req.params.id)
    .populate("space")
    .then((event)=> res.json(event))
    .catch((error)=>res.json(error))
})

// PUT "/api/events/:id" - Edit an event
router.put("/:id", (req, res, next)=>{
 if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
    Event.findByIdAndUpdate(
        req.params.id,
        req.body, {new:true})
    .populate("space")
    .then((editedEvent)=>res.status(200).json(editedEvent))
    .catch(error => res.json(error))
})

// DELETE "/api/events/:id"	
router.delete("/:id", (req, res, next)=>{

    console.log("DATAAA", req.body)

    User.findByIdAndUpdate(req.body.userId, {$pull: {createdEvents: req.params.id}})
    .then((_)=>{
        Event.findByIdAndRemove(req.params.id)
        .then(() =>
          res.json({
            message: `User with ${req.params.id} is removed successfully.`,
          })
        )
        .catch(error => res.json(error))
    })
})

router.get("/pastevents", (req, res, next)=>{

    Event.find()
    .populate("space")
    .then((events)=> {
        let currentDate = new Date.toString()
        const pastEvents = events.map((event)=>{
            event.date.toString() < currentDate
        })
        res.json(pastEvents)
    })
    .catch((error)=>res.json(error))
})


router.get("/", (req, res)=>{
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    Event.find({"date": {$gte: date}})
    .populate("space")
    .then((events)=>{res.json(events)})
})

// POST "/api/events" - Create an event
router.post("/", (req, res, next)=>{
    const {space, id, title, imageUrl, category, description, date, time, duration} = req.body

    User.findById(id)
    .then((user)=>{
        Event.create({space, producer: user._id, title, imageUrl, category, description, date, time, duration})
        .then((createdEvent) => {
            User.findByIdAndUpdate(user._id, {$push: {createdEvents: createdEvent._id}})
            .then((_)=>{
                res.json(createdEvent);
            })
        })
        .catch((error)=> res.json(error))
        
    })
})



module.exports = router;