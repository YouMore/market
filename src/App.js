import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/navbar/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
