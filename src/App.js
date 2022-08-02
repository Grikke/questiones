import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Questions from "./components/pages/Questions";
import Results from "./components/pages/Results";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="questions" element={<Questions />} />
        <Route exact path="results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
