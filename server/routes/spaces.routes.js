const router = require("express").Router();
const mongoose = require("mongoose");

const Space = require("../models/Space.model");
const User = require("../models/User.model");

//GET SPACE  -> /api/spaces/:id -  Retrieves a specific space
router.get("/:id", (req,res, next)=>{

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Space.findById(req.params.id)
    .then((space)=> res.json(space))
    .catch((error)=>res.json(error))
})


//PUT SPACE  -> /api/spaces/:id -  Edit a specific space
router.put("/:id", (req, res, next)=>{

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Space.findByIdAndUpdate(
        req.params.id,
        req.body, {new:true})
    .then((editedSpace)=>res.status(200).json(editedSpace))
    .catch(error => res.json(error))
})


//POST SPACE -> /api/spaces/ -  Creates a space
router.post("/", (req, res, next)=>{
    const {id, name, imageUrl, availableDates, availableHours, capacity, address, allowedPets, allowedBeverages, covidTest, wheelchairAccess} = req.body

    User.findById(id)
    .then((user)=>{
        Space.create({owner: user._id, name, imageUrl, availableDates, availableHours, capacity, address, allowedPets, allowedBeverages, covidTest, wheelchairAccess})
        .then((createdSpace) =>{
            const spaceId = createdSpace._id
            User.findByIdAndUpdate(user._id, {$set: {space: spaceId}})
            .then((_)=>{
                res.json(createdSpace)})
            })
        .catch((error)=> res.json(error))
    })
})


// DELETE SPACE -> /api/spaces/:id -  Delete a space
router.delete("/:id", (req, res, next)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    User.findByIdAndUpdate(req.body.ownerId, {$unset: {space: req.params.id}})
    .then((_)=>{
        Space.findByIdAndRemove(req.params.id)
        .then(() =>
          res.json({
            message: `Space with ${req.params.id} is removed successfully.`,
          })
        )
        .catch(error => res.json(error))
    })
})


//GET SPACE  -> /api/spaces/ -  Retrieves all spaces

router.get("/", (req,res, next)=>{
    Space.find()
    .then((allSpaces)=> res.json(allSpaces))
    .catch((error)=>res.json(error))
})


module.exports = router;