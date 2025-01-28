// Virtual DOM 구조 정의
export interface IVirtualDOM {
  tag: keyof HTMLElementTagNameMap;
  props: Record<string, unknown> | null;
  children?: VirtualDOM[];
}

// HTML Tag가 없는 노드
export type TextNode = string | number | Array<unknown> | undefined | null;
// 모든 노드
export type VirtualNode = IVirtualDOM | TextNode;
// Virtual DOM 노드
export interface VirtualDOM {
  node: VirtualNode;
}

export interface DefaultProps {
  children?: (VirtualDOM | VirtualNode)[];
}

export type Component<T extends DefaultProps = DefaultProps> = (
  props: T
) => JSX.Element;

declare global {
  namespace JSX {
    // HTML 기본 요소 정의
    type IntrinsicElements = {
      [elemName in keyof HTMLElementTagNameMap]: Record<string, unknown>;
    };
    // JSX 표현식이 반환되는 값의 타입 정의
    type Element = VirtualDOM | null | undefined;
  }
}
