/**
 * @jest-environment jsdom
 */
import createDOMElement from "../createDOMElement";
import { render } from "../render";
import { Component } from "../types";

jest.mock("../createDOMElement", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((virtualDOM) => {
    const element = document.createElement(virtualDOM.node.tag);
    if (virtualDOM.node.children) {
      virtualDOM.node.children.forEach((child: string) => {
        if (typeof child === "string") {
          element.textContent = child;
        }
      });
    }
    return element;
  }),
}));

describe("test render(): Virtual DOM을 실제 DOM으로 렌더링하는 함수", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    jest.clearAllMocks();
  });

  it("container가 없으면 에러를 던진다.", () => {
    // when
    const virtualDOM: JSX.Element = {
      node: {
        tag: "div",
        props: null,
        children: [],
      },
    };

    // given
    const result = () => render(virtualDOM, null as unknown as HTMLElement);

    // then
    expect(result).toThrow("컨테이너 요소가 없습니다.");
  });

  it("일반 VirtualDOM을 전달받으면 createDOMElement 함수를 호출하여 렌더링한다.", () => {
    const virtualDOM: JSX.Element = {
      node: {
        tag: "div",
        props: null,
        children: ["Hello"],
      },
    };

    // given
    render(virtualDOM, container);

    // then
    expect(createDOMElement).toHaveBeenCalledWith(virtualDOM);
    expect(container.innerHTML).toBe("<div>Hello</div>");
  });

  it("함수형 컴포넌트를 전달받으면 빈 props와 함께 실행하여 렌더링한다", () => {
    // when
    const TestComponent: Component = () => ({
      node: {
        tag: "div",
        props: null,
        children: ["Hello"],
      },
    });

    // given
    render(TestComponent, container);

    // then
    expect(createDOMElement).toHaveBeenCalledWith({
      node: {
        tag: "div",
        props: null,
        children: ["Hello"],
      },
    });
  });
});
