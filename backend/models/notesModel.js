const { Schema, model } = require("mongoose");

const notesSchema = new Schema(
  {
    name: {
      type: String,
    },
    content: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Make sure this matches your User model name
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = model("notes", notesSchema);
module.exports = Notes;
