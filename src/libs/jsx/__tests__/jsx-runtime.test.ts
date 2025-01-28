import { createElement } from "@/libs/jsx/jsx-runtime";

describe("test createElement(): JSX 구문을 Virtual DOM 자바스크립트 객체로 변환하는 함수", () => {
  it("div tag가 주어지고, props가 없으면 아래 구조의 객체를 반환한다.", () => {
    // when
    const tag = "div";
    const props = null;

    // given
    const result = createElement(tag, props);

    // then
    expect(result).toEqual({
      node: {
        tag: "div",
        props: null,
        children: [],
      },
    });
  });

  it("div tag가 주어지고, props가 있으면 아래 구조의 객체를 반환한다.", () => {
    // when
    const tag = "div";
    const props = { className: "test", id: "test-id" };

    // given
    const result = createElement(tag, props);

    // then
    expect(result).toEqual({
      node: {
        tag: "div",
        props: { className: "test", id: "test-id" },
        children: [],
      },
    });
  });

  it("텍스트 자식 요소가 있는 div 요소는 아래 구조의 객체를 반환한다.", () => {
    // when
    const tag = "div";
    const props = null;
    const children = "Hello";

    // given
    const result = createElement(tag, props, children);

    // result
    expect(result).toEqual({
      node: {
        tag: "div",
        props: null,
        children: ["Hello"],
      },
    });
  });
});
