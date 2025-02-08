import { shallowEqual } from "../utils/shallowEqual";
import createDOMElement from "./createDOMElement";
import { Component } from "./types";

type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<T> = (value: SetStateAction<T>) => void;

// 렌더러 생성 함수
const createRenderer = () => {
  // 클로저로 보호될 상태 관리 변수들
  const states: unknown[] = [];
  let currentStateIndex = 0;
  let currentComponent: Component | null = null;
  let currentContainer: HTMLElement | null = null;

  const useState = <T>(initialState: T): [T, Dispatch<T>] => {
    const stateIndex = currentStateIndex;

    if (states[stateIndex] === undefined) {
      states[stateIndex] = initialState;
    }

    const setState = (action: SetStateAction<T>) => {
      const nextState =
        typeof action === "function"
          ? (action as (prev: T) => T)(states[stateIndex] as T)
          : action;

      if (shallowEqual(states[stateIndex], nextState)) return;
      states[stateIndex] = nextState;

      rerender();
    };

    currentStateIndex++;
    return [states[stateIndex] as T, setState];
  };

  const render = (
    virtualDOM: JSX.Element | Component,
    container: HTMLElement
  ): void => {
    if (!container) {
      throw new Error("컨테이너 요소가 없습니다.");
    }

    if (!currentComponent || !currentContainer) {
      currentComponent =
        typeof virtualDOM === "function" ? virtualDOM : () => virtualDOM;
      currentContainer = container;
    }

    try {
      currentStateIndex = 0;
      container.innerHTML = "";

      const resultDOM =
        typeof virtualDOM === "function" ? virtualDOM({}) : virtualDOM;
      const element = createDOMElement(resultDOM);
      container.appendChild(element);
    } catch (error) {
      console.error("Virtual DOM 렌더링 과정에 에러가 발생하였습니다.", error);
      throw error;
    }
  };

  const rerender = () => {
    if (!currentContainer || !currentComponent) {
      throw new Error("초기 렌더링이 필요합니다.");
    }

    render(currentComponent, currentContainer);
  };

  return {
    useState,
    render,
    rerender,
  };
};

const { useState, render, rerender } = createRenderer();
export { useState, render, rerender };
