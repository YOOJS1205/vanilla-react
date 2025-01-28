const App = () => (
  <div className="app">
    <Header />
    <h1>Hello, JSX!</h1>
    <button onClick={() => alert("Clicked!")}>Click Me</button>
  </div>
);

const Header = () => <h1>Hello, JSX!</h1>;

export default App;
