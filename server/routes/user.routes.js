const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model")

//GET USER profile -> /api/user/:id -  Retrieves a specific user by id
router.get("/:id", (req, res, next)=>{

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    User.findById(req.params.id)
    .then((user)=>res.status(200).json(user))
    .catch(error => res.json(error))
})

//PUT USER profile -> /api/user/:id -  Edit a specific user by id

router.put("/:id", (req, res, next)=>{
   

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    User.findByIdAndUpdate(
        req.params.id,
        req.body, {new:true})
    .then((editedUser)=>res.status(200).json(editedUser))
    .catch(error => res.json(error))
})


//DELETE USER profile -> /api/user/:id -  Delete a specific user by id

router.delete("/:id", (req, res, next)=>{

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    User.findByIdAndRemove(req.params.id)
    .then(() =>
      res.json({
        message: `User with ${req.params.id} is removed successfully.`,
      })
    )
    .catch(error => res.json(error))
})


module.exports = router;