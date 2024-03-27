import Home from "./Home/Home";
import { SignInProvider } from "./SignInControl/SignInProvider";
import { DisplaySignInProvider } from "./SignInControl/DisplaySignInProvider";
function App() {
  return ( 
    <SignInProvider>
      <DisplaySignInProvider>
          <Home/>
      </DisplaySignInProvider>
    </SignInProvider>
  );
}

export default App;