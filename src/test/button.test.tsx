import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import { Button } from "../components/Button";

describe("hola mundo", () => {
  test("Should be render Button component", () => {
    render(<Button text={"hola"} type={"success"} />);
  });
});
