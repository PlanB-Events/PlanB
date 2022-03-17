const { Schema, model } = require("mongoose");

const spaceSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: String,
    availableDates: [{type: Date, min: 1, required: true}],
    availableHours: [{type: String, min: 1, required: true}],
    capacity: {type: Number, required: true},
    address: {
        direction: String,
        coordinates: [{type: Number}]
    },
    allowedPets: false,
    allowedBeverages: false,
    covidTest: false,
    wheelchairAccess: false
  }
);

const Space = model("Space", spaceSchema);

module.exports = Space;