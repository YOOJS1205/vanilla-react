import { VirtualDOM, VirtualNode, Component } from "./types";
import { checkIsVirtualNode, isTextNode } from "./utils";

export function createElement(
  component: keyof HTMLElementTagNameMap | Component,
  props: Record<string, unknown> | null,
  ...children: (VirtualDOM | VirtualNode)[]
): JSX.Element {
  // 사용자 정의 함수형 컴포넌트
  if (typeof component === "function") {
    return component({ ...props, children });
  }

  const flattenedChildren = (
    children.flat(Infinity) as (VirtualDOM | VirtualNode)[]
  ).map((v) => {
    if (checkIsVirtualNode(v)) {
      return v;
    }
    if (isTextNode(v)) {
      return v;
    }
    return "";
  });

  // HTML 요소
  return {
    node: {
      tag: component,
      props,
      children: flattenedChildren,
    },
  };
}

export const jsx = createElement;
export const jsxs = createElement;
