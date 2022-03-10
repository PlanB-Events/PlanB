const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImg: {type: String, default: "https://cdn-icons-png.flaticon.com/512/456/456212.png"},
    space: {type: Schema.Types.ObjectId, ref: 'Space'},
    joinedEvents: [{type: Schema.Types.ObjectId, ref: 'Event', default: []}],
    createdEvents: [{type: Schema.Types.ObjectId, ref: 'Event', default: []}]
  }
);

const User = model("User", userSchema);

module.exports = User;
