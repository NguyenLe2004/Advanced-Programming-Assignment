import Home from "./Home/Home";
import { SignInProvider } from "./SignInControl/SignInProvider";
import { DisplaySignInProvider } from "./SignInControl/DisplaySignInProvider";
import { DataPatientProvider } from "./DataControl/DataPatientProvider";
function App() {
  return ( 
    <SignInProvider>
      <DisplaySignInProvider>
        <DataPatientProvider>
          <Home/>
        </DataPatientProvider>
      </DisplaySignInProvider>
    </SignInProvider>
  );
}

export default App;