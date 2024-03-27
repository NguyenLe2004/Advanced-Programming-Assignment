import Home from "./Home/Home";
import {LoginAuth} from "./LoginAuth";
import { LoginFormDislay } from "./DisplayLoginForm";

function App() {
  return ( 
    <LoginAuth>
      <LoginFormDislay>
          <Home/>
      </LoginFormDislay>
    </LoginAuth>
  );
}

export default App;