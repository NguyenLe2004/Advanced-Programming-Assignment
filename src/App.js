import Home from "./Home/Home";
import { SignInProvider } from "./Provider/SignInProvider";
import { DisplaySignInProvider } from "./Provider/DisplaySignInProvider";
import { DataProvider } from "./Provider/DataProvider";
function App() {
  return ( 
    <SignInProvider>
      <DisplaySignInProvider>
        <DataProvider>
          <Home/>
        </DataProvider>
      </DisplaySignInProvider>
    </SignInProvider>
  );
}

export default App;