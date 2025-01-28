import { VirtualDOM, VirtualNode, Component } from "./types";
import { checkIsVirtualNode } from "./utils";

export function createElement(
  component: keyof HTMLElementTagNameMap | Component,
  props: Record<string, unknown> | null,
  ...children: (VirtualDOM | VirtualNode)[]
): JSX.Element {
  // 사용자 정의 함수형 컴포넌트
  if (typeof component === "function") {
    return component({ ...props, children });
  }

  // HTML 요소
  return {
    node: {
      tag: component,
      props,
      children: children.flat(Infinity).map((v) => {
        if (!checkIsVirtualNode(v as VirtualDOM | VirtualNode)) {
          return { node: v } as VirtualDOM;
        }
        return v;
      }) as VirtualDOM[],
    },
  };
}

export const jsx = { createElement };
