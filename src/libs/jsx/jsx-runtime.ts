import { VirtualNode, Component } from "./types";
import { isTextNode, isVirtualDOM } from "./utils";

export function createElement(
  component: keyof HTMLElementTagNameMap | Component,
  props: Record<string, unknown> | null,
  ...children: VirtualNode[]
): JSX.Element {
  const flattenChildren = (items: VirtualNode[]): VirtualNode[] => {
    return items.reduce<VirtualNode[]>((acc, item) => {
      if (Array.isArray(item)) {
        return [...acc, ...flattenChildren(item)];
      }
      return [...acc, item];
    }, []);
  };

  const flattenedChildren = flattenChildren(children).map((v) => {
    if (isVirtualDOM(v)) {
      return v;
    }
    if (isTextNode(v)) {
      return String(v);
    }
    return "";
  });

  // 사용자 정의 함수형 컴포넌트
  if (typeof component === "function") {
    return component({ ...props, children: flattenedChildren });
  }

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
