import { VirtualDOM, VirtualNode } from "../types";
import { isTextNode, isVirtualDOM } from "../utils";

describe("test isTextNode(): 인자로 전달받은 노드가 텍스트 노드인지 여부를 반환하는 함수", () => {
  it("문자열이 주어지면 true를 반환한다.", () => {
    // when
    const node = "Hello World";

    // given
    const result = isTextNode(node);

    // then
    expect(result).toBeTruthy();
  });

  it("숫자가 주어지면 true를 반환한다.", () => {
    // when
    const node = 42;

    // given
    const result = isTextNode(node);

    // then
    expect(result).toBeTruthy();
  });

  it("null이 주어지면 true를 반환한다.", () => {
    // when
    const node = null;

    // given
    const result = isTextNode(node);

    // then
    expect(result).toBeTruthy();
  });

  it("undefined가 주어지면 true를 반환한다.", () => {
    // when
    const node = undefined;

    // given
    const result = isTextNode(node);

    // then
    expect(result).toBeTruthy();
  });

  it("배열이 주어지면 true를 반환한다.", () => {
    // when
    const node = ["Hello", 42, null];

    // given
    const result = isTextNode(node);

    // then
    expect(result).toBeTruthy();
  });

  it("빈 배열이 주어져도 true를 반환한다.", () => {
    // when
    const node: Array<VirtualNode> = [];

    // given
    const result = isTextNode(node);

    // then
    expect(result).toBeTruthy();
  });

  it("Virtual DOM이 주어지면 false를 반환한다.", () => {
    // when
    const node: VirtualDOM = {
      node: {
        tag: "div",
        props: null,
        children: [],
      },
    };

    // given
    const result = isTextNode(node);

    // then
    expect(result).toBeFalsy();
  });

  it("불완전한 Virtual DOM이 주어지면 false를 반환한다.", () => {
    // when
    const node = {
      node: {},
    } as VirtualDOM;

    // given
    const result = isTextNode(node);

    // then
    expect(result).toBeFalsy();
  });
});

describe("test isVirtualDOM(): 인자로 전달받은 노드가 Virtual DOM인지 여부를 반환하는 함수", () => {
  it("올바른 Virtual DOM이 주어지면 true를 반환한다.", () => {
    // when
    const node: VirtualDOM = {
      node: {
        tag: "div",
        props: null,
        children: [],
      },
    };

    // given
    const result = isVirtualDOM(node);

    // then
    expect(result).toBeTruthy();
  });

  it("문자열이 주어지면 false를 반환한다.", () => {
    // when
    const node = "Hello World";

    // given
    const result = isVirtualDOM(node);

    // then
    expect(result).toBeFalsy();
  });

  it("숫자가 주어지면 false를 반환한다.", () => {
    // when
    const node = 42;

    // given
    const result = isVirtualDOM(node);

    // then
    expect(result).toBeFalsy();
  });

  it("null이 주어지면 false를 반환한다.", () => {
    // when
    const node = null;

    // given
    const result = isVirtualDOM(node);

    // then
    expect(result).toBeFalsy();
  });

  it("undefined가 주어지면 false를 반환한다.", () => {
    // when
    const node = undefined;

    // given
    const result = isVirtualDOM(node);

    // then
    expect(result).toBeFalsy();
  });

  it("배열이 주어지면 false를 반환한다.", () => {
    // when
    const node = ["Hello", 42, null];

    // given
    const result = isVirtualDOM(node);

    // then
    expect(result).toBeFalsy();
  });

  it("불완전한 Virtual DOM이 주어져도 true를 반환한다.", () => {
    // when
    const node = {
      node: {}, // tag, props가 없는 불완전한 형태
    } as VirtualDOM;

    // given
    const result = isVirtualDOM(node);

    // then
    expect(result).toBeTruthy();
  });

  it("중첩된 Virtual DOM이 주어져도 true를 반환한다.", () => {
    // when
    const node: VirtualDOM = {
      node: {
        tag: "div",
        props: null,
        children: [
          {
            node: {
              tag: "span",
              props: null,
            },
          },
        ],
      },
    };

    // given
    const result = isVirtualDOM(node);

    // then
    expect(result).toBeTruthy();
  });
});
