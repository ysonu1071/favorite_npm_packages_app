import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import AddFavorite from "./components/AddFavorite";


function App() {
  // localStorage.clear()
  return (
    <div className="w-screen m-auto">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add-favorite" element={<AddFavorite/>}/>
      </Routes>
    </div>
  );
}

export default App;
