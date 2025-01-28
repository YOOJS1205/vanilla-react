import { checkIsVirtualNode } from "../utils";

describe("test checkIsVirtualNode(): 인자로 받은 객체가 VirtualDOM인지 확인하는 함수", () => {
  it("VirtualDOM인 경우 true를 반환한다.", () => {
    // when
    const virtualDOM = { node: "div" };

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
