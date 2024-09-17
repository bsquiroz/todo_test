import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { getErrors } from "./utils/getErrors";

interface Todo {
  id: string;
  title: string;
  desc: string;
  status: boolean;
}

const dataTodos = [
  {
    id: crypto.randomUUID(),
    title: "Tarea 1",
    desc: "Esta es la tarea 1, pero es su descripción",
    status: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Tarea 2",
    desc: "Esta es la tarea 2, pero es su descripción",
    status: true,
  },
];

const initValuesForm = {
  title: "",
  desc: "",
};

const errorsMessage = {
  title: "El nombre de la tarea es requerida",
  desc: "La descripción de la tarea es requerida",
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(dataTodos);
  const [valuesForm, setValuesForm] = useState(initValuesForm);
  const [todoForEdit, setTodoForEdit] = useState<Todo>();
  const [errors, setErrors] = useState({ title: "", desc: "" });

  useEffect(() => {
    if (todoForEdit) {
      setValuesForm({
        title: todoForEdit.title,
        desc: todoForEdit.desc,
      });
    }
  }, [todoForEdit]);

  const onchageInputs = (key: string, value: string) => {
    setValuesForm({
      ...valuesForm,
      [key]: value,
    });
  };

  const handleCreateTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  const handleUpdateTodo = (editTodo: Todo) => {
    const newArrTodos = todos.map((todo) =>
      todo.id === editTodo.id ? editTodo : todo
    );
    setTodos(newArrTodos);
    setTodoForEdit(undefined);
  };

  const handleDeleteTodo = (id: string) => {
    const newArrTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newArrTodos);
  };

  const handleChangeStatus = (id: string) => {
    const newArrTodo = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: !todo.status,
          }
        : todo
    );

    setTodos(newArrTodo);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (getErrors(valuesForm, setErrors, errorsMessage)) return;

    if (todoForEdit) {
      handleUpdateTodo({
        ...todoForEdit,
        ...valuesForm,
      });
    } else {
      const newTodo = {
        ...valuesForm,
        id: crypto.randomUUID(),
        status: false,
      };

      handleCreateTodo(newTodo);
    }

    setValuesForm(initValuesForm);
  };

  return (
    <section className=" bg-slate-900 text-white">
      <main className="max-w-lg m-auto p-4 min-h-screen">
        {/* Header */}
        <header>
          <a
            className="flex gap-2"
            href="https://github.com/bsquiroz/todo_test"
            target="_blank"
          >
            <img className="w-5" src="/test.png" alt="logo" />
            <span className="font-extrabold text-red-500 cursor-pointer">
              TODO TEST
            </span>
          </a>
        </header>

        {/* Form */}
        <form className="flex flex-col gap-4 p-4" onSubmit={handleOnSubmit}>
          <h2 className="text-2xl text-center">
            {todoForEdit ? "Edición de tarea" : "Creación de la tarea"}
          </h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">
              Nombre de la tarea <span className="text-red-500">*</span>{" "}
              {errors.title && (
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                  {errors.title}
                </span>
              )}
            </label>
            <input
              value={valuesForm.title}
              onChange={(e) => onchageInputs("title", e.target.value)}
              className="rounded-full text-black py-1 px-2 outline-none"
              type="text"
              id="title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="desc">
              Descripción de la tarea
              <span className="text-red-500">*</span>
              {errors.desc && (
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                  {errors.desc}
                </span>
              )}
            </label>
            <input
              value={valuesForm.desc}
              onChange={(e) => onchageInputs("desc", e.target.value)}
              className="rounded-full text-black py-1 px-2 outline-none"
              type="text"
              id="desc"
            />
          </div>

          <Button
            text={todoForEdit ? "Editar tarea" : "Crear tarea"}
            type={todoForEdit ? "warning" : "info"}
          />
        </form>

        {/* Tareas */}
        <section className="mt-4 flex flex-col gap-4">
          {!todos.length ? (
            <p className="font-bold text-center">No hay tareas, crea una!!!</p>
          ) : (
            todos.map((todo) => {
              const statusStyle = todo.status
                ? "shadow-green-400"
                : "shadow-red-400";

              return (
                <article
                  key={todo.id}
                  className={`flex flex-col gap-2 border-2 border-transparent rounded-md shadow-sm p-4 ${statusStyle}`}
                >
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id={`status-${todo.id}`}
                      className="rounded-full bg-black"
                      defaultChecked={todo.status}
                      onClick={() => handleChangeStatus(todo.id)}
                    />
                    <label
                      className="font-bold cursor-pointer"
                      htmlFor={`status-${todo.id}`}
                    >
                      {todo.title}
                    </label>
                  </div>
                  <p className="font-extralight text-sm">{todo.desc}</p>

                  <div className="flex gap-4">
                    <Button
                      text="Editar"
                      type="warning"
                      onClick={() => {
                        setTodoForEdit(todo);
                      }}
                    />
                    <Button
                      onClick={() => handleDeleteTodo(todo.id)}
                      text="Eliminar"
                      type="error"
                    />
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>
    </section>
  );
}

export default App;
