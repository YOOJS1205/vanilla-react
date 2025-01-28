import createDOMElement from "./createDOMElement";

const render = (virtualDOM: JSX.Element, container: HTMLElement): void => {
  if (!container) {
    throw new Error("컨테이너 요소가 없습니다.");
  }

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

export default render;
