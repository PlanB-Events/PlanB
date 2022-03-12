const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    producer: { type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: String,
    date: {type: Date, required: true},
    time: {type: String, required: true},
    duration: {type: Number, default: 1},
    location: {type: Schema.Types.ObjectId, ref: 'Space', required: true},
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
