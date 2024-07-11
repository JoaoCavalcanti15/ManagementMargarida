import { Route, Routes } from "react-router-dom";
import { Login, RentalInsertion, Filter } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rental-insertion" element={<RentalInsertion />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </div>
  );
}

export default App;