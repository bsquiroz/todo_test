import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import TodoList from "./TodoList";

describe("Suite test: TodoList App", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should display error messages when creating the task without the required fields", () => {
    render(<TodoList />);

    fireEvent.click(screen.getByText("Crear tarea"));

    expect(
      screen.getByText("La descripción de la tarea es requerida")
    ).toBeDefined();

    expect(
      screen.getByText("El nombre de la tarea es requerida")
    ).toBeDefined();
  });

  test("Should show no tasks message when there is no task", () => {
    render(<TodoList />);

    for (const btn of screen.getAllByText("Eliminar")) {
      fireEvent.click(btn);
    }

    expect(screen.getByText("No hay tareas, crea una!!!")).toBeDefined();
  });

  test("Should show a previously created task", () => {
    render(<TodoList />);

    const inputTitle =
      screen.getByText("Nombre de la tarea").nextElementSibling!;

    const inputDesc = screen.getByText("Descripción de la tarea")
      .nextElementSibling!;

    fireEvent.change(inputTitle, { target: { value: "Tarea 3" } });
    fireEvent.change(inputDesc, {
      target: { value: "Aprendiendo un poco de test" },
    });

    fireEvent.click(screen.getByText("Crear tarea"));

    expect(screen.getByText("Tarea 3")).toBeDefined();
    expect(screen.getByText("Aprendiendo un poco de test")).toBeDefined();
  });

  test("Should change the appearance of the form and the values of the inputs when I click the edit button on a task", () => {
    render(<TodoList />);

    expect(screen.getByText("Creación de la tarea")).toBeDefined();
    expect(screen.getByText("Crear tarea")).toBeDefined();
    expect(screen.getByText("Crear tarea").classList.contains("btn-info")).toBe(
      true
    );

    fireEvent.click(screen.getAllByText("Editar")[0]);

    expect(screen.getByText("Edición de tarea")).toBeDefined();
    expect(screen.getByText("Editar tarea")).toBeDefined();
    expect(
      screen.getByText("Editar tarea").classList.contains("btn-warning")
    ).toBeDefined();

    const inputTitle = screen.getByText("Nombre de la tarea")
      .nextElementSibling! as HTMLInputElement;

    const inputDesc = screen.getByText("Descripción de la tarea")
      .nextElementSibling! as HTMLInputElement;

    expect(inputTitle.value).toBe("Tarea 1");
    expect(inputDesc.value).toBe("Esta es la tarea 1, pero es su descripción");
  });

  test("I should edit a previously created task.", () => {
    //TODO
  });
});
