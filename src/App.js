import Home from "./Home";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Items from "./Items";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/' element ={<Home /> } />
      <Route path = '/items' element = {<Items /> } />
    </Routes>

    </BrowserRouter>
  );
}

export default App;
