import { useEffect, useRef, useState } from "react";

const Model = [
  {
    _id: "01",
    text: "",
    complete: false,
    timestamp: Date.now().toString(),
  },
];

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState(Model);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => setPopupActive(true);
  if (popupActive) {
    setTimeout(() => {
      ref.current?.focus();
    }, 100);
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const response = await fetch(API_BASE + "/todos");
    const result = await response.json();

    return setTodos(result);
  }

  async function addTodo(task: string) {
    const response = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task }),
    });
    // const data = await response.json();

    setPopupActive(false);
    setNewTodo("");
    getTodos();
  }

  const completeTodo = async (id: string) => {
    const response = await fetch(API_BASE + "/todo/complete/" + id);
    const data = await response.json();

    todos.map((todo) => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }
    });

    return setTodos(todos), getTodos();
  };

  const deleteTodo = async (id: string) => {
    const response = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    });
    // const data = await response.json();

    return getTodos();
  };

  return (
    <main className="p-10">
      <h1 className="text-[4rem] font-black mb-8">Welcome, Bruno</h1>
      <h4 className="text-xl text-light-alt font-semibold uppercase mb-4">
        Your Tasks
      </h4>

      <div className="todos">
        {todos &&
          todos.map((todo) => (
            <div
              key={todo._id}
              className={"todo " + (todo.complete ? "is-complete" : "")}
            >
              <div
                className="checkbox"
                onClick={() => completeTodo(todo._id)}
              ></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                🗑️
              </div>
            </div>
          ))}
      </div>

      <div className="addPopup" onClick={handleClick}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div
            className="closePopup"
            onClick={() => {
              setPopupActive(false);
            }}
          >
            x
          </div>
          <div className="content">
            <h3 className=" text-dark uppercase font-semibold mb-4 ml-3">
              Add Task
            </h3>
            <input
              type="text"
              ref={ref}
              className="add-todo-input appearance-none border-none outline-none text-dark bg-white p-4 rounded-2xl w-full text-xl shadow-box hover:shadow-box-dark"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo(newTodo);
                }
                // console.log(e.key);
              }}
              value={newTodo}
            />
            <div
              className="flex justify-center mt-4 py-4 px8 rounded-full bg-gradient-to-r from-primary to-secondary uppercase text-lg text-center font-bold cursor-pointer"
              onClick={() => addTodo(newTodo)}
            >
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}

export default App;
