import { useState } from "./libs/jsx/render";
import { DefaultProps } from "./libs/jsx/types";

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClickPlusButton = () => {
    setCount((prev) => prev + 1);
  };

  const handleClickMinusButton = () => {
    setCount((prev) => prev - 1);
  };

  const handleChangeText = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setText(target.value);
  };

  return (
    <div className="app">
      <p>현재 수: {count}</p>
      <Button buttonText="더하기" onClick={handleClickPlusButton} />
      <Button buttonText="빼기" onClick={handleClickMinusButton} />
      <div>
        <p>입력된 텍스트: {text}</p>
        <input type="text" value={text} onChange={handleChangeText} />
      </div>
    </div>
  );
};

interface ButtonProps extends DefaultProps {
  buttonText: string;
  onClick: () => void;
}

const Button = ({ buttonText, onClick, ...rest }: ButtonProps) => (
  <button onClick={onClick} {...rest}>
    {buttonText}
  </button>
);

export default App;
