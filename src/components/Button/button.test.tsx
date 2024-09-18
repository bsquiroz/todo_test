import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import { Button } from ".";

describe("hola mundo", () => {
  test("Should be render Button component", () => {
    render(<Button text={"hola"} type={"success"} />);
  });
});
