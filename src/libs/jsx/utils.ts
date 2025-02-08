import { TextNode, VirtualDOM, VirtualNode } from "./types";

export const isTextNode = (node: VirtualNode): node is TextNode => {
  return (
    typeof node === "string" ||
    typeof node === "number" ||
    node === null ||
    node === undefined ||
    Array.isArray(node)
  );
};

export const isVirtualDOM = (virtual: VirtualNode): virtual is VirtualDOM => {
  return typeof virtual === "object" && virtual !== null && "node" in virtual;
};
