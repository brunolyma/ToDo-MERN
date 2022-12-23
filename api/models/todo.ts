import mongoose from "mongoose";
const Schema = mongoose.Schema;

// interface ISchema {
//   text: { type: string; required: boolean };
//   complete?: { type: boolean; default: boolean };
//   timestamp: { type: Date; default: Date };
// }

const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
