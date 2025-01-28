import { VirtualDOM, VirtualNode } from "./types";
import { isTextNode, isVirtualDOM } from "./utils";

const createDOMElement = (virtual: VirtualDOM | VirtualNode): Node => {
  if (isTextNode(virtual)) {
    return document.createTextNode(String(virtual));
  }

  if (!isVirtualDOM(virtual)) {
    return document.createTextNode("");
  }

  const { tag, props, children } = virtual.node;
  const element = document.createElement(tag);

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.toLowerCase().substring(2);
        element.addEventListener(eventName, value as EventListener);
      } else if (key === "style" && typeof value === "object") {
        Object.entries(value as Record<string, string>).forEach(
          ([cssKey, cssValue]) => {
            element.style[cssKey as any] = cssValue;
          }
        );
      } else if (key === "className") {
        element.setAttribute("class", String(value));
      } else {
        element.setAttribute(key, String(value));
      }
    });
  }

  if (children) {
    children.forEach((child) => {
      const childElement = createDOMElement(child);
      element.appendChild(childElement);
    });
  }

  return element;
};

export default createDOMElement;
