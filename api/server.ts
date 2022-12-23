import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Todo } from "./models/todo";

const app = express();

app.use(express.json());
app.use(cors());

// ############# CRUD #############

app.get("/todos", async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", (req: Request, res: Response) => {
  const newTodo = new Todo({
    text: req.body.text,
  });
  newTodo.save();
  res.json(newTodo);
});

app.delete("/todo/delete/:id", async (req: Request, res: Response) => {
  const todoToDelete = await Todo.findByIdAndDelete(req.params.id);

  res.json(todoToDelete);
});

app.get("/todo/complete/:id", async (req: Request, res: Response) => {
  const toggleTodo = await Todo.findById(req.params.id);

  if (toggleTodo) {
    toggleTodo.complete = !toggleTodo.complete;
  } else {
    console.log("Task not found");
  }

  toggleTodo?.save();
  res.json(toggleTodo);
});

// ############ DB ################

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://brunolima:3run04!veS@cluster0.us5wa3u.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.listen(3001, () => console.log("Server start on port 3001"));
