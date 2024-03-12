import AsyncComponent from "./components/AsyncComponent";
import Button from "./components/Button";
import Form from "./components/Form";
import { UserSearch } from "./components/UserSearch";

function App() {
  return (
    <>
      {/* <Button label="ボタン" onClick={() => alert("click")} /> */}
      {/* <Form /> */}
      {/* <AsyncComponent /> */}
      <UserSearch />
    </>
  );
}

export default App;
