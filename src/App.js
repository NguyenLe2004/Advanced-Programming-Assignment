import Home from "./Home/Home";
import { SignInProvider } from "./SignInControl/SignInProvider";
import { DisplaySignInProvider } from "./SignInControl/DisplaySignInProvider";
import { DataPatientProvider } from "./DataControl/DataPatientProvider";
import { PreventOperateProvider } from "./PreventOperateProvider";
function App() {
  return ( 
    <SignInProvider>
      <DisplaySignInProvider>
        <PreventOperateProvider>
          <DataPatientProvider>
            <Home/>
          </DataPatientProvider>
        </PreventOperateProvider>
      </DisplaySignInProvider>
    </SignInProvider>
  );
}

export default App;