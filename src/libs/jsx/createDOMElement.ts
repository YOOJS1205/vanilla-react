import { VirtualNode } from "./types";
import { isTextNode, isVirtualDOM } from "./utils";

const createDOMElement = (virtual: VirtualNode): Node => {
  // null, undefined 처리
  if (virtual === null || virtual === undefined) {
    return document.createTextNode("");
  }

  if (Array.isArray(virtual)) {
    const fragment = document.createDocumentFragment();

    virtual.forEach((item) => {
      fragment.appendChild(createDOMElement(item));
    });

    return fragment;
  }

  if (isTextNode(virtual)) {
    return document.createTextNode(String(virtual));
  }

  if (isVirtualDOM(virtual)) {
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
  }

  throw new Error(`${virtual}은 처리할 수 없는 node type 입니다.`);
};

export default createDOMElement;
