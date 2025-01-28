import { TextNode, VirtualDOM, VirtualNode } from "./types";

export const checkIsVirtualNode = (
  obj: VirtualDOM | VirtualNode
): obj is VirtualDOM => {
  if (Array.isArray(obj)) {
    return false;
  }
  if (typeof obj === "object" && obj != null && "node" in obj) {
    return true;
  }

  return false;
};

export const isTextNode = (
  node: VirtualNode | VirtualDOM
): node is TextNode => {
  return typeof node === "string" || typeof node === "number";
};

export const isVirtualDOM = (
  virtual: VirtualDOM | VirtualNode
): virtual is VirtualDOM => {
  return typeof virtual === "object" && virtual !== null && "node" in virtual;
};
