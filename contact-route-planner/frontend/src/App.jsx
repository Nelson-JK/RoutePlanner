import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Groups from "./pages/Groups";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/groups">Groups</Link>
        </nav>

        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/groups" element={<Groups />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;