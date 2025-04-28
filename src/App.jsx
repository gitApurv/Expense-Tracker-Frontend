import { useState } from "react";
import Login from "./Login";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? <h1>Welcome</h1> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}

export default App;
