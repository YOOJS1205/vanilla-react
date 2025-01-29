import { shallowEqual } from "../shallowEqual";

describe("test shallowEqual(): 두 값의 얕은 비교를 수행하는 함수", () => {
  it("원시형 타입의 같은 값을 비교하면 true를 반환한다.", () => {
    // when
    const a = 1;
    const b = 1;

    // given
    const result = shallowEqual(a, b);

    // then
    expect(result).toBe(true);
  });

  it("원시형 타입의 다른 값을 비교하면 false를 반환한다.", () => {
    // when
    const a = 1;
    const b = 2;

    // given
    const result = shallowEqual(a, b);

    // then
    expect(result).toBe(false);
  });

  it("객체의 같은 값을 비교하면 true를 반환한다.", () => {
    // when
    const a = { name: "kim", age: 20 };
    const b = { name: "kim", age: 20 };

    // given
    const result = shallowEqual(a, b);

    // then
    expect(result).toBe(true);
  });

  it("객체의 다른 값을 비교하면 false를 반환한다.", () => {
    // when
    const a = { name: "kim", age: 20 };
    const b = { name: "park", age: 20 };

    // given
    const result = shallowEqual(a, b);

    // then
    expect(result).toBe(false);
  });

  it("같은 구조의 배열을 비교하면 true를 반환한다", () => {
    // when
    const a = [1, 2, 3];
    const b = [1, 2, 3];

    // given
    const result = shallowEqual(a, b);

    // then
    expect(result).toBe(true);
  });

  it("다른 구조의 배열을 비교하면 false를 반환한다", () => {
    // when
    const a = [1, 2, 3];
    const b = [1, 2, 4];

    // given
    const result = shallowEqual(a, b);

    // then
    expect(result).toBe(false);
  });

  it("null 값을 비교하면 true를 반환한다", () => {
    // when
    const a = null;
    const b = null;

    // given
    const result = shallowEqual(a, b);

    // then
    expect(result).toBe(true);
  });

  it("중첩된 객체는 참조가 다르면 false를 반환한다", () => {
    // when
    const a = { user: { name: "kim" } };
    const b = { user: { name: "kim" } };

    // given
    const result = shallowEqual(a, b);

    // then
    expect(result).toBe(false);
  });
});
