import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DishesList from './DishesList';
import DishDetails from './DishDetails';
import DishSuggester from './DishSuggester';
import Header from './Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<DishesList />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="/suggester" element={<DishSuggester />} />
      </Routes>
    </Router>
  );
}

export default App;
