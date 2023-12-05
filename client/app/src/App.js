import { Route, Routes } from "react-router-dom";
import { Login, Dashboard, Filter } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </div>
  );
}

export default App;