const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    producer: { type: Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    imageUrl: {type: String},
    description: String,
    category: {
      type: String,
      enum: ['Concert', 'Sport', 'Cooking', 'Cultural', 'Social', 'Other'],
      required: true
  },
    date: {type: Date, required: true},
    time: {type: String, required: true},
    duration: {type: Number, default: 1},
    location: {type: Schema.Types.ObjectId, ref: 'Space'},
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
