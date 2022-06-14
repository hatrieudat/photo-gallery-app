import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Layouts from './Layouts'
import Dashboard from './Pages/Dashboard'
import NoPage from './Pages/NoPage'
import Result from './Pages/Result'

function App() {
  return (
    <div className="container-fluid-md d-flex flex-column min-vh-100">
      <Layouts>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route path='Search/:keySearch' element={<Result />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Layouts>
    </div>
  );
}

export default App;
