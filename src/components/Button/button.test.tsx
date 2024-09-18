import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { Button } from ".";

describe("Suite test: Button component", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should be render Button success component", () => {
    render(<Button text={"btn test"} type={"success"} />);

    expect(screen.getByText("btn test")).toBeDefined();
    expect(screen.getByText("btn test").classList.contains("btn-success")).toBe(
      true
    );
  });

  test("Should be render Button warning component", () => {
    render(<Button text={"btn test"} type={"warning"} />);

    expect(screen.getByText("btn test")).toBeDefined();
    expect(screen.getByText("btn test").classList.contains("btn-warning")).toBe(
      true
    );
  });

  test("Should be render Button info component", () => {
    render(<Button text={"btn test"} type={"info"} />);

    expect(screen.getByText("btn test")).toBeDefined();
    expect(screen.getByText("btn test").classList.contains("btn-info")).toBe(
      true
    );
  });

  test("Should be render Button error component", () => {
    render(<Button text={"btn test"} type={"error"} />);

    expect(screen.getByText("btn test")).toBeDefined();
    expect(screen.getByText("btn test").classList.contains("btn-error")).toBe(
      true
    );
  });

  test("Should be called function onClick when click at button", () => {
    const mockOnClick = vi.fn();
    render(<Button text={"btn test"} type={"error"} onClick={mockOnClick} />);

    const button = screen.getByText("btn test");

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
