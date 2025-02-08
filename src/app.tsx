import { useState } from "./libs/jsx/render";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header />
      <h1>Title!!</h1>
    </div>
  );
};

const Header = () => <h1>Hello, JSX!</h1>;

export default App;
