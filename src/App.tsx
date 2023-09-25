import "./App.css";
import { sendUrl } from "./utils/SendUrl";

function App() {
  return (
    <>
      <h1>hello world</h1>
      <button onClick={() => sendUrl("/login")}>로그인하러 가기</button>
    </>
  );
}

export default App;
