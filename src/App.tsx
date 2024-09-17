import { Button } from "./components/Button";

function App() {
  return (
    <section className=" bg-slate-900 text-white">
      <main className="max-w-2xl m-auto p-4 min-h-screen">
        <header>
          <span className="font-bold">TODO TEST</span>
        </header>

        <form className="flex flex-col gap-4 p-4">
          <h2 className="text-2xl text-center">Creación de la tarea</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nombre de la tarea</label>
            <input
              className="rounded-full text-black py-1 px-2 outline-none"
              type="text"
              id="name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Descripción de la tarea</label>
            <input
              className="rounded-full text-black py-1 px-2 outline-none"
              type="text"
              id="name"
            />
          </div>

          <Button text="Crear tarea" type="info" />
        </form>
      </main>
    </section>
  );
}

export default App;
