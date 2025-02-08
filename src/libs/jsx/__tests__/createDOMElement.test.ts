/**
 * @jest-environment jsdom
 */

import { createElement } from "@/libs/jsx/jsx-runtime";
import { VirtualDOM, VirtualNode } from "../types";
import createDOMElement from "../createDOMElement";

describe("test createDOMElement(): Virtual DOM을 실제 DOM 요소로 변환하는 함수", () => {
  describe("기본 HTML 요소 생성", () => {
    it("단순 div 요소를 생성한다.", () => {
      // when
      const tag = "div";
      const props = null;
      const children: VirtualNode[] = [];

      const virtualDOM = createElement(tag, props, children);

      // given
      const result = createDOMElement(virtualDOM) as HTMLElement;

      // then
      expect(result.tagName.toLocaleLowerCase()).toBe("div");
    });

    it("텍스트 노드를 생성한다.", () => {
      // when
      const textNode = "Hello, World!";

      // given
      const result = createDOMElement(textNode);

      // then
      expect(result.nodeType).toBe(Node.TEXT_NODE);
      expect(result.textContent).toBe("Hello, World!");
    });
  });

  describe("TextNode 처리는 아래와 같다.", () => {
    it("문자열을 처리한다.", () => {
      const result = createDOMElement("Hello");
      expect(result.textContent).toBe("Hello");
    });

    it("숫자를 처리한다.", () => {
      const result = createDOMElement(42);
      expect(result.textContent).toBe("42");
    });

    it("null을 빈 문자열로 처리한다.", () => {
      const result = createDOMElement(null);
      expect(result.textContent).toBe("");
    });

    it("undefined를 빈 문자열로 처리한다.", () => {
      const result = createDOMElement(undefined);
      expect(result.textContent).toBe("");
    });

    it("배열을 처리한다.", () => {
      const array = [
        "Hello",
        42,
        {
          node: {
            tag: "span",
            props: null,
            children: ["World"],
          },
        },
      ] as VirtualNode[];

      const result = createDOMElement(array);

      expect(result.childNodes.length).toBe(3);
      expect(result.childNodes[0].textContent).toBe("Hello");
      expect(result.childNodes[1].textContent).toBe("42");
      expect(result.childNodes[2].nodeName.toLowerCase()).toBe("span");
      expect(result.childNodes[2].textContent).toBe("World");
    });

    it("빈 배열을 처리한다.", () => {
      const result = createDOMElement([]);
      expect(result.childNodes.length).toBe(0);
    });
  });

  describe("props 처리는 아래와 같다.", () => {
    it("class, event, style 처리는 아래와 같다.", () => {
      // when
      const tag = "div";
      const clickHandler = jest.fn();
      const props = {
        className: "test-class",
        onClick: clickHandler,
        style: {
          color: "red",
          backgroundColor: "blue",
        },
      };
      const children: VirtualNode[] = [];

      const virtualDOM = createElement(tag, props, children);

      // given
      const result = createDOMElement(virtualDOM) as HTMLElement;
      result.click();

      // then
      expect(result.className).toBe("test-class");
      expect(clickHandler).toHaveBeenCalled();
      expect(result.style.color).toBe("red");
      expect(result.style.backgroundColor).toBe("blue");
    });
  });

  describe("자식 요소 처리는 아래와 같다.", () => {
    it("단일 텍스트 자식을 처리한다", () => {
      // when
      const tag = "div";
      const props = null;
      const children = ["Hello"];

      const virtualDOM = createElement(tag, props, children);

      // given
      const result = createDOMElement(virtualDOM);

      // then
      expect(result.textContent).toBe("Hello");
    });

    it("여러 자식 요소를 처리한다", () => {
      // when
      const tag = "div";
      const props = null;
      const children = [
        {
          node: {
            tag: "span",
            props: null,
            children: ["Hello"],
          },
        },
        "World",
      ] as VirtualDOM[];

      const virtualDOM = createElement(tag, props, children);

      // given
      const result = createDOMElement(virtualDOM);

      // then
      expect(result.childNodes.length).toBe(2);
      expect(result.firstChild?.nodeName.toLowerCase()).toBe("span");
      expect(result.lastChild?.textContent).toBe("World");
    });
  });
});
