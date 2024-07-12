import { Route, Routes } from "react-router-dom";
import { Login, RentalInsertion, Filter, Dashboard, Signup } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rental-insertion" element={<RentalInsertion />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;