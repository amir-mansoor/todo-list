import { Input } from "./components/ui/input";
import { useEffect, useState } from "react";
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
  const [editText, setEditText] = useState("");
  const [selectTodos, setSelectTodos] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    if (!text) return;

    const id = Math.floor(Math.random() * 1000000);
    let todo = {
      id,
      text,
      isCompleted: false,
    };

    setTodos((prev) => [...prev, todo]);
    setText("");
  };

  const selectTodo = (id) => {
    if (selectTodos.includes(id)) {
      setSelectTodos(selectTodos.filter((todo) => todo !== id));
    } else {
      setSelectTodos([...selectTodos, id]);
    }
  };

  const deleteTodos = () => {
    setTodos(todos.filter((todo) => !selectTodos.includes(todo.id)));
    setSelectTodos([]);
  };

  const changeMode = (id) => {
    const find = todos.find((todo) => todo.id === id);
    find.isCompleted = !find.isCompleted;
    setTodos((prev) => [...prev]);
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

      {selectTodos.length > 0 && (
        <button
          onClick={() => deleteTodos()}
          className="bg-red-600 mt-2 px-2 py-2 rounded bg-opacity-70 shadow-lg font-bold hover:bg-opacity-60"
        >
          Delete Selected Todos
        </button>
      )}
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
                <input type="checkbox" onChange={() => selectTodo(todo.id)} />
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
