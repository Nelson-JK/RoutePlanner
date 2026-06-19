import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Groups from "./pages/Groups";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px"
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/groups">Groups</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;