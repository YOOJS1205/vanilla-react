import { VirtualDOM } from "../types";
import { checkIsVirtualNode, isTextNode } from "../utils";

describe("test checkIsVirtualNode(): 인자로 받은 객체가 VirtualDOM인지 확인하는 함수", () => {
  it("VirtualDOM인 경우 true를 반환한다.", () => {
    // when
    const virtualDOM: VirtualDOM = {
      node: {
        tag: "div",
        props: null,
      },
    };

    // given
    const result = checkIsVirtualNode(virtualDOM);

    // then
    expect(result).toBe(true);
  });

  it("VirtualDOM이 아닌 경우 false를 반환한다.", () => {
    // when
    const virtualDOM = "div";

    // given
    const result = checkIsVirtualNode(virtualDOM);

    // then
    expect(result).toBe(false);
  });

  it("VirtualDOM이 배열인 경우 false를 반환한다.", () => {
    // when
    const virtualDOM = ["div"];

    // given
    const result = checkIsVirtualNode(virtualDOM);

    // then
    expect(result).toBe(false);
  });
});

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

  it("Viratul DOM이 주어지면 false를 반환한다.", () => {
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
});
