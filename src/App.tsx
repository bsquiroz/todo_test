import { useState } from "react";
import { Button } from "./components/Button";

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

function App() {
  const [todos, setTodos] = useState<Todo[]>(dataTodos);
  const [valuesForm, setValuesForm] = useState(initValuesForm);

  const onchageInputs = (key: string, value: string) => {
    setValuesForm({
      ...valuesForm,
      [key]: value,
    });
  };

  const handleCreateTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
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

    const newTodo = {
      ...valuesForm,
      id: `${crypto.randomUUID}`,
      status: false,
    };

    handleCreateTodo(newTodo);

    setValuesForm(initValuesForm);
  };

  return (
    <section className=" bg-slate-900 text-white">
      <main className="max-w-2xl m-auto p-4 min-h-screen">
        {/* Header */}
        <header>
          <span className="font-bold text-green-500 cursor-pointer">
            TODO TEST
          </span>
        </header>

        {/* Form */}
        <form className="flex flex-col gap-4 p-4" onSubmit={handleOnSubmit}>
          <h2 className="text-2xl text-center">Creación de la tarea</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Nombre de la tarea</label>
            <input
              value={valuesForm.title}
              onChange={(e) => onchageInputs("title", e.target.value)}
              className="rounded-full text-black py-1 px-2 outline-none"
              type="text"
              id="title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="desc">Descripción de la tarea</label>
            <input
              value={valuesForm.desc}
              onChange={(e) => onchageInputs("desc", e.target.value)}
              className="rounded-full text-black py-1 px-2 outline-none"
              type="text"
              id="desc"
            />
          </div>

          <Button text="Crear tarea" type="info" onClick={() => {}} />
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
                      checked={todo.status}
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
                    <Button text="Editar" type="warning" onClick={() => {}} />
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
