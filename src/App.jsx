import { Input } from "./components/ui/input";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./components/ui/table";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [deleteTodos, setDeleteTodos] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000000);
    let todo = {
      id,
      text,
      isCompleted: false,
    };

    setTodos((prev) => [...prev, todo]);
    setText("");
  };

  const deleteTodo = (id) => {
    deleteTodos.push(id);
    const find = deleteTodos.find((delId) => delId === id);
    console.log(find);
    // if (include) {
    //   setDeleteTodos(deleteTodos.filter((delId) => delId !== id));
    // } else {
    //   setDeleteTodos((prev) => [...prev, id]);
    // }

    console.log(deleteTodos);
  };

  const changeMode = (id) => {
    const find = todos.find((todo) => todo.id === id);
    find.isCompleted = !find.isCompleted;
    setTodos((prev) => [...prev]);
  };

  const editTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setText(todo.text);
  };

  return (
    <div className="w-[80%] mx-auto mt-4">
      <h1 className="font-bold text-3xl">Todo App</h1>
      <form onSubmit={handleForm}>
        <Input
          placeholder="Enter Todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>

      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead>ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.text}</TableCell>
              <TableCell
                className="cursor-pointer"
                onClick={() => changeMode(todo.id)}
              >
                {todo.isCompleted ? "Yes" : "No"}{" "}
              </TableCell>
              <TableCell>
                <input type="checkbox" onChange={() => deleteTodo(todo.id)} />
              </TableCell>
              <TableCell>
                <button
                  onClick={() => editTodo(todo.id)}
                  className="border py-1 px-1 rounded"
                >
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
