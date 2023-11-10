// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuComp from './components/MenuComp';
import SuplierPage from './components/SuplierPage';
import ClientPage from './components/ClientPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const Clients = () => <div> <ClientPage className="container-fluid"></ClientPage> </div>;

const Supliers = () => <div> <SuplierPage className="container-fluid"></SuplierPage> </div>;

const App = () => {
  return (
    <Router>
      <div className="d-flex" id="wrapper">
        <MenuComp />
        {/* <div id="page-content-wrapper"> */}
          <div className="container-fluid">
            <Routes>
              <Route path="/clientes" element={<Clients />} />
              <Route path="/fornecedores" element={<Supliers />} />
            </Routes>
          </div>
        {/* </div> */}
      </div>
    </Router>
  );
};

export default App;
