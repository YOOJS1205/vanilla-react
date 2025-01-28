import { VirtualDOM, VirtualNode } from "./types";

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
