import createDOMElement from "./createDOMElement";

let currentVirtualDOM: JSX.Element | null = null;
let currentContainer: HTMLElement | null = null;

const render = (virtualDOM: JSX.Element, container: HTMLElement): void => {
  if (!container) {
    throw new Error("컨테이너 요소가 없습니다.");
  }

  currentVirtualDOM = virtualDOM;
  currentContainer = container;

  try {
    container.innerHTML = "";

    if (!virtualDOM) {
      return;
    }

    const element = createDOMElement(virtualDOM);
    container.appendChild(element);
  } catch (error) {
    console.error("Virtual DOM 렌더링 과정에 에러가 발생하였습니다.", error);
    throw error;
  }
};

const rerender = () => {
  if (!currentVirtualDOM || !currentContainer) {
    throw new Error("초기 렌더링이 필요합니다.");
  }

  render(currentVirtualDOM, currentContainer);
};

export { render, rerender };
