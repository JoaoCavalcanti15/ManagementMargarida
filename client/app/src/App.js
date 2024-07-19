import { Route, Routes, Navigate } from 'react-router-dom';
import { Login, RentalInsertion, Filter, Dashboard } from './pages';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rental-insertion" element={token ? <RentalInsertion /> : <Navigate to="/" />} />
        <Route path="/filter" element={token ? <Filter /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;