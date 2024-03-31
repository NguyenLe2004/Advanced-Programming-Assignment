import Home from "./Home/Home";
import { SignInProvider } from "./SignInControl/SignInProvider";
import { DisplaySignInProvider } from "./SignInControl/DisplaySignInProvider";
import { PreventOperateProvider } from "./DisplayDataAllProvider/PreventOperateProvider";
function App() {
  return ( 
    <SignInProvider>
      <DisplaySignInProvider>
        <PreventOperateProvider>
            <Home/>
        </PreventOperateProvider>
      </DisplaySignInProvider>
    </SignInProvider>
  );
}

export default App;