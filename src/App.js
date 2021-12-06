import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchDetail from "./searchdetail/routes/SearchDetail";
import Wrapper from "./businessesdetail/wrapper";
import Menu from "./businessesdetail/Menu";
import Home from "./home/routes/Home";
import PosComponent from "./pos/PosComponent";
import Finance from "./finance/routes/Finance";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/"                            element={<Home />} />
        <Route exact path="/enterprises"                 element={<SearchDetail />} />
        <Route exact path="/enterprises/:enterpriseCode" element={<Wrapper userType="owner" />} />
        <Route exact path="/enterprises/:enterpriseCode/tables/:table/menu" element={<Menu placement="end" />} />
        <Route exact path="/enterprises/:enterpriseCode/pos" element={<PosComponent />} />
        <Route exact path="/enterprises/:eno/finance"    element={<Finance />} />
      </Routes>
    </Router>
  );
}

export default App;
