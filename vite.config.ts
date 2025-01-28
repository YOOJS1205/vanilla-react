import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  esbuild: {
    // JSX 코드를 일반 JavaScript로 변환하는 방식 지정
    // transform: 수동으로 createElement 호출로 변환
    jsx: "transform",
    // 개발 모드에서의 추가 디버깅 정보 비활성화
    jsxDev: false,
    // JSX 변환에 사용될 라이브러리의 위치 지정
    // 해당 경로에 JSX 구현체가 존재한다.
    jsxImportSource: "@/libs/jsx",
    // 모든 JSX 파일에 자동으로 추가될 import문
    // createElement 함수를 매번 수동으로 import 하지 않아도 된다.
    jsxInject: `import { createElement } from '@/libs/jsx/jsx-runtime'`,
    // JSX를 JavaScript로 변환할 때 사용할 함수 이름
    jsxFactory: "createElement",
  },
});
