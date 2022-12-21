import { Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="*" element={<>Error</>} />
      </Routes>
    </div>
  );
};

export default App;
