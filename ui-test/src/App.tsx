import AsyncComponent from "./components/AsyncComponent";
import Button from "./components/Button";
import Counter from "./components/Counter";
import Form from "./components/Form";
import { UserSearch } from "./components/UserSearch";

function App() {
  return (
    <>
      {/* <Button label="ボタン" onClick={() => alert("click")} /> */}
      {/* <Form /> */}
      {/* <AsyncComponent /> */}
      {/* <UserSearch /> */}
      <Counter initialCount={10} />
    </>
  );
}

export default App;
