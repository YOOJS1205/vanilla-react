import { useState } from "./libs/jsx/render";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header />
      <h1 style={{ backgroundColor: "red" }}>Hello, JSX!</h1>
      <div>
        <p>현재 카운트: {count}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>증가</button>
      </div>
    </div>
  );
};

const Header = () => <h1>Hello, JSX!</h1>;

export default App;
