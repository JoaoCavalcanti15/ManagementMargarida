// Importing Route and Routes components from react-router-dom
import { Route, Routes } from "react-router-dom";
// Importing page components
import { Login, RentalInsertion, Filter, Dashboard } from './pages';

// Defining the main App component
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route definitions */}
        <Route path="/" element={<Login />} /> {/* Route for login page */}
        <Route path="/rental-insertion" element={<RentalInsertion />} /> {/* Route for rental insertion page */}
        <Route path="/filter" element={<Filter />} /> {/* Route for filter page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Route for dashboard page */}
      </Routes>
    </div>
  );
}

// Exporting the App component as default export
export default App;
