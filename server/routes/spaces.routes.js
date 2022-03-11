const router = require("express").Router();
const mongoose = require("mongoose");

const Space = require("../models/Space.model");
      

//GET SPACE  -> /api/space/:id -  Retrieves a specific space
router.get("/:id", (req,res, next)=>{

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Space.findById(req.params.id)
    .then((space)=> res.json(space))
    .catch((error)=>res.json(error))
})


//PUT SPACE  -> /api/space/:id -  Edit a specific space
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


//POST SPACE -> /api/space/ -  Creates a space
router.post("/", (req, res, next)=>{
    const {img, name, capacity, location} = req.body

    Space.create({img, name, capacity, location})
    .then((response) => res.json(response))
    .catch((error)=> res.json(error))
})


// DELETE SPACE -> /api/space/:id -  Delete a space
router.delete("/:id", (req, res, next)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Space.findByIdAndRemove(req.params.id)
    .then(() =>
      res.json({
        message: `User with ${req.params.id} is removed successfully.`,
      })
    )
    .catch(error => res.json(error))
})


//GET SPACE  -> /api/space/ -  Retrieves all spaces

router.get("/", (req,res, next)=>{
    Space.find()
    .then((allSpaces)=> res.json(allSpaces))
    .catch((error)=>res.json(error))
})


module.exports = router;