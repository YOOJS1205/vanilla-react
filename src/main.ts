import App from "./app.tsx";
import { render } from "./libs/jsx/render.ts";

const container = document.getElementById("app");

if (container) {
  render(App, container);
}
