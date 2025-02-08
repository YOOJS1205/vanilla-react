import App from "./app.tsx";
import { render } from "./libs/jsx/render.ts";

const container = document.getElementById("app");

console.log(App);
console.log(JSON.stringify(App(), null, 2));

if (container) {
  render(App, container);
}
